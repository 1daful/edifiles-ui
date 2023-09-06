<template>
    <EView :view="view"></EView>
</template>

<script setup lang="ts">
import { View } from '../utils/types';
import { viewResolver } from "../../edifiles.config";
import { useRoute } from "vue-router";
import EView from "../components/EView.vue";
import { onMounted } from 'vue';

let view = new View({
    id: 'listView',
    layout: 'Grid',
    sections: [],
    size: 8,
    navType: 'center'
})

let type: string
let categories: string[]

onMounted(async () => {
    type = useRoute().params.type as string
    categories = useRoute().params.categories as string[]
        if (categories) {
            view = new View({
                id: categories ? categories[categories.length - 1] : type,
                layout: 'Grid',
                sections: await viewResolver.list(type, undefined, categories.map(category => ({
                    prop: 'category',
                    operator: 'eq',
                    value: category
                }))),
                navType: 'center',
            })
        }
    //console.log('List')
})
</script>