<template>
  <v-app>
    <v-main>
      <Nav />

      <v-container fluid>
        <v-row dense class="mt-12">
          <v-col key="card.t9238ritle" cols="3"></v-col>
          <v-col key="card.t9238ritle" cols="6">
            <v-card>
              <v-card-title>
                <span class="text-lowercase" style="font-size: 1.1em">
                  What's<i
                    class=""
                    style="font-size: 3.1em; top: -4px; position: relative"
                    >!</i
                  >This,<i
                    class="text-disabled"
                    style="font-size: 3.1em; top: -4px; position: relative"
                    >!</i
                  >Now?!
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                <router-link to="/bits/1/bit:%22Cum on Guys%22"
                  >Come on, guys</router-link
                >
                -- it's an exhaustive, searchable index of all the recurring
                bits from the
                <a href="https://www.earwolf.com/show/comedy-bang-bang/"
                  ><em>Comedy Bang! Bang!</em></a
                >
                podcast. Look up all the
                <router-link to="/bits/1/bit:%22What's This, Now%22"
                  >What's This, Now?!</router-link
                >
                instances. Or all of Ho Ho's
                <router-link to="/bits/1/tags%3A%22ho%20ho%22%20AND%20bit%3Aho"
                  >ho-ho!s</router-link
                >. Or — it goes way back —
                <router-link to="/bits/1/bit:foam*"
                  >every time Scott axed Foam Corn—</router-link
                >.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mt-12">
          <v-col key="card.t9238ritle" cols="3"></v-col>
          <v-col key="card.t9238ritle" cols="6">
            <v-card>
              <v-card-title class="text-right">
                <span class="text-lowercase" style="font-size: 1.1em">
                  <i
                    class=""
                    style="font-size: 3.1em; top: -4px; position: relative"
                    >!</i
                  ><i
                    class="text-disabled"
                    style="font-size: 3.1em; top: -4px; position: relative"
                    >!</i
                  >Why?
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                Because
                <a href="https://www.earwolf.com/show/comedy-bang-bang/">CBB</a>
                is the best thing ever recorded. Or maybe the best thing to ever
                even happen at all. Although there's
                <a href="http://threedomxn.com/">Threedom</a> and the
                <a href="http://dv.trainertothestarsseekingstars.org/"
                  >Andy Daly</a
                >
                oeuvre also, dunno.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mt-12">
          <v-col key="card.t9238ritle" cols="3"></v-col>
          <v-col key="card.t9238ritle" cols="6">
            <v-card>
              <v-card-title>
                <span class="text-lowercase" style="font-size: 1.1em">
                  Official<i
                    class=""
                    style="font-size: 3.1em; top: -4px; position: relative"
                    >!</i
                  >Thing,<i
                    class="text-disabled"
                    style="font-size: 3.1em; top: -4px; position: relative"
                    >!</i
                  >This?
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                Isn't, nope. Fansite.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mt-12 mb-12"></v-divider>
        <v-row dense class="mt-12">
          <v-col key="card.t9238ritle" cols="12">
            <v-card>
              <v-card-title>
                <span class="text-lowercase" style="font-size: 1.1em">
                  <v-icon icon="mdi-magnify" class="mr-4 text-disabled"></v-icon
                  >search
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                <p class="pt-2">
                  Basically you can just type into the box like an ape might do
                  it - "<router-link to="/bits/1/huell">huell</router-link>" or
                  "<router-link to="/bits/1/fourvel">fourvel</router-link>" and
                  so forth. Case is irrelevant.
                </p>

                <p class="pt-2">
                  If you're looking for something unobvious — Cake Boss'
                  <em>gidjamagoo</em> or the times any Lapkus character couldn't
                  make it through a song or the jeremy piven stuff, e.g. — you
                  might be able to find it in the
                  <router-link to="/index">full bit index</router-link>.
                  Understand this is an inexact science, though — interpreted,
                  to a degree — and even in 2024 transcribing a dense cut of
                  rapid crosstalk is largely useless. So "<router-link
                    to="/bits/1/bit%3Ashirley"
                    >Shirley</router-link
                  >" is the key of the bit where a character can't pull their
                  own details and "<router-link
                    to="/bits/1/bit%3Ababylon%2C%20baby"
                    >Babylon, Baby</router-link
                  >" is the key for the times Gino narrates the LIRR stops.
                </p>

                <p class="pt-2">
                  Search here is largely just a passthrough to an ElasticSearch
                  instance (note the optional facets, though) so
                  <a
                    href="https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index.html"
                    >Elastic documentation</a
                  >
                  can teach you how to get fancy —
                  <router-link to="/bits/1/tags%3Abatman%20AND%20tags%3Awebber"
                    >tags:batman AND tags:webber</router-link
                  >
                  or the times Jarles appears when PFT isn't even supposed to be
                  there:
                  <router-link
                    to="/bits/1/tags%3Ajarles%20-episode_guests%3Atompkins"
                    >tags:jarles -episode_guests:tompkins</router-link
                  >. The raw ELK endpoint is
                  <a href="http://milleria.org:9200/cbb/_search?">here</a>.
                </p>
              </v-card-text>
            </v-card>
          </v-col> </v-row
        ><v-row dense class="mt-12">
          <v-col key="card.t9238ritle" cols="6">
            <v-card>
              <v-card-title>
                <span class="text-lowercase" style="font-size: 1.1em">
                  <v-icon
                    icon="mdi-timer-outline"
                    class="mr-4 text-disabled"
                  ></v-icon
                  >timestamps
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                <p class="pt-2">
                  Each record has `tstart` and `tend` timestamps that ostensibly
                  frame the specific instance within the episode. However, these
                  differ for listeners on paywall platforms vs the free feed as
                  episodes pass the edit points where commercials used to be.
                </p>
                <p class="pt-2">
                  Timestamps can still be used to get close to the instance when
                  listening, but they are no longer accurate enough to be used
                  for, say, supercutting or something. When they're wrong
                  they're as late as however N-many minutes of ads there were.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col key="card.t9238ritle" cols="6">
            <v-card>
              <v-card-title>
                <span class="text-lowercase" style="font-size: 1.1em">
                  <v-icon
                    icon="mdi-map-outline"
                    class="mr-4 text-disabled"
                  ></v-icon
                  >map
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                <p class="pt-2">
                  One of the bits is "Location." It's the genesis of this entire
                  waste of time and there's potentially a lot to explain about
                  it but that's prolly good money after bad.
                </p>
                <p class="pt-2">
                  This should suffice: for any query that returns Location bits
                  —

                  <router-link
                    to="/map/bit:Location%20AND%20tags%3Agino%20lombardo"
                    >Gino has a ton, of course</router-link
                  >;
                  <router-link to="/map/bit:Location%20AND%20tags%3Ahot%20dog"
                    >Hot Dog, too, on account of all of those auditions,
                    maybe</router-link
                  >; and then
                  <router-link
                    to="/map/bit:Location%20AND%20tags%3Ahuell%20howser"
                    >Huell Howser</router-link
                  >
                  was almost exclusively location-based — the map maps them.
                  Simple enough.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense class="mt-12">
          <v-col key="card.t9238ritle" cols="12">
            <v-card>
              <v-card-title>
                <span class="text-lowercase" style="font-size: 1.1em">
                  <v-icon
                    icon="mdi-hand-wave-outline"
                    class="mr-4 text-disabled"
                  ></v-icon
                  >contact
                </span>
              </v-card-title>

              <v-card-text class="pl-6 text-disabled">
                <p>
                  Seems unlikely you would need to contact the one aging white
                  dude who built and maintains this, but technically
                  <a href="mailto:pugolian+cbb@gmail.com" target="_blank"
                    >nothing can stop you</a
                  >.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, provide, toRaw } from "vue"; //usable vue elements
import { useRoute, useRouter } from "vue-router";
const ROUTER = useRouter();
import AXIOS from "axios";

import { useHead } from "@unhead/vue"; //head+meta manager
useHead({
  title: `CBBBT.v4 - Comedy Bang! Bang! Bit Tracker - About & Help`,
});

import Nav from "./Nav.vue";

const CONFIG = {
  elastic_bits: "http://milleria.org:9200/cbb/_search?",
  elastic_facets: "http://milleria.org:9200/cbb/_search?",
  atlas_geoms: "http://milleria.org:3030/geoms/simple?q=",
  atlas_updates: "http://milleria.org:9200/cbb_updates/_search?size=9999&q=",
};

onMounted(() => {
  // $bits();
});
</script>
