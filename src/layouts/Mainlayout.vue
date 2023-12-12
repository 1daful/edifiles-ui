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
  <div class="row">
    <!--EView :view="GlobalView.mainLayout"></EView-->
    <ELayout :view="view"></ELayout>
  </div>
  <RouterView :key="useRoute().fullPath"></RouterView>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalView } from "../../config/edifiles.config";
import config2 from "../../public/config.json";
import EView from "../components/EView.vue";
import ELayout from "../components/ELayout.vue";
import Page from "../pages/About.vue";
import { View } from "../utils/types";

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

const view: View = new View({
  sections: GlobalView.mainLayout.sections,
  id: "",
  layout: "Grid",
  size: "",
  navType: "top"
})
// set status
$q.dark.set(true); // or false or "auto"

// get status
console.log($q.dark.isActive); // true, false

// get configured status
console.log($q.dark.mode); // "auto", true, false

// toggle
$q.dark.toggle();

onBeforeMount(() => {
  /*GlobalView.mainLayout.children.forEach(child => {
    useRouter().addRoute('MainLayout', {
      path: `/${child.id}`,
      name: `${child.id}`,
      component: Page,
    })
  });*/

  if (useRoute().path !== "/") {
    heroStyle = {};
  }
});
</script>

<style scoped></style>
