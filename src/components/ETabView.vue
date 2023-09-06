<template>
    <!--<template v-for="(widget, navType) in widgets">
        <EView v-if="widget.navType !== 'bottom'" :view="widget"></EView>
    </template>-->
       <RouterView @emitted="handleEvent" :key="useRoute().fullPath"></RouterView>
        <!--<EView v-if="widgets.bottom.navType === 'bottom'" :view="widgets.bottom"></EView>
        <EView v-if="widgets" :view="widgets"></EView>-->
</template>

<script setup lang="ts">
import EView from "./EView.vue";
import { View } from "../utils/types";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const props = defineProps({
    widgets: {
        type: View,
        required: true
    }
})

const navType = {
    top: 0,
    left: 1,
    center: 2,
    right: 3,
    bottom: 4
};

const handleEvent = (view: View) => {
    if(view.navType === 'bottom' || view.navType === 'left' || view.navType === 'right' || view.navType === 'top') {
        //props.widgets.splice(navType[view.navType], 1, view);
    }
}

onMounted(() => {
    const parentId = useRoute().params
    const route = {
    path: `/:id`,
    component: () => import('../pages/Page.vue')
    };
    useRouter().addRoute(`${parentId}`, route);
})
</script>