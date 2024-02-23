<template>
  <v-app>
    <v-main>
      <v-container fluid class="">
        <Nav />
        <v-container fluid>
          <v-row v-if="_updates.updates.length > 1" dense>
            <v-col
              v-for="update in _updates.updates"
              :key="update.date"
              cols="4"
            >
              <v-card>
                <v-img
                  :src="update.image"
                  class="align-end app-img"
                  height="200px"
                  cover
                >
                  <v-card-title class="text-white text-right">
                    <router-link
                      :to="`/bits/1/episode:%22${encodeURIComponent(
                        update.episode,
                      )}%22`"
                      >{{ update.episode }}</router-link
                    >
                  </v-card-title>
                </v-img>

                <v-card-text>
                  <v-timeline density="compact" align="start">
                    <v-timeline-item
                      v-for="bit in update.bits_sum"
                      :key="bit.bit"
                      dot-color="#ca6702ff"
                      size="x-small"
                    >
                      <div class="mb-4">
                        <div class="font-weight-normal">
                          <strong>
                            <router-link
                              :to="`/bits/1/bit:%22${encodeURIComponent(
                                bit.bit,
                              )}%22`"
                              >{{ bit.bit }}</router-link
                            >
                          </strong>
                          <span class="text-disabled"> ({{ bit.count }})</span>
                        </div>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue"; //usable vue elements
import { useRoute, useRouter } from "vue-router";
import { DateTime } from "luxon";

import { useHead } from "@unhead/vue"; //head+meta manager
useHead({
  title: `CBBBT.v4 - recent updates`,
});

const ROUTER = useRouter();
import AXIOS from "axios";
import Nav from "./Nav.vue";

const CONFIG = {
  elastic_bits: "http://milleria.org:9200/cbb/_search?",
  elastic_facets: "http://milleria.org:9200/cbb/_search?",
  atlas_geoms: "http://milleria.org:3030/geoms/simple?q=",
  index_updates: "http://milleria.org:9200/cbb_updates/_search?size=9999&q=*",
};

// init bits array
const _updates = reactive({
  updates: [
    {
      date: null,
      episodes_summary: null,
      query: null,
      eps: [],
      reports: [],
    },
  ],
});

const $updates = async () => {
  const updatesCall = await AXIOS.get(CONFIG.index_updates);
  /*const updates = updatesCall.data.hits.hits
    .map((u) => u._source)
    .sort((a, b) => {
      return DateTime.fromISO(a.date) - DateTime.fromISO(b.date);
    })
    .reverse()
    .slice(0, 6);
  _updates.updates = updates;*/
  const updates = updatesCall.data.hits.hits
    .map((u) => u._source)
    .sort((a, b) => {
      return DateTime.fromISO(a.date) - DateTime.fromISO(b.date);
    })
    .reverse()
    .slice(0, 6)
    .map((up) => up.reports);
  _updates.updates = updates.flat();
}; //updates

onMounted(() => {
  $updates();
});
</script>
