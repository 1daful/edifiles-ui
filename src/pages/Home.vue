<template>
  <!--<QLayout>
    <AwNavContainer routeName="Home" :routeParams="params" ref="bay"></AwNavContainer>
    <AwFilters :data="filterData" :query="query"></AwFilters>
    <EDataView :data="data" layout="Grid"></EDataView>
    <div ref="mef">
      <QBtn to="signin"> Sign in</QBtn>
    </div>
    <AwHorizontal :dataList="[data, data, data, data]" layout="Grid"></AwHorizontal>
  </QLayout>-->
  <EView :view="SBL"></EView>
  <EView
    :view="view"
    :hello="pr.hello"
    actionName="filters"
    :query="query"
    :data="filterData">
  </EView>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount } from "vue";
import EView from "../components/EView.vue";
import { DataType, Filters, View, QuestionType } from "../utils/types";
import { useWidgets } from "../utils/useWidgets";
import { Utility } from '@edifiles/services';
//import { mount } from "mount-vue-component";

const query = "Hello there";
const filterData: Filters = {
  index: "",
  rangeList: [
    {
      title: "Hello",
    },
  ],
  checks: [
    {
      attribute: "world",
      values: [
        {
          label: "jk",
        },
        {
          label: "ab",
        },
      ],
    },
  ],
};

const util = new Utility()

const pr = { hello: "Hello Btn" };
const params = {
  params: {
    name: "Home",
  },
};

const viewa = useWidgets();
const data: DataType = {
  //icon: "schedule",
  img: "../../public/hero_sunset.jpeg",
  overlay: "g",
  meta: {
    title: "The Black Skirt",
    description: "This is about man's fallacy and illusion that leads to infactuation.",
    created: "27-03-34",
    author: "Wonders Ayanfe",
  },
  actions: [
    {
      name: "Create",
      type: "Create",
      label: "Create",
      icon: "whatshot",
      event: "Create",
    },
    {
      name: "Read",
      type: "Read",
      label: "Read",
      icon: "bluetooth",
      event: "",
    },
  ],
  setHeader: true,
};
/*const view2: View = {
  layouts: [
    {
      type: "List",
      data: data,
    },
  ],
};*/
const view = new View({
  id: 'home',
  layout: "Grid",
  navType: "x-section",
  size: 6,
  sections: [data],
});

let SBL = viewa.get('Header')

//navList: this.$route.matched[0].children,
onBeforeMount(() => {
  //nextTick(() => {});
  viewa.insert("Header", view);
  console.log('SBL', SBL?.sections[0])
  console.log('DATATYPE', util.isType<string>(SBL?.sections[0]))
  console.log('TYPE', SBL?.sections[0] instanceof QuestionType)
});
</script>
