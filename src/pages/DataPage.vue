<template>
    <div v-for="section in view.sections">
        <template v-if="view.navType === 'x-section' || view.navType === 'y-section'">
        <EView v-if="util.isType<View>(section)" :view="view"></EView>
            <!--<ENav v-if="section.navType === 'x-nav' || section.navType === 'y-nav'"
            :orientation="section.navType"
            :dataList="[{
                path: section.name,
                params:{name: section.name},
                query: {section: JSON.stringify(section)},
            }]"></ENav>-->
        <EDataView :data="section" v-else-if="util.isType<DataType>(section)"></EDataView>
        <EDataView :questions="section" v-else-if="util.isType<QuestionType[]>(section)"></EDataView>
    </div>
    <RouterView></RouterView>
</template>

<script lang="ts">
import { QuestionType, DataType, NavLink, VComponent, View } from '../utils/types';
import { config } from "../../edifiles.config";
import { Utility } from '@edifiles/services';
//import {  } from "../utils/useData";
import { useWidgets } from "../utils/useWidgets";
import VSection from "../components/ESection.vue";
import ENav from "../components/ENav.vue";
import EDataView from "../components/EDataView.vue";
import EView from "../components/EView.vue";

import { defineComponent } from 'vue';

let view: View
const util = new Utility()
const SidebarLeft = useWidgets().get("SidebarLeft")
const Main = useWidgets().get("Main")

export default defineComponent({
    data() {
        return {
            util,
            view
        }
    },
    props: {
        propSection: {
            type: Object as () => View
        },
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        getView(id: string) {
            return config.template.views.find(view => {
                view.id === id
            });
        },
        createMenus() {
            config.template.views.forEach(view => {
                view.sections?.forEach(section => {
                    let xlink: NavLink = {
                        path: ''
                    }
                    let ylink: NavLink = {
                        path: ''
                    }

                    if(util.isType<View>(section) && view.navType === 'x-nav') {
                        xlink = {
                            path: '/datapage',
                            params: {id: section.id},
                            query: {id: section.id}
                        }
                        config.template.xlinks.push(xlink) 
                    }
                    else if (util.isType<View>(section) && view.navType === 'y-nav') {
                        ylink = {
                            path: '/datapage',
                            params: {id: section.id},
                            query: {id: section.id}
                        }
                        config.template.ylinks.push(ylink)
                    }
                });
            });
        }
    },
    mounted() {
        if(this.propSection) {
            this.view = this.propSection
        }
        else {
            this.view = this.getView(this.name) || new View({id: '', layout: 'Grid', navType: 'x-nav', size: 12})
        }
    }
})
</script>