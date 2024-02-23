<template>
  <v-app>
    <v-main>
      <Nav />

      <v-system-bar window>
        <!-- <v-icon color="#94d2bdff" icon="mdi-card-search-outline" class="me-2"></v-icon> -->

        <p class="app-data font-weight-black">
          {{ _uniqueBits.bits.length }} unique bits
        </p>
        <!-- <p class="app-data font-weight-black">{{ M.userQuery }}</p> -->

        <v-spacer></v-spacer>

        <!-- <p class="app-data font-weight-black">{{M.page}} — {{(M.pageItems*M.page)}} of {{M.total}}</p> -->
      </v-system-bar>

      <v-container fluid>
        <v-row no-gutters class="pt-12 mb-12 pb-12">
          <v-col cols="4"></v-col>
          <v-spacer />
          <v-col cols="4">
            <v-text-field
              class="app-search-copy"
              clearable
              variant="underlined"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              v-model="bitFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="4"></v-col>
        </v-row>

        <v-row
          v-if="_uniqueBits.bits.length < 1"
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
        <v-row v-else align="center" justify="center">
          <v-col v-for="(bit, i) in _uniqueBitsFiltered" :key="i" cols="4">
            <v-card class="mx-auto" max-width="344">
              <v-card-item>
                <div>
                  <div class="text-overline">
                    {{ bit.key }}
                  </div>
                  <div class="text-caption pl-3 font-weight-light">
                    {{ bit.aggElucidation.buckets[0].key }}
                  </div>
                </div>

                <span class="float-right app-finePrint">
                  <router-link :to="`/bits/1/bit:%22${bit.key}%22`">{{
                    bit.doc_count
                  }}</router-link>
                </span>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>

        <!--  -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue"; //usable vue elements
import { useRoute, useRouter } from "vue-router";
const ROUTER = useRouter();
import AXIOS from "axios";
import Nav from "./Nav.vue";

const _props = defineProps({ _config: Object });

import { useHead } from "@unhead/vue"; //head+meta manager
useHead({
  title: `CBBBT.v4 - Full Index`,
});

// livefilter w/out hitting the index w/ query (possibly a bad idea)
const bitFilter = ref(null);

// init bits array
const _uniqueBits = reactive({ bits: [] });

const _uniqueBitsFiltered = computed(() => {
  return _uniqueBits.bits.filter((b) => {
    return bitFilter.value
      ? `${b.key} ${b.aggElucidation.buckets[0].key}`
          .toLowerCase()
          .indexOf(bitFilter.value) >= 0
      : b;
  });
});

const $bits = async () => {
  // _loading.value=true;
  const QO = {
    size: 0,
    query: { query_string: { query: "*:*" } },
    aggs: {
      aggBits: {
        terms: {
          size: 10000,
          field: "bit.keyword",
        },
        aggs: {
          aggElucidation: {
            terms: {
              size: 10000,
              field: "elucidation.keyword",
            },
          },
        },
      },
    },
  };

  const bitsCall = await AXIOS.post(
    `${_props._config.index.host}/${_props._config.index.bits}/_search?`,
    QO,
  );

  Object.assign(_uniqueBits, {
    bits: bitsCall.data.aggregations.aggBits.buckets,
  });
}; //$bits

onMounted(() => {
  $bits();
});
</script>
