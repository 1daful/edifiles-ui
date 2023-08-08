<template>
  <!--<ENavMenus
    brand="My App"
    routeName="MainLayout"
    ref="mainHeader"
    :hero="hero"
    :heroStyle="heroStyle"
  >
    <template #nav>
      <ESearch></ESearch>
    </template>
  </ENavMenus>-->
  <ENav navType="y-tab" :menuList="menus">
  </ENav>
  <RouterView :key="useRoute().fullPath"></RouterView>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { onBeforeMount, ref } from "vue";
import ENavMenus from "../components/ENavMenus.vue";
import ESearch from "../components/ESearch.vue";
import ENav from "../components/ENav.vue";
import { useRoute, useRouter } from "vue-router";
import { config } from "../../edifiles.config";
import config2 from "../../public/config.json";
import { View } from "../utils/types";
import { menus } from "../utils/menus";

const hero = config2.hero;
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

onBeforeMount(() => {
  if (useRoute().path !== "/") {
    heroStyle = {};
  }
});
</script>

<style scoped></style>
