<template>
    <div class="q-pa-md">
      <q-scroll-area style="height: 230px">
        <div class="row" style="flex-wrap: nowrap">
          <AwDataView
            v-for="data in dataList"
            :data="data"
            :layout="layout"
            class="q-pa-sm q-ma-sm"
          ></AwDataView>
        </div>
      </q-scroll-area>
    </div>
  </template>
  
  <script setup lang="ts">
  import { DataType, LayoutType } from "../utils/types";
  import AwDataView from "./AwDataView.vue";
  
  defineProps({
    dataList: {
      type: Array as () => DataType[],
      required: true,
    },
    layout: {
      type: String as () => LayoutType,
    },
  });
  </script>
  