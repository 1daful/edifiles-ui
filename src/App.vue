<template>
  <router-view :key="r.fullPath"></router-view>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { provide, ref } from "vue";
import { useRoute } from "vue-router";
const $q = useQuasar();
const r = useRoute();
const mainHeader = ref(null);
// set status
$q.dark.set(true); // or false or "auto"

// get status
console.log($q.dark.isActive); // true, false

// get configured status
console.log($q.dark.mode); // "auto", true, false

// toggle
$q.dark.toggle();
provide("mainHeader", "mainHeader");
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
body {
  background-color: black;
}
</style>
