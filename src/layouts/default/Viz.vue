<template>
  <v-app>
    <v-main>
      <v-container fluid class="">
        <Nav />

        <v-row class="mt-12" no-gutters>
          <v-col>
            <v-card style="height: 100vh">
              <v-chart
                class="chart"
                :option="topBits"
                @click.default="$chartBitsClick"
                autoresize
              />
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-12" no-gutters>
          <v-col>
            <v-card style="height: 100vh">
              <v-chart
                class="chart"
                :option="topTags"
                @click.default="$chartTagsClick"
                autoresize
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-12" no-gutters>
          <v-col>
            <v-card style="height: 70vh">
              <v-chart
                class="chart"
                :option="topSongs"
                @click.default="$chartSongsClick"
                autoresize
              />
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
import { DateTime } from "luxon";

/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| apache echarts*/
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, FunnelChart, TreemapChart } from "echarts/charts";
import {
  TitleComponent,
  GridComponent,
  VisualMapComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  PieChart,
  FunnelChart,
  TreemapChart,
]);
/* ||||||||||||||||||||||||||||||||||||||||||||||apache echarts*/

const ROUTER = useRouter();
import AXIOS from "axios";
import Nav from "./Nav.vue";

import { useHead } from "@unhead/vue"; //head+meta manager
useHead({
  title: `CBBBT.v4 - Comedy Bang! Bang! Bits charts & graphs`,
});

const _props = defineProps({
  _config: Object,
});

const CONFIG = {
  elastic_bits: "http://milleria.org:9200/cbb/_search?",
  elastic_facets: "http://milleria.org:9200/cbb/_search?",
  atlas_geoms: "http://milleria.org:3030/geoms/simple?q=",
  index_updates: "http://milleria.org:9200/cbb_updates/_search?size=9999&q=*",
};

// https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226
// const _COLORS = [
//   { name: "richblack", hex: "#001219ff" },
//   { name: "midnightgreen", hex: "#005f73ff" },
//   { name: "darkcyan", hex: "#0a9396ff" },
//   { name: "tiffanyblue", hex: "#94d2bdff" },
//   { name: "vanilla", hex: "#e9d8a6ff" },
//   { name: "gamboge", hex: "#ee9b00ff" },
//   { name: "alloyorange", hex: "#ca6702ff" },
//   { name: "rust", hex: "#bb3e03ff" },
//   { name: "rufous", hex: "#ae2012ff" },
//   { name: "auburn", hex: "#9b2226ff" },
// ];

/* CSS HEX */
// const _COLORS = [
//   { name: "richblack", hex: "#001219ff" },
//   { name: "sinopia", hex: "#D23A0Dff" },
//   { name: "lightblue", hex: "#C2E6F1ff" },
//   { name: "skyblue", hex: "#66C2E5ff" },
//   { name: "celestialblue", hex: "#019FE3ff" },
//   { name: "xanthous", hex: "#F7B112ff" },
//   { name: "alloyorange", hex: "#ca6702ff" },
//   { name: "pictonblue", hex: "#24AAE1ff" },
//   { name: "white", hex: "#FEFEFEff" },
//   { name: "cambridgeblue", hex: "#96BEA9ff" },
// ];

// https://coolors.co/palette/582f0e-7f4f24-936639-a68a64-b6ad90-c2c5aa-a4ac86-656d4a-414833-333d29
// const _COLORSSECONDARY = [
//   { name: "sealbrown", hex: "#582f0eff" },
//   { name: "russet", hex: "#7f4f24ff" },
//   { name: "rawumber", hex: "#936639ff" },
//   { name: "lion", hex: "#a68a64ff" },
//   { name: "khaki", hex: "#b6ad90ff" },
//   { name: "sage", hex: "#c2c5aaff" },
//   { name: "sage2", hex: "#a4ac86ff" },
//   { name: "resedagreen", hex: "#656d4aff" },
//   { name: "ebony", hex: "#414833ff" },
//   { name: "blackolive", hex: "#333d29ff" },
// ];

const topTags = reactive({
  // color: [..._COLORS.map((c) => c.hex), ..._COLORSSECONDARY.map((c) => c.hex)],
  color: [
    ..._props._config.colors.primary.map((c) => c.hex),
    ..._props._config.colors.secondary.map((c) => c.hex),
  ],
  title: {
    text: "Top Tags",
    subtext: "tags by count, full universe",
    left: "center",
  },
  series: [
    {
      name: "Disk Usage",
      type: "treemap",
      breadcrumb: { show: false },
      visibleMin: 300,
      label: {
        show: true,
        formatter: (b) => b.key,
      },
      itemStyle: {
        borderColor: "#000",
      },
      data: [],
    },
  ],
});

const topBits = reactive({
  color: _props._config.colors.primary.map((c) => c.hex),
  title: {
    text: "Top Bits",
    subtext: "bits by count, full universe",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: 100,
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Top Bits",
      type: "pie",
      radius: "50%",
      label: {
        show: true,
        formatter: (b) => {
          return b.name.split("(")[0];
        },
      },
      data: null,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const topSongs = reactive({
  color: _props._config.colors.primary.map((c) => c.hex).slice(0, 8),
  title: {
    text: "Top 8 Songs",
    subtext: "referenced songs, full universe",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: null,
  series: [
    {
      name: "Top Songs",
      label: {
        show: true,
        position: "inside",
      },
      type: "funnel",
      radius: "50%",
      width: "90%",
      // minSize: "0%",
      // maxSize: "100%",
      sort: "descending",
      gap: 2,
      data: null,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const $chartBitsClick = (v, x, y) => {
  let chartCount = ` (${v.data.value})`;
  ROUTER.push({
    path: `/bits/1/bit:%22${v.data.name.replace(chartCount, "")}%22`,
  });
};

const $chartTagsClick = (v, x, y) => {
  let chartCount = ` (${v.data.value})`;
  ROUTER.push({
    path: `/bits/1/tags:%22${v.data.name.replace(chartCount, "")}%22`,
  });
};

const $chartSongsClick = (v, x, y) => {
  let chartCount = ` (${v.data.value})`;
  ROUTER.push({
    path: `/bits/1/tags:%22${v.data.name.replace(chartCount, "")}%22`,
  });
};

const $universe = async () => {
  let limit = 50;
  let subLimitTags = 41;
  let subLimitBits = 10;
  let subLimitSongs = 8;
  let QB = {
    size: 0,
    query: { query_string: { query: "*:*" } },
    aggregations: {
      all_bits: {
        global: {},
        aggregations: {
          tags: {
            filter: { query_string: { query: "*:*" } },
            aggregations: {
              filtered_tags: { terms: { size: limit, field: "tags.keyword" } },
            },
          },
          guests: {
            filter: { query_string: { query: "*:*" } },
            aggregations: {
              filtered_guests: {
                terms: { size: limit, field: "episode_guests.keyword" },
              },
            },
          },
          bits: {
            filter: { query_string: { query: "*:*" } },
            aggregations: {
              filtered_bits: { terms: { size: limit, field: "bit.keyword" } },
            },
          },
          episodes: {
            filter: { query_string: { query: "*:*" } },
            aggregations: {
              filtered_episodes: {
                terms: { size: limit, field: "episode.keyword" },
              },
            },
          },
        },
      },
    },
  }; //QB

  let QS = {
    size: 0,
    query: { query_string: { query: "tags:song" } },
    aggregations: {
      songs: {
        global: {},
        aggregations: {
          tags: {
            filter: {
              query_string: { query: "tags:song" },
            },
            aggregations: {
              filtered_tags: {
                terms: {
                  size: 111,
                  field: "tags.keyword",
                },
              },
            },
          },
        },
      },
    },
  }; //QS

  const universeCall = await AXIOS.post(CONFIG.elastic_bits, QB);
  const songsCall = await AXIOS.post(CONFIG.elastic_bits, QS);

  topTags.title.text = `Top ${subLimitTags} Tags`;
  topTags.series[0].data =
    universeCall.data.aggregations.all_bits.tags.filtered_tags.buckets
      .slice(0, subLimitTags)
      .map((b) => {
        return {
          value: b.doc_count,
          name: `${b.key} (${b.doc_count})`,
        };
      });

  topSongs.series[0].data =
    songsCall.data.aggregations.songs.tags.filtered_tags.buckets
      .filter((t) => t.key.indexOf("(song)") > 0)
      .slice(0, subLimitSongs)
      .map((b) => {
        return {
          value: b.doc_count,
          name: `${b.key} (${b.doc_count})`.replace(" (song)", ""),
        };
      });

  topBits.title.text = `Top ${subLimitBits} Bits`;
  topBits.series[0].data =
    universeCall.data.aggregations.all_bits.bits.filtered_bits.buckets
      .slice(0, subLimitBits)
      .map((b) => {
        return {
          value: b.doc_count,
          name: `${b.key} (${b.doc_count})`,
        };
      });
}; //$universe

onMounted(() => {
  $universe();
});
</script>
