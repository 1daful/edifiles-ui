<template>
  <div class="row">
    <div :key="view.id" :class="`col-lg-${view.size} ${view.viewport}`">
      <h4 v-if="view.heading">{{ view.heading }}</h4>
      <template
          v-for="section in view.sections">
        <Component v-if="isVComponent(section)"
          :is="section.content"
          v-bind="{...section.props, ...$attrs }">
        </Component>
        <EDataView v-if="isDataType(section)" :data="section"></EDataView>
        <EView v-if="isView(section)" :view="section"></EView>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import EDataView from "../components/EDataView.vue";
import { View, VComponent, DataType, isVComponent, isDataType, isQuestionType, isView } from "../utils/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EView",
  data() {
    return {
      isVComponent,
      isDataType,
      isView,
      isQuestionType
    }
  },
  components: { EDataView },
  props: {
    view: {
      required: true,
      type: Object as () => View,
    },
    /*hello: {
      required: true,
      type: String,
    },*/
    dynamicProps: {
      type: null
    }
  },
  mounted() {
    console.log("Attrs: ", this.$attrs);
  },
});
</script>
