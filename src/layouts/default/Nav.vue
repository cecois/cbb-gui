<template>
  <v-app-bar class="app-bg-primary app-bar-primary">
    <!-- <a href="/"><img class="" src="/logo.svg" /></a> -->
    <v-container class="align-items-baseline pl-0 text-uppercase">
      <router-link to="/">
        <span class="text-lowercase" style="font-size: 1.5em">
          cb<i class="" style="font-size: 3.1em; top: -4px; position: relative"
            >!</i
          >b<i
            class="text-disabled"
            style="font-size: 3.1em; top: -4px; position: relative"
            >!</i
          >BT
        </span>
      </router-link>

      <!-- <router-link to="/bits/tags:stillwater">sample query link</router-link> -->
      <!-- <router-link class="ml-12" to="/updates">updates</router-link> -->
      <router-link
        :class="[_path == '/updates' ? 'text-disabled' : '', 'ml-12']"
        to="/updates"
        >updates</router-link
      >
      <router-link
        :class="[_path == '/bits' ? 'text-disabled' : '', 'ml-12']"
        :to="_props.userQuery ? `/bits/1/${_props.userQuery}` : '/bits'"
        >bits</router-link
      >
      <router-link
        :class="[_path == '/viz' ? 'text-disabled' : '', 'ml-12']"
        to="/viz"
        >viz</router-link
      >
      <router-link
        :class="[_path == '/map' ? 'text-disabled' : '', 'ml-12']"
        :to="_props.userQuery ? `/map/${_props.userQuery}` : '/map'"
        >map</router-link
      >

      <router-link
        :class="[_path == '/index' ? 'text-disabled' : '', 'ml-12']"
        to="/index"
        >index</router-link
      >
      <router-link
        :class="[_path == '/about' ? 'text-disabled' : '', 'ml-12']"
        to="/about"
        >huh?</router-link
      >
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
const route = useRoute();
const _path = computed(() => route.path);

const _props = defineProps({ userQuery: String });

onMounted(() => {});
</script>
