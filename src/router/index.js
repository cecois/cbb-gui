import { createRouter, createWebHashHistory } from "vue-router";

import CONFIG from "./config.json";

// https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226
// const _COLORS = ;

// https://coolors.co/palette/582f0e-7f4f24-936639-a68a64-b6ad90-c2c5aa-a4ac86-656d4a-414833-333d29
// const _COLORSSECONDARY = ;

const routes = [
  {
    path: "/",
    name: "Default", //random hero
    component: () => import("@/layouts/default/Default.vue"),
    props: { _config: CONFIG },
  },
  {
    path: "/bits/:paginationPage?/:userQuery?/:facetTags?",
    name: "Bits", //specific instance (individual record display)
    component: () => import("@/layouts/default/Bits.vue"),
    props: (route) => {
      return {
        paginationPage: route.params.paginationPage
          ? parseInt(route.params.paginationPage)
          : 1,
        userQuery: route.params.userQuery
          ? route.params.userQuery
          : "tags:aukerman",
        facetTags: route.params.facetTags,
        _config: CONFIG,
      };
    },
  },
  {
    path: "/map/:userQuery?/:activeLocation?",
    name: "Geo", //specific instance (individual record display)
    component: () => import("@/layouts/default/Geo.vue"),
    props: (route) => {
      return {
        _config: CONFIG,
        userQuery: route.params.userQuery
          ? route.params.userQuery
          : "tags:aukerman",
        activeLocation: route.params.activeLocation
          ? route.params.activeLocation
          : null,
        _config: CONFIG,
      };
    },
  },
  {
    path: "/updates",
    name: "Updates", //specific instance (individual record display)
    component: () => import("@/layouts/default/Updates.vue"),
  },
  {
    path: "/viz",
    name: "Viz", //specific instance (individual record display)
    component: () => import("@/layouts/default/Viz.vue"),
    props: { _config: CONFIG },
  },
  {
    path: "/about",
    name: "About", //about
    component: () => import("@/layouts/default/About.vue"),
  },
  {
    path: "/index",
    name: "Index", //about
    component: () => import("@/layouts/default/Index.vue"),
    props: { _config: CONFIG },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
