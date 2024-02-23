<template>
  <v-app>
    <v-main>
      <v-container fluid class=''>
        
        <Nav :userQuery="M.userQuery" />
<!-- <v-breadcrumbs :items="[..._subQuery.tags,..._subQuery.bits,..._subQuery.guests]"></v-breadcrumbs> -->
  <!-- <v-system-bar height="30" class="font-weight-black">
    <p class="app-data">{{ _props.userQuery }}</p>
  </v-system-bar> -->


  <v-system-bar window>
      <!-- <v-icon color="#94d2bdff" icon="mdi-card-search-outline" class="me-2"></v-icon> -->

      
      <p v-if="_locationBitsCount>0" class="app-data font-weight-black">
<v-icon icon="mdi-map-legend"/>
      {{ _locationBitsCount }}
    </p>
      <!-- <p class="app-data font-weight-black">{{ M.userQuery }}</p> -->

      <v-spacer></v-spacer>

      <p class="app-data font-weight-black">{{M.page}} — {{(M.pageItems*M.page)}} of {{M.total}}</p>
    </v-system-bar>
          

          <!-- <Loading :loading="_loading" /> -->

          <v-row no-gutters class="">
            <v-col cols="3"></v-col>
            <v-spacer />
            <v-col cols="6">
              <v-text-field class="app-search-copy"
  clearable
  variant="underlined"
append-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="M.userQuery"
        @click:append-inner="$bits"
        @keydown.enter="$bits"

></v-text-field>
            </v-col>
            <v-col cols="3"></v-col>
          </v-row>


<v-row
          v-if="_bits.bits.length < 1"
          align="center"
          justify="center"
        >
          <v-col cols="1">
            <v-progress-circular
              :width="3"
              :color="
                _props._config.colors.primary.find((c) => c.name == 'gamboge')
                  .hex
              "
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>

          <v-row v-else no-gutters class="">
            <v-col><v-pagination
                          v-if="_bits.bits.length > 1"
                          :length="M.pages"
                          v-model="M.page"
                          rounded="circle"
                          class="mb-12"
                        ></v-pagination></v-col>
          </v-row>
          <v-row v-if="_bits.bits.length>0" no-gutters class="mt-6">
          <v-col cols="3" class="mt-12 d-none d-md-inline text-caption">
            

<!--
        __               _         _     _ _
      / _|             | |       | |   (_) |
     | |_ __ _  ___ ___| |_ ___  | |__  _| |_ ___
     |  _/ _` |/ __/ _ \ __/ __| | '_ \| | __/ __|
     | || (_| | (_|  __/ |_\__ \_| |_) | | |_\__ \
     |_| \__,_|\___\___|\__|___(_)_.__/|_|\__|___/
 -->
            <p class="mt-3" v-if="_facets.bits">
              <h1>bits</h1>
              <div class="mt-3">
                <ul>
                  <!-- <li class="app-facet" v-for="bucket in _facets.bits.filtered_bits.buckets">
                    {{bucket.key}} ({{bucket.doc_count}})
                  </li> -->
                  <li :class="['app-facet']" v-for="bucket in _facets.bits.filtered_bits.buckets">
                    <span :class="[_subQuery.bits.includes(bucket.key)?'app-facet-is-in':'']">{{bucket.key}}</span> ({{bucket.doc_count}})
<v-icon @click="manageSubQuery(bucket.key,'bits','del')" v-if="_subQuery.bits.includes(bucket.key)"
          start
          icon="mdi-minus-circle"
          class="app-facet-bt app-facet-bt-del"
        ></v-icon>
        <v-icon @click="manageSubQuery(bucket.key,'bits','add')" v-if="!_subQuery.bits.includes(bucket.key)"
          start
          icon="mdi-plus-circle"
          class="app-facet-bt app-facet-bt-add"
        ></v-icon>
                  </li>
                </ul>
              </div>
            </p>


<!-- 
,---.               |          |
|__. ,---.,---.,---.|--- ,---. |--- ,---.,---.,---.
|    ,---||    |---'|    `---. |    ,---||   |`---.
`    `---^`---'`---'`---'`---'o`---'`---^`---|`---'
                                         `---'
  -->
            <p class="mt-6" v-if="_facets.tags">
              <h1>tags</h1>
              <div class="mt-3">
                <ul>
                  <li :class="['app-facet']" v-for="bucket in _facets.tags.filtered_tags.buckets">
                    <span :class="[_subQuery.tags.includes(bucket.key)?'app-facet-is-in':'']">{{bucket.key}}</span> ({{bucket.doc_count}})
<v-icon @click="manageSubQuery(bucket.key,'tags','del')" v-if="_subQuery.tags.includes(bucket.key)"
          start
          icon="mdi-minus-circle"
          class="app-facet-bt app-facet-bt-del"
        ></v-icon>
        <v-icon @click="manageSubQuery(bucket.key,'tags','add')" v-if="!_subQuery.tags.includes(bucket.key)"
          start
          icon="mdi-plus-circle"
          class="app-facet-bt app-facet-bt-add"
        ></v-icon>
                  </li>
                </ul>
              </div>
            </p>


<!--
  ____  __    ___  ____  ____  ____     ___  _  _  ____  ____  ____  ____
(  __)/ _\  / __)(  __)(_  _)/ ___)   / __)/ )( \(  __)/ ___)(_  _)/ ___)
 ) _)/    \( (__  ) _)   )(  \___ \ _( (_ \) \/ ( ) _) \___ \  )(  \___ \
(__) \_/\_/ \___)(____) (__) (____/(_)\___/\____/(____)(____/ (__) (____/
 -->
                        <p class="mt-6" v-if="_facets.guests">
              <h1>guests</h1>
              <div class="mt-3">
                <ul>
                  <li :class="['app-facet']" v-for="bucket in _facets.guests.filtered_guests.buckets">
                    <!-- {{bucket.key}} ({{bucket.doc_count}}) -->

                    <!-- <span @click="manageSubQuery(bucket.key,'guests','add')">✚</span>
                    <span @click="manageSubQuery(bucket.key,'guests','del')">⊖</span> -->

                    <span :class="[_subQuery.guests.includes(bucket.key)?'app-facet-is-in':'']">{{bucket.key}}</span> ({{bucket.doc_count}})
<v-icon @click="manageSubQuery(bucket.key,'guests','del')" v-if="_subQuery.guests.includes(bucket.key)"
          start
          icon="mdi-minus-circle"
          class="app-facet-bt app-facet-bt-del"
        ></v-icon>
        <v-icon @click="manageSubQuery(bucket.key,'guests','add')" v-if="!_subQuery.guests.includes(bucket.key)"
          start
          icon="mdi-plus-circle"
          class="app-facet-bt app-facet-bt-add"
        ></v-icon>

                  </li>
                </ul>
              </div>
            </p>

<!-- 

 ___             _
|  _|___ ___ ___| |_ ___   ___ ___ ___
|  _| .'|  _| -_|  _|_ -|_| -_| . |_ -|
|_| |__,|___|___|_| |___|_|___|  _|___|
                              |_| 
-->
             <p class="mt-6" v-if="_facets.episodes">
              <h1>episodes</h1>
              <div class="mt-3">
                <ul>
                  <!-- <li :class="['app-facet']" v-for="bucket in _facets.episodes.filtered_episodes.buckets"> -->
                    <!-- {{bucket.key}} ({{bucket.doc_count}})
                    <span @click="manageSubQuery(bucket.key,'episodes','add')">✚</span>
                    <span @click="manageSubQuery(bucket.key,'episodes','del')">⊖</span> -->
<li :class="['app-facet']" v-for="bucket in _facets.episodes.filtered_episodes.buckets">
                    <span :class="[_subQuery.episodes.includes(bucket.key)?'app-facet-is-in':'']">{{bucket.key}}</span> ({{bucket.doc_count}})
<v-icon @click="manageSubQuery(bucket.key,'episodes','del')" v-if="_subQuery.episodes.includes(bucket.key)"
          start
          icon="mdi-minus-circle"
          class="app-facet-bt app-facet-bt-del"
        ></v-icon>
        <v-icon @click="manageSubQuery(bucket.key,'episodes','add')" v-if="!_subQuery.episodes.includes(bucket.key)"
          start
          icon="mdi-plus-circle"
          class="app-facet-bt app-facet-bt-add"
        ></v-icon>
                  </li>
                  <!-- </li> -->
                </ul>
              </div>
            </p>

</v-col>

            <v-col cols="9" class="v-cols-auto pl-6">

            <div class="mt-3" v-for="bit in _bits.bits">
              {{ bit.instance }}
              <p class="pl-6 ">
                
                <div>
                  
                  
                   


                   <router-link class="text-subtitle-2" :to="`/bits/1/bit:%22${bit.bit}%22`">{{bit.bit}}</router-link> <span class="font-weight-thin text-caption"> {{bit.elucidation}}: {{bit.episode}}@{{bit.tstart}}</span>

                   
                </div>
                <div class="pl-6">

                   <v-chip size="x-small" density="compact" v-for="tag in bit.tags" variant="plain">

                    <!-- <router-link v-for="tag in bit.tags" to="/viz">
                      tag
                    </router-link
                  > -->


<!-- <router-link
                              :to="`/bits/1/bit:%22${bit.bit}%22`"
                              >{{ bit.bit }}</router-link
                            > -->

                  <!-- <router-link replace class="font-weight-black" :to="`/bits/1/tags:%22${tag}%22`">{{tag}}</router-link> -->


<!-- return {
        paginationPage: route.params.paginationPage
          ? parseInt(route.params.paginationPage)
          : 1,
        userQuery: route.params.userQuery
          ? route.params.userQuery
          : "tags:aukerman",
        facetTags: route.params.facetTags,
        _config: CONFIG,
      };                   -->

                  <!-- <router-link :to="{name: 'Bits', params: {paginationPage: 1,userQuery: `tags:${tag}`}}">
     {{tag}}
</router-link> -->
                  <a href="" @click.prevent="$launderUserQuery({field:'tags',string:tag})">{{tag}}</a>
                  <!-- <a :href="`/#/bits/1/tags:%22${tag}%22`">{{tag}}</a> -->
                  <!-- <a @click.prevent="M.userQuery=`tags:%22${tag}%22`">{{tag}}</a> -->
                  <!-- http://127.0.0.1:4000/#/bits/1/tags:%22Henry%20Heimlich%22/ -->
                </v-chip>
                  
                              </div>
              </p>
            </div>

          </v-col>


        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue";//usable vue elements
import { useRoute, useRouter } from "vue-router";
const ROUTER = useRouter();
import AXIOS from "axios";
import Nav from "./Nav.vue";
import Loading from "./Loading.vue";
const _loading = ref(false);

const $launderUserQuery=(ob)=>{

M.userQuery=`${ob.field}:"${ob.string}"`;

};

import { useHead } from '@unhead/vue';//head+meta manager
useHead({
  title: `CBBBT.v4 - ${_props.userQuery}`
})

const _props = defineProps({ paginationPage:Number,userQuery: String , facetTags: String,_config: Object });

const M = reactive({
  userQuery:null,
  page: _props.paginationPage,
  pageItems: 20,
  pages: 0,
  total:0
});

const _subQuery=reactive({
  tags:[],bits:[],guests:[],episodes:[]
});

const manageSubQuery=(v,sq,ar)=>{
ar=='add'&&_subQuery[sq].push(v);
ar=='del'&&_subQuery[sq].splice(_subQuery[sq].indexOf(v), 1);
};

const _locationBitsCount = computed(() => {
  return _bits.bits.filter(b=>b.bit=='Location').length;
});
// const _locationUrl = computed(() => {
  
//   const locationBits=_bits.bits.filter(b=>b.bit=='Location')
//   .map(l=>`${l.location_type}:${l.location_id}`)
//   ;

//   return locationBits.length>0?`http://milleria.org:3030/geoms/simple?q=${locationBits.join(',')}`:null;
// });

const _QE = computed(() => {
  let qsTags=_subQuery.tags.length>0?` AND (${_subQuery.tags.map(s=>`tags:"${s}"`).join(' AND ')})`:'';
  let qsGuests=_subQuery.guests.length>0?` AND (${_subQuery.guests.map(s=>`episode_guests:"${s}"`).join(' AND ')})`:'';
  let qsBits=_subQuery.bits.length>0?` AND (${_subQuery.bits.map(s=>`bit:"${s}"`).join(' AND ')})`:'';
  let qsEpisodes=_subQuery.episodes.length>0?` AND (${_subQuery.episodes.map(s=>`episode:"${s}"`).join(' AND ')})`:'';
  // return `${_props.userQuery}${qsTags}`;
  return `${M.userQuery}${qsTags}${qsGuests}${qsBits}${qsEpisodes}`;
});

const _QU = computed(() => {
  let path = `/bits/${M.page}/${M.userQuery}/${encodeURIComponent(_subQuery.tags.join(','))}`;
  return path;
});

// init geoms array
const _geoms = reactive(
  {geoms:[]}
  );

// init bits array
const _bits = reactive(
  {bits:
    [
      {
      "episode": null,
      "tstart": null,
      "tend": null,
      "instance": null,
      "bit": null,
      "elucidation": null,
      "location_type": null,
      "location_id": null,
      "hero": null,
      "updated_at": null,
      "created_at": null,
      "slug_earwolf": null,
      "episode_title": null,
      "episode_guests": [],
      "tags": []
  }
    ]
  }
  );
const _facets = reactive({
  bits: null,
  guests: null,
  episodes: null,
  tags: null,
});


// const $geoms = async () => {
// // query
//   console.log("_locationUrl", _locationUrl.value);
//   // const locationCall = _locationUrl?await AXIOS.get(_locationUrl.value):null;
//   const locationCall = null;

//   console.log("locationCall before", locationCall);
//   if(_locationUrl.value){await AXIOS.get(_locationUrl.value)};
//   console.log("locationCall after", locationCall);
//   locationCall && Object.assign(_geoms,{geoms:locationCall});

// };

const $bits = async () => {
  // _loading.value=true;
  let QO = {
    from: (M.page-1),
    size: M.pageItems,
    query: { query_string: { query: _QE.value } },
    aggregations: {
      all_bits: {
        global: {},
        aggregations: {
          tags: {
            filter: { query_string: { query: _QE.value } },
            aggregations: {
              filtered_tags: { terms: { size: 10000, field: "tags.keyword" } },
            },
          },
          guests: {
            filter: { query_string: { query: _QE.value } },
            aggregations: {
              filtered_guests: {
                terms: { size: 10000, field: "episode_guests.keyword" },
              },
            },
          },
          bits: {
            filter: { query_string: { query: _QE.value } },
            aggregations: {
              filtered_bits: { terms: { size: 10000, field: "bit.keyword" } },
            },
          },
          episodes: {
            filter: { query_string: { query: _QE.value } },
            aggregations: {
              filtered_episodes: {
                terms: { size: 10000, field: "episode.keyword" },
              },
            },
          },
        },
      },
    },
  };//qo

  // query
  const bitsCall = await AXIOS.post(`${_props._config.index.host}/${_props._config.index.bits}/_search?`, QO);
  M.total=bitsCall.data.hits.total.value;
  M.pages = Math.round(M.total / M.pageItems + 0.5);
  Object.assign(
    _bits,
    {bits:bitsCall.data.hits.hits.map((b) => b._source)}
  );
  Object.assign(_facets, bitsCall.data.aggregations.all_bits);
  // _loading.value=false;
}; //$bits


onMounted(() => {
  M.userQuery=_props.userQuery; //copy so we can edit here
  _subQuery.tags=_props.facetTags?decodeURIComponent(_props.facetTags).split(","):[];
  $bits();
});

watch(
  // () => [_props.userQuery,M.page],
  () => [M.userQuery,M.page],
  (newp, oldp) => {
    ROUTER.push({ path: _QU.value });
    $bits();
  },
);
// watch(
//   () => [M.userQuery],
//   (newp, oldp) => {
//     $geoms();
//   },
// );
watch(
  () => [_subQuery],
  (newValue, oldValue) => {
    ROUTER.push({ path: _QU.value });
    $bits();
  },
  { deep: true }
)
</script>
