<template>
  <div class="row jstify-start" v-if="props.orientation === 'y-nav'">
    <div class="col-3 header-link" v-show="props.dataList">
      <QList>
        <QItem v-for="data in dataList" :key="data.path">
          <QItemSection v-if="data.icon">
            <QAvatar :icon="data.icon"></QAvatar>
          </QItemSection>
          <QItemSection class="">
            <RouterLink
              class="text-h6 textweight-bolder"
              :to="{
                name: data.path,
                params: data.params,
                query: data.query,
              }"
            >
              {{ data.path }}
            </RouterLink>
          </QItemSection>
        </QItem>
        <slot name="nav"></slot>
      </QList>
    </div>
  </div>
  </template>
<script setup lang="ts">
import { NavLink } from "../utils/types";
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  orientation: {
    type: String as () => 'x-nav' | 'y-nav',
    required: true
  },
  dataList: {
    type: Array as () => NavLink[],
    required: true
  }
});

onMounted(() => {
});
onBeforeUnmount(() => {
});
</script>