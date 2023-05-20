<template>
  <AwNavContainer
    brand="My App"
    routeName="MainLayout"
    ref="mainHeader"
    :hero="hero"
    :heroStyle="heroStyle"
  >
    <template #nav>
      <AwSearch></AwSearch>
    </template>
  </AwNavContainer>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { onBeforeMount, onMounted, provide, ref } from "vue";
import AwNavContainer from "../components/AwNavContainer.vue";
import AwSearch from "../components/AwSearch.vue";
import { useRoute, useRouter } from "vue-router";
import config from "../../public/config.json";
const hero = config.hero;
const $q = useQuasar();
const mainHeader = ref(null);
const bgImg = "../public/hero_blue.jpeg";
let heroStyle = {
  backgroundImage: "url(" + bgImg + ")",
  position: "relative",
  height: "500px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "rgba(140, 23, 44, 0.7)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fixedNav: true,
  headerColor: "rgba(255, 0,0,1)",
};
// set status
$q.dark.set(true); // or false or "auto"

// get status
console.log($q.dark.isActive); // true, false

// get configured status
console.log($q.dark.mode); // "auto", true, false

// toggle
$q.dark.toggle();
provide("mainHeader", "mainHeader");

onBeforeMount(() => {
  if (useRoute().path !== "/") {
    heroStyle = {};
  }
});
</script>

<style scoped></style>
