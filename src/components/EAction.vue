<template>
  <QBtn :label="action.label" @click="event()" :[type]="true" :[shape]="action.style" dense :icon="action.icon" class="q-mr-sm" v-if="action" color="primary"></QBtn>
  <QBtn :label="actionName" class="lt-md" v-else>
    <QPopupProxy cover>
      <component :is="component" v-if="component" v-bind="$attrs"></component>
      <!--<component :is="g" v-bind="$attrs" v-else></component>-->
      <!--<AwDialog v-bind="$attrs" ref="gh"></AwDialog>-->
    </QPopupProxy>
  </QBtn>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import { Action } from "../utils/types";
import { useRouter } from "vue-router";

const props = defineProps({
  component: {
    type: Object,
  },
  actionName: {
    type: String,
  },
  action: {
    type: Object as () => Action
  }
});

const type = props.action?.style?.type || 'unelevated'
const shape = props.action?.style?.shape || 'none'
let event: Function

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
const router = useRouter()
onMounted(() => {
  if (props.action) {
    switch (props.action.event) {
      case 'route':
        event = () => {
          router.push(props.action?.args)
        }
        break;
      case 'modal':
        
        break;
    
      default:
        break;
    }
  }
  const g = document.getElementById("g");
  //console.log('dom', gh.value.
});
</script>
