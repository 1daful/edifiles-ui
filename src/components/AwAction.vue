<template>
  <QBtn :label="actionName" class="lt-md">
    <QPopupProxy cover>
      <component :is="component" v-if="component" v-bind="$attrs"></component>
      <!--<component :is="g" v-bind="$attrs" v-else></component>-->
      <!--<AwDialog v-bind="$attrs" ref="gh"></AwDialog>-->
    </QPopupProxy>
  </QBtn>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";

const props = defineProps({
  component: {
    type: Object,
  },
  actionName: {
    type: String,
  },
});

const AwDialog = defineAsyncComponent(
  () =>
    import(
      "../components/" +
        "Aw" +
        props.actionName?.charAt(0).toUpperCase() +
        props.actionName?.slice(1) +
        ".vue"
    )
);

/*const defaultComponent = () => {
  let components;
  if (props.actionName) {
    switch (props.actionName) {
      case "filter":
        components = AwFilters;
        break;
      case "filters":
        break;
      default:
        break;
    }
  }
  return components;
};*/
const gh = ref("");
onMounted(() => {
  const g = document.getElementById("g");
  //console.log('dom', gh.value.
});
</script>
