<template>
  <v-main>
    <!-- <router-view /> -->

    <v-timeline>
      <!-- <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right"> timeline item </v-timeline-item> -->
      <v-timeline-item v-for="telling in _props.tellings">{{
        telling.title
      }}</v-timeline-item>
    </v-timeline>
  </v-main>
</template>

<script setup>
//
const _props = defineProps({
  tellings: Array,
});
</script>
