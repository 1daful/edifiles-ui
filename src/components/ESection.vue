<template>
    <div v-for="section in sections" :section="section">
        <EDataView v-if="sectionData" :data="sectionData"></EDataView>
        <VSection v-else-if="sections"></VSection>
    </div>
    <VNav :dataList="links"></VNav>
</template>

<script lang="ts">
import { Utility } from '@edifiles/services';
import { DataSource, DataType, View } from "../utils/types";
import { defineComponent } from 'vue';
import EDataView from "../components/EDataView.vue";
const util = new Utility()
let sectionData: DataType
let sections: DataSource
let links: string[]
let view: View = new View({
    type: "Grid",
    size: 3,
})

export default defineComponent({
  name: "VSection",
  data() {
    return {
        sectionData,
        sections,
        links
    }
  },
  props: {
    section: {
        type: Object as () => DataSource,
        required: true
    }
  },
  methods: {
    getSections(){
            this.section.content.forEach(section => {
                if(util.isType<DataSource>(section)) {
                    if(section.navType === 'x-section' || section.navType === 'y-section') {
                        //sections.push(section)
                        view.components?.push(this)
                    }
                    else {
                        this.links.push(section.name)
                    }
                    return sections
                }
        })
        return sections
    },
    getData(){
        let dataList: DataType[] = []
        this.section.content.forEach(data => {
            if(util.isType<DataType>(data)) {
                dataList.push(data)
            } 
        });
        return dataList
    }
  },
  mounted() {
    this.sectionData = this.getData()
    this.sections = this.getSections()

  },
});
</script>