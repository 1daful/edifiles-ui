<template>
    <EView v-for="widget in widgets" :view="widget"></EView>
</template>

<script setup lang="ts">
import { FormType, DataType, PageView, NavLink, isType, View, SectionView, TabType, SecTionType } from '../utils/types';
import { viewResolver } from "../../edifiles.config";
import { useRoute } from "vue-router";
import EView from "../components/EView.vue";
import { onMounted } from 'vue';
import { provide } from 'vue';
import { useWidgets } from '../utils/useWidgets';

let view: PageView = new PageView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
})

let centerView = new SectionView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
    size: 8,
    navType: 'center'
})

let id: string | number
let type: string
let categories: string[]
const widgets: View[] = [centerView]

const getWidget = (id: SecTionType, widgets: View[]) => {
    let widget =  widgets.find(widget => widget.id === id);
    if (widget) {
        return widget
    }

    else {
        widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        })
        widgets.push(widget)
        return widget
    }
}

const getWidgetInstance = (id: SecTionType, widgets: View[]) => {
    const navType = {
    top: 0,
    left: 1,
    center: 2,
    right: 3,
    bottom: 4
    };

    if (widgets) {
        return getWidget(id, widgets)
    }
    else {
        const widgets: View[] = []
        let widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        })
        if(id === 'bottom' || id === 'center' || id === 'left' || id === 'right' || id === 'top') {
            widgets.splice(navType[id], 1, widget);
            return widgets
        }
        else {
            useWidgets().get(id)
        }
    }
}

onMounted(async () => {
    provide('widgets', widgets)
})
</script>