<template>
  <v-app>
    <v-main>
      <v-container>
        <Nav />
        <v-container fluid>
          <v-row dense>
            <v-col class="v-col-3"></v-col>
            <v-col class="v-col-6 pt-12 mt-12">
              <div class="text-center app-hero-hero">{{ _hero.instance }}</div>
              <div class="font-weight-thin text-right pr-12 text-disabled">
                -- {{ _hero.hero.attrib }} @ ep.{{ _hero.episode }}
                <p class="text-caption">
                  (instance of
                  <router-link :to="`/bits/1/bit:%22${_hero.bit}%22`">{{
                    _hero.bit
                  }}</router-link
                  >)
                </p>
              </div>
            </v-col>
            <v-col class="v-col-auto"></v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
/*
                                                       /$$                                               /$$
                                                      |__/                                              | $$
                                                       /$$ /$$$$$$/$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$
                                                      | $$| $$_  $$_  $$ /$$__  $$ /$$__  $$ /$$__  $$|_  $$_/
                                                      | $$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$| $$  \__/  | $$
                                                      | $$| $$ | $$ | $$| $$  | $$| $$  | $$| $$        | $$ /$$
                                                      | $$| $$ | $$ | $$| $$$$$$$/|  $$$$$$/| $$        |  $$$$/
                                                      |__/|__/ |__/ |__/| $$____/  \______/ |__/         \___/
                                                                        | $$
                                                                        | $$
                                                                        |__/
*/

import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

import AXIOS from "axios";
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";

import { useHead } from "@unhead/vue"; //head+meta manager
useHead({
  title: `CBBBT.v4 - A Comprehensive Comedy Bang! Bang! Bit Tracker`,
});

const ROUTER = useRouter();
const _props = defineProps({
  heroid: String,
  _config: Object,
});

/*
"index": {
        "host": "milleria.org",
        "port": "9200"
    },
    "geomdir": "/Users/ccmiller/Documents/bu/cbb-geoms/",
    "cloudinary": {
        "api_key": "499116563672841",
        "api_secret": "UynamGFEOZJa1welVSCd01uhwMM",
        "cloud_name": "cecois"
    },
    "elastic": {
        "host": "milleria.org:9200",
        "indexBits": "cbb",
        "indexUpdates": "cbb_updates",
        "indexGeoms": "cbb_geoms"
    }
    */

// const CONFIG = {
//   elastic_bits: "http://milleria.org:9200/cbb/_search?",
//   elastic_facets: "http://milleria.org:9200/cbb/_search?",
//   atlas_geoms: "http://milleria.org:3030/geoms/simple?q=",
//   atlas_updates: "http://milleria.org:9200/cbb_updates/_search?size=9999&q=",
// };

// gen default hero
const _hero = reactive({
  instance: "Is that more on the guy or more on the horse?",
  bit: "Is Dick Francis a Horse?",
  elucidation: "inconclusive",
  hero: { on: true, attrib: "Chesley Burnett Sullenberger" },
});

onMounted(() => {
  $hero(); //run hero to fetch a random instance where hero==on
});

const $hero = async () => {
  let QO = {
    size: 1,
    query: {
      function_score: {
        query: { query_string: { query: "hero.on:true" } },
        boost: "5",
        random_score: {},
        boost_mode: "multiply",
      },
    },
  };

  // query for 1 hero
  const heroCall = await AXIOS.post(
    `${_props._config.index.host}/${_props._config.index.bits}/_search?`,
    QO,
  );
  // replace _hero w/ result - don't do this for objects any more complex than this
  Object.assign(_hero, heroCall.data.hits.hits[0]._source);
}; //$hero
</script>
