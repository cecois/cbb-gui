<template>
  <div class="text-center">
    <v-overlay
      :model-value="_props.loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="#94d2bdff"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineProps, onMounted } from "vue";
// const route = useRoute();

// const _path = computed(() => route.path);

const _props = defineProps({ loading: Boolean });

onMounted(() => {});
</script>
