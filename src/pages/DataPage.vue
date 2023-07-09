<template>
    <div v-for="sect in section.sections">
        <RouterLink v-if="util.isType<DataSource>(sect) && (section.navType === 'x-nav' || section.navType === 'y-nav')" :to="{
            path: sect.name,
            params:{name: sect.name},
            query: {section: JSON.stringify(sect)}
        }"></RouterLink>
        <EDataView :data="sect" v-else-if="util.isType<DataType>(sect)"></EDataView>
        <DataPage :section="sect" v-if="util.isType<DataSource>(sect) && (section.navType === 'x-section' || section.navType === 'y-section')"></DataPage>
    </div>
    <RouterView></RouterView>
</template>
7
<script lang="ts">
import { DataSource, DataType, NavLink, VComponent, View } from '../utils/types';
import { config } from "../../edifiles.config";
import { Utility } from '@edifiles/services';
//import {  } from "../utils/useData";
import { useWidgets } from "../utils/useWidgets";
import VSection from "../components/ESection.vue";
import ENav from "../components/ENav.vue";
import EDataView from "../components/EDataView.vue";

import { defineComponent } from 'vue';

let section: DataSource
const util = new Utility()
const SidebarLeft = useWidgets().get("SidebarLeft")
const Main = useWidgets().get("Main")
const VNavComp = {
    content: ENav,
    props: {
        dataList: []
    }
}
let VSectionComp: VComponent = {
    content:VSection,
    props: {
        section: {}
    }
}
let sectionView = new View({
    type: "Grid",
    size: 0,
    components: [VSectionComp]
})
const xNav = new View({
    type: "Horizontal",
    size: 12
})

const yNav = new View({
    type: "Grid",
    size: 12
})

let view: View = new View({
    type: "Grid",
    size: 3
})

const views: View[] = [
    SidebarLeft,
    Main
];

export default defineComponent({
    data() {
        return {
            util,
            SidebarLeft,
            Main,
            section
        }
    },
    props: {
        propSection: {
            type: Object as () => DataSource
        },
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        getDataS(datasource?: DataSource) {
            config.template.dataviews.forEach(dataView => {
                dataView.datasouces.forEach(datasource => {
                    datasource.content.forEach(section => {
                        if(util.isType<DataSource>(section)) {
                            if(section.navType === 'x-section' || section.navType === 'y-section') {
                                //sections.push(section)
                                let sectionComp: VComponent = {
                                    content: VSection,
                                    props: section
                                }
                                Main.push(sectionComp)
                            }
                            else if(section.navType === 'y-nav') {
                                //sections.push(section)
                                const link: NavLink = {
                                    path: section.name,
                                    params: {name: section.name}
                                }
                                VNavComp.props.dataList.push(link)
                                SidebarLeft.push(VNavComp)
                                //useWidgets().insert('SidebarLeft', VNav)
                                /**
                                 * OR
                                 * sidebar.push(VNav)
                                 */
                            }
                            else if (section.navType === 'x-nav') {
                                const link: NavLink = {
                                    path: section.name,
                                    params: {name: section.name}
                                }
                                VNavComp.props.dataList.push(link)
                                Main.push(VNavComp)
                            }
                            return sections
                        }
                });
                });
            });
            const data: DataType[] = []
            return data
        },
    },
    mounted() {
        if(this.propSection) {
            this.section = this.propSection
        }
        else {
            this.section = this.getDataSource(this.name)
        }
    }
})

function getData(g: DataSource) {
    let links = []
    let dat: any[] = []
    g.sections.forEach(section => {
        if(util.isType<DataSource>(section.data)) {
            links.push(section.data.name)
        }
        else if(util.isType<DataType>(section.data)) {
            dat.push()
        }
    });
    return dat
}
</script>