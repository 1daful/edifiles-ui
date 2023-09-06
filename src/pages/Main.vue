<template>
    <EView :view="view"></EView>
</template>

<script setup lang="ts">
import { FormType, DataType, PageView, NavLink, isType, IView, SectionView, TabType, SecTionType } from '../utils/types';
import { viewResolver } from "../../edifiles.config";
import { useRoute } from "vue-router";
import EView from "../components/EView.vue";
import { onMounted } from 'vue';

let view: PageView = new PageView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
})

let centerView = new SectionView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
    size: "col-8",
    navType: 'center'
})

let id: string | number
let type: string
let categories: string[]
const widgets: IView[] = [centerView]

const getWidget = (id: SecTionType, widgets: IView[]) => {
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

const getWidgetInstance = (id: SecTionType, widgets: IView[]) => {
    if (widgets) {
        return getWidget(id, widgets)
    }
    else {
        const widgets = []
        let widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        })
        widgets.push(widget)
        return widgets
    }
}

const processMenus = () => {
    const topWidget = getWidgetInstance('top', widgets)
    const bottomWidget = getWidgetInstance('bottom', widgets)
    const leftWidget = getWidgetInstance('left', widgets)
    const rightWidget = getWidgetInstance('right', widgets)
}

    onMounted(async () => {
        type = useRoute().params.type as string
        categories = useRoute().params.categories as string[]
            if (categories) {
                let listView = new SectionView({
                    id: categories ? categories[categories.length - 1] : type,
                    layout: 'Grid',
                    sections: await viewResolver.list(type, undefined, categories.map(category => ({
                        prop: 'category',
                        operator: 'eq',
                        value: category
                    }))),
                    navType: 'center',
                    size: 12
                })
            }
        //console.log('List')
    })
</script>