<template>
    <div :key="view.id" :class="`${view.size} ${view.viewport}`" v-if="view.layout === 'Grid'">
      <h4 v-if="view.heading">{{ view.heading }}</h4>
      <template v-for="section in view.sections">
        <ENav v-if="isType(section, NavList)" :menuList="section.content" :navType="section.navType"></ENav>
        <Component v-if="isVComponent(section)"
          :is="section.content"
          v-bind="{...section.props, ...$attrs }" :key="section.content.name">
        </Component>
        <Component v-if="isComponent(section)"
          :is="section"
          v-bind="{...$attrs }" :key="section.name">
        </Component>
        <EDataView v-if="isDataType(section)" :data="section" :key="section.id"></EDataView>
        <EDataView v-if="isType(section, FormType)" :form="section" :key="section.name"></EDataView>
        <EView v-if="isType(section, View) || isType(section, PageView)" :view="section" :key="section.id"></EView>
        <!--<ENav
        navType="y-tab"
        :menuList="processMenus(view).yMenus"></ENav>
        <RouterView :key="$route.fullPath"></RouterView>-->
      </template>

<!--<div v-for="section in view.sections">
        <ENav v-if="isNavList(section)" :menuList="section.content" :navType="section.navType"></ENav>
        <Component v-if="isVComponent(section)"
          :is="section.content"
          v-bind="{...section.props, ...$attrs }" :key="section.content.name">
        </Component>
        <Component v-if="isComponent(section)"
          :is="section"
          v-bind="{...$attrs }" :key="section.name">
        </Component>
        <EDataView v-if="isDataType(section)" :data="section" :key="section.id"></EDataView>
        <EView v-if="isType(section, View)" :view="section" :key="section.id"></EView>
</div>-->


      <!--<ETabView :widgets="view">
      </ETabView>-->
    </div>
</template>

<script lang="ts">
import EDataView from "./EDataView.vue";
import ENav from "./ENav.vue";
import { Layout, View, TabView, SectionView, PageView, isVComponent, isDataType, isQuestionType, isView,isComponent, isNavList, isType, NavLink, FormType, VComponent, ViewSection, SecTionType, NavList, IView } from "../utils/types";
import ETabView from "./ETabView.vue";
import { defineComponent } from "vue";

let topMenus: NavLink[] = []
let bottomMenus: NavLink[] = []
let leftMenus: NavLink[] = []
let rightMenus: NavLink[] = []

let review = new View({
  id: '',
  layout: 'Grid',
  navType: 'center',
  sections: [],
  size: 'col-8'})

let widgets = Layout
let navViews: View[] = []

export default defineComponent({
  name: "EView",
  data() {
    return {
      isComponent,
      isVComponent,
      isDataType,
      isView,
      isQuestionType,
      isNavList,
      isType,
      NavList,
      FormType,
      View,
      TabView,
      SectionView,
      PageView,
      pageView: new PageView({
        id: '',
        layout: 'Grid',
        sections: [
          new SectionView({
            id: 'top',
            layout: 'Grid',
            sections: [],
            size: 'col-12',
            navType: 'top'
          }),
          new SectionView({
            id: 'bottom',
            layout: 'Grid',
            sections: [],
            size: 'col-12',
            navType: 'bottom'
          }),
          new SectionView({
            id: 'left',
            layout: 'Grid',
            sections: [],
            size: 'col-12',
            navType: 'left'
          }),
          new SectionView({
            id: 'right',
            layout: 'Grid',
            sections: [],
            size: 'col-12',
            navType: 'right'
          }),
          new SectionView({
            id: 'top',
            layout: 'Grid',
            sections: [],
            size: 'col-12',
            navType: 'center'
          }),
        ],
      }),
      review,
      widgets,
      navViews
    }
  },
  components: { EDataView, ETabView, ENav },

  props: {
    view: {
      required: true,
      type: Object as () => IView,
    },
    /*hello: {
      required: true,
      type: String,
    },*/
    dynamicProps: {
      type: null
    }
  },
  methods: {
    /*processMenus(section: TabView) {
      /*const extractlink = (section: Nav): NavLink => ({
        path: section.id,
        name: section.id,
        params: {
            type: useRoute().params.type,
            categories: useRoute().params.categories
        }
      });
          topMenus.push(section);
          else if (section.navType === 'left') {
            leftMenus.push(extractlink(section));
          }
          else if (section.navType === 'right') {
            rightMenus.push(extractlink(section));
          }
          else if (section.navType === 'bottom') {
            bottomMenus.push(extractlink(section));
          }
      return { rightMenus, leftMenus, bottomMenus, topMenus };
    },*/

    processView() {
      this.view.sections.forEach(section => {
        /*if(isType(section, TabView)) {
          //const widget = getWidgetInstance(section.navType)
          if(section.navType === 'bottom' || section.navType === 'center' || section.navType === 'left' || section.navType === 'right' || section.navType === 'top') {
              this.widgets[section.navType].sections.push(section)
              return widgets
          }
          else {
              useWidgets().get(section.navType)
          }
        }*/
        if (isType(section, TabView) && section.navType !== 'center') {
          this.navViews.push(section)
        }
        /*else {
          this.review.sections.push(section)
        }*/
        
      });
    },
    /*processTabView(tabview: TabView) {
      this.widgets[tabview.navType].sections.push(tabview)
    }*/
  },

  mounted() {
    //this.processView()
    this.$emit('emitted', this.navViews)
  },
});
</script>
<style scoped>

</style>
