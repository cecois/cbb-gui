<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 ma-0">
        <Nav :userQuery="S.userQuery" />

        <v-system-bar window>
          <v-chip
            @click="$zoomToAllGeoms"
            prepend-icon="mdi-globe-model"
            :text="_geoms.geoms.features ? _geoms.geoms.features.length : 0"
          />
          <p class="app-data font-weight-black ml-6">
            {{ S.userQuery }}
          </p>

          <v-spacer></v-spacer>

          <p class="app-data font-weight-black"></p>
          <v-btn
            v-if="!S.locationMenu"
            @click="S.locationMenu = true"
            size="small"
            color="surface-variant"
            variant="text"
            icon="mdi-view-list-outline"
          ></v-btn>

          <span class="float-right app-finePrint">
            {{ S.locationActive }}
          </span>
        </v-system-bar>

        <v-container
          v-if="!_geoms.geoms.features || _geoms.geoms.features.length < 1"
          class="pt-12"
        >
          <v-row no-gutters style="height: 150px" class="pt-12">
            <v-col align-self="start"> </v-col>

            <v-col class="text-center" align-self="center">
              no mappable locations associated with:
              <p class="mt-6">
                <code>{{ S.userQuery }}</code
                >{{ S.locationActive }}
              </p>
            </v-col>

            <v-col align-self="end"></v-col>
          </v-row>
        </v-container>

        <v-container fluid style="height: 100vh" class="pa-0 ma-0">
          <v-navigation-drawer
            v-if="S.locationMenu"
            permanent
            location="right"
            elevation="20"
            mobile-breakpoint="xs"
            rail="true"
            rail-width="486"
          >
            <v-btn
              @click="S.locationMenu = !S.locationMenu"
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-close"
            ></v-btn>

            <v-list density="compact" nav>
              <v-list-item
                v-for="fea in _geoms.geoms.features"
                class="cursor-pointer"
              >
                <v-card
                  border="false"
                  elevation="0"
                  xvariant="
                    `${$translateLocationAdmin(
                      fea.geometry.type.toLowerCase(),
                    )}.${fea.properties.cartodb_id}` == S.locationActive
                      ? 'outlined'
                      : 'text'
                  "
                  :variant="
                    fea.properties.vid == S.locationActive ? 'outlined' : 'text'
                  "
                  :color="
                    fea.properties.vid == S.locationActive
                      ? _props._config.colors.primary.find(
                          (c) => c.name == 'alloyorange',
                        ).hex
                      : ''
                  "
                >
                  <v-card-item
                    @click="
                      S.locationActive =
                        S.locationActive == fea.properties.vid
                          ? null
                          : fea.properties.vid
                    "
                  >
                    <div>
                      <div class="text-no-wrap">
                        <v-btn class="pa-0" variant="plain">
                          {{ fea.properties.name }}
                        </v-btn>

                        <v-icon
                          class="text-disabled ml-1"
                          size="x-small"
                          :icon="
                            fea.properties.provenance == 'turf.buffer'
                              ? 'mdi-vector-circle'
                              : $getGeomIcon(fea.geometry.type)
                          "
                        ></v-icon>
                      </div>
                      <div
                        class="pl-6 text-caption"
                        v-if="fea.properties.vid == S.locationActive"
                      >
                        <p
                          class="pb-1"
                          v-for="annoItem in fea.properties.anno.split(';')"
                        >
                          {{ annoItem }}
                        </p>
                        <div>
                          <v-chip
                            size="x-small"
                            density="compact"
                            v-for="tag in fea.properties.tags"
                            variant="plain"
                          >
                            <router-link
                              class="font-weight-black"
                              :to="`/bits/1/tags:%22${tag}%22`"
                              >{{ tag }}</router-link
                            ></v-chip
                          >
                        </div>
                      </div>
                    </div>
                  </v-card-item>
                </v-card>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>

          <l-map
            :use-global-leaflet="false"
            ref="MAP"
            :zoom="5"
            :options="{ zoomControl: false, worldCopyJump: true }"
          >
            <l-tile-layer
              name="Carto Positron Light"
              url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
            ></l-tile-layer>
            <l-geo-json
              :geojson="_geoms.geoms"
              :options="geomOptsDefault"
              :options-style="geomStyle"
            />
          </l-map>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue"; //usable vue elements
import { useRoute, useRouter } from "vue-router";
import * as TURF from "@turf/turf";
const ROUTER = useRouter();
import AXIOS from "axios";

import { useHead } from "@unhead/vue"; //head+meta manager
useHead({
  title: `CBBBT.v4 - Mapped Comedy Bang! Bang! Bits`,
});

import Nav from "./Nav.vue";
import "leaflet/dist/leaflet.css";

import {
  LMap,
  LTileLayer,
  LGeoJson,
  LMarker,
  LIcon,
  LCircleMarker,
} from "@vue-leaflet/vue-leaflet";

import Loading from "./Loading.vue";

const locationAdmin = reactive({
  menu: false,
  active: null,
});

const _props = defineProps({
  userQuery: String,
  activeLocation: String,
  _config: Object,
});

// const CONFIG = {
//   elastic_bits: "http://milleria.org:9200/cbb/_search?",
//   elastic_facets: "http://milleria.org:9200/cbb/_search?",
//   atlas_geoms: "http://milleria.org:3030/geoms/simple?q=",
//   atlas_updates: "http://milleria.org:9200/cbb_updates/_search?size=9999&q=",
// };

const S = reactive({
  userQuery: null,
  locationMenu: false,
  locationActive: null,
});

const MAP = ref(null);

// INIT geOMs array
const _geoms = reactive({ geoms: [] });
const _activeGeom = reactive({ key: null });

const $translateLocationAdmin = (geomClass) => {
  // CoLloQuIalS TakE propEr kEyS aNd SIMpLIFy tHEM
  let colloquials = {
    polygon: "poly",
    multipolygon: "poly",
    multilinestring: "line",
    linestring: "line",
  };
  return colloquials[geomClass];
};
const $getGeomIcon = (geomClass) => {
  const translatedClass = $translateLocationAdmin(geomClass.toLowerCase());
  const icons = {
    poly: "mdi-vector-polygon",
    line: "mdi-vector-line",
    point: "mdi-vector-circle-variant",
  };
  return icons[translatedClass];
}; //$getGeomIcon
const $setLocationAdmin = (geom) => {
  // wUt Has OUR AtTENTIOn?
  const candidate = geom.layer.feature.properties.vid;

  // iF IT's aLrEADY aCtive, unDo THat; IF it'S NOT, ACtIVAtE IT
  S.locationActive = S.locationActive == candidate ? null : candidate;
};

const $zoomToAllGeoms = () => {
  const [w, s, e, n] = TURF.bbox(_geoms.geoms);
  const bbox = [
    [s, e],
    [n, w],
  ];
  MAP.value.leafletObject.fitBounds(bbox);
  S.locationMenu = true;
}; //$zoomToAllGeoms

const $setGeomStyle = () => {
  // RESTYLE It If the lAyER suppoRtS It (i.E. nOT tiLESets AND sUCH)
  MAP.value.leafletObject &&
    MAP.value.leafletObject.eachLayer((layer) => {
      typeof layer.getLayers === "function" &&
        layer.getLayers().forEach((l) => {
          l.setStyle(geomStyle(l.feature));
        });
    });
};

const $zoomToActiveGeom = () => {
  // can'T dO it IF thERe's nOthIng IN EiTheR
  if (!S.locationActive || !_geoms.geoms.features) {
    return null;
  }

  const g = _geoms.geoms.features.filter(
    (fea) => fea.properties.vid == S.locationActive,
  )[0];

  // LeT Turf sort out the BboX
  const [w, s, e, n] = TURF.bbox(g);
  const bbox = [
    [s, e],
    [n, w],
  ];

  // ZOom TO it
  MAP.value.leafletObject.fitBounds(bbox);

  // aLsO Hop iNtO THe LaYeR Set AnD bUBBlE THe ACtiVe gEOm To thE ToP PANe - SligHTLY cOstly BUt WOrTH iT to THe UsEr
  MAP.value.leafletObject.eachLayer((layer) => {
    typeof layer.getLayers === "function" &&
      layer.getLayers().forEach((l) => {
        l.feature.properties.vid == S.locationActive && l.bringToFront();
      });
  });
}; //$zoomToActiveGeom

const $activateFeature = (l) => {
  // soLELy tO pROCesS a ClicK oN a feaTure
  S.locationActive =
    S.locationActive == l.target.feature.properties.vid
      ? null
      : l.target.feature.properties.vid;
};
const geomOptsDefault = {
  onEachFeature: (fea, layer) => {
    // ToolTIp gUts
    const template = `${fea.properties.name}`;
    layer.bindTooltip(template);
    // oNCLiCK we WAnTa fUnC TO haNdle the feAtUrE
    layer.on("click", $activateFeature);
  },
}; //optscandidates
const geomStyle = (fea) => {
  const isActive = fea ? fea.properties.vid == S.locationActive : false;

  return isActive
    ? {
        color: _props._config.colors.primary.find(
          (c) => c.name == "alloyorange",
        ).hex,
        fillColor: _props._config.colors.primary.find(
          (c) => c.name == "tiffanyblue",
        ).hex,
        opacity: 1,
        weight: 6,
        fillOpacity: 0.6,
      }
    : {
        color: _props._config.colors.primary.find(
          (c) => c.name == "midnightgreen",
        ).hex,
        fillColor: _props._config.colors.primary.find(
          (c) => c.name == "vanilla",
        ).hex,
        weight: 16,
        opacity: 1,
        fillOpacity: 0.5,
      };
};

const $geoms = async () => {
  let QO = {
    size: 9999,
    query: { query_string: { query: `${_props.userQuery} AND bit:Location` } },
  }; //qo

  // quErY fOr WHatEVeR ThE UseR WRoTe (plus bit:location)
  const locationBits = await AXIOS.post(
    `${_props._config.index.host}/${_props._config.index.bits}/_search?`,
    QO,
  );

  // UNIquIFY thEm AND cRaFT A USAbLE Query StRinG
  const uniqLocationKeys = [
    ...new Set(
      locationBits.data.hits.hits.map((l) => {
        return `${l._source.location_type}:${l._source.location_id}`;
      }),
    ),
  ];

  const locationCall = await AXIOS.get(
    `${_props._config.geoms.host}/${
      _props._config.geoms.route
    }${uniqLocationKeys.join(",")}`,
  );

  const locations = {
    type: "FeatureCollection",
    features: locationCall.data.map((fea) => {
      // poInTs ARe bOth cLeANsed (pArsEfloAT) and bUfFErEd TO pOlYS
      if (fea.geometry.type == "Point") {
        // cLoNE THE incoming geometry
        let geomClone = structuredClone(fea.geometry);
        // CLEAnSe the cOoRdiNAtEs aRRAy w/ a PaRsEfLOaT
        geomClone.coordinates = geomClone.coordinates.map((co) =>
          parseFloat(co),
        );
        // seT tHe GeoMEtRY BacK To ThE feATuRe
        fea.geometry = geomClone;

        // buFfer the pOinT
        let newFeature = TURF.buffer(fea, 55, { units: "meters" });

        // INdICaTE oUr sHenANiGaNs IN tHE PrOpS
        newFeature.properties.provenance = "turf.buffer";
        return newFeature;
      } else {
        return fea;
      }
    }),
  }; //LOcaTiONS Ob

  // rEplaCE thE _GeOMs.geomS OBjeCT wITh tHE ReSulT (to BE maPPed)
  Object.assign(_geoms, {
    geoms: locations,
  });

  !S.locationActive && $zoomToAllGeoms();
  S.locationActive && $zoomToActiveGeom();
  S.locationMenu = locations.features.length > 0 ? true : false; //if WE HAve EVEn oNE Let'S PoP OPEN thE loCAtIon MEnU PANEL
}; //$bits

onMounted(() => {
  S.locationActive = _props.activeLocation
    ? _props.activeLocation
    : S.locationActive;
  S.userQuery = _props.userQuery; //cOPy So we CaN eDIt heRe If NEC
  _props.userQuery && $geoms();
});

watch(
  () => [S.locationActive],
  (newp, oldp) => {
    ROUTER.push({ path: `/map/${S.userQuery}/${S.locationActive}` });
    $zoomToActiveGeom();
    $setGeomStyle();
  },
);
</script>
