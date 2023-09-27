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
  <EView :view="headerView" hello="hello"></EView>
  <EView
    :view="view2"
    :hello="pr.hello"
    actionName="filters"
    :query="query"
    :data="filterData">
  </EView>
  <ENav navType="top" :menuList="tabs"></ENav>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, shallowRef } from "vue";
import EView from "../components/EView.vue";
import ENav from "../components/ENav.vue";
import { DataType, Filters, View, NavList } from "../utils/types";
import { Utility } from '@edifiles/services';
import Buton from "../components/Buton.vue";
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

//const viewa = useWidgets();
const data: DataType = {
  //icon: "schedule",
  overlay: "../../public/hero_sunset.jpeg",
  items: [
    {
      content: [
        {
          label: "The Black Skirt",
        },
      ]
    },
    {
      content: [
        {
          label: "This is about man's fallacy and illusion that leads to infactuation.",
        }
      ]
    },
    {
      content: [
        {
          label: "27-03-34",
        },
        {
          label: "Wonders Ayanfe"
        }
      ]
    }
  ],
  actions: [
    {
      name: "Create",
      type: "Create",
      label: "Create",
      icon: "whatshot",
      event: "Create",
      onResult: [],
      onError: []
    },
    {
      name: "Read",
      type: "Read",
      label: "Read",
      icon: "bluetooth",
      event: "",
      onResult: [],
      onError: []
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
  heading: 'Welcome',
  id: 'home',
  layout: "Grid",
  navType: 'center',
  size: 'col-8',
  sections: [data],
});

const navList: NavList = new NavList({
  id: "first",
  content: [
    {
      path: '/blog',
      name: 'Blog',
      params: {},
      query: {}
    },
    {
      path: '/videos',
      name: 'Videos',
      params: {},
      query: {}
    }
  ],
  navType: "top"
})
const headerView = new View({
  id: 'header',
  layout: 'Grid',
  navType: 'top',
  size: 'col-12',
  sections: [Buton, Buton, navList]
})

const view2 = view

const tabs: NavList = {
  id: "",
  content: [{
    path: 'services',
    name: 'Services'
  },{
    path: 'services',
    name: 'Services'
  }
  ],
  navType: "top"
}

//let SBL = viewa.get('Header')

//navList: this.$route.matched[0].children,
onBeforeMount(() => {
  //nextTick(() => {});
  //viewa.insert("Header", view2);
  console.log('SBL')
});
</script>
