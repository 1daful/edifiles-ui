<template>
  <QLayout>
    <AwNavContainer routeName="Home" :routeParams="params" ref="bay"></AwNavContainer>
    <AwFilters :data="filterData" :query="query"></AwFilters>
    <AwView
      :view="view"
      :hello="pr.hello"
      actionName="filters"
      :query="query"
      :data="filterData"
    ></AwView>
    <AwDataView :data="data" layout="Grid"></AwDataView>
    <div ref="mef">
      <QBtn to="signin"> Sign in</QBtn>
    </div>
    <AwHorizontal :dataList="[data, data, data, data]" layout="Grid"></AwHorizontal>
  </QLayout>
</template>

<script setup lang="ts">
import { defineComponent, inject, nextTick, onMounted, ref } from "vue";
import AwNavContainer from "../components/AwNavContainer.vue";
import Btn from "../components/Buton.vue";
import AwView from "../components/AwView.vue";
import AwDataView from "../components/AwDataView.vue";
import AwAction from "../components/AwAction.vue";
import AwHorizontal from "../components/AwHorizontal.vue";
import AwFilters from "../components/AwFilters.vue";
import { DataType, Filters, Layout, View } from "../utils/types";
import Hello from "../components/HelloWorld.vue";
import { useDialog } from "../utils/useDialog";
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

const pr = { hello: "Hello Btn" };
const params = {
  params: {
    name: "Home",
  },
};

const viewa = useDialog();
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
      type: "Create",
      label: "Create",
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
const layouts: Layout[] = [
  /*{
    type: "List",
    view: view2,
  },*/
  {
    type: "List",
    id: "leftBar",
    components: [AwFilters],
    size: 3,
    viewport: "gt-sm",
  },
  {
    type: "List",
    id: "rightBar",
    size: 6,
    data: [data],
  },
  {
    type: "List",
    components: [AwAction],
    size: 3,
  },
];
const view: View = {
  layouts,
};

name: "Home";
//navList: this.$route.matched[0].children,
onMounted(() => {
  nextTick(() => {});
  viewa.insert("home", view);
  //view.layouts.push(layou);
  console.log("STORE ", viewa.views);
});
</script>
