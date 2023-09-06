<template>
  <AwDataView :data="item" v-for="item in items"></AwDataView>
</template>

<script setup lang="ts">
import AwDataView from "../components/EDataView.vue";
import { DataType } from "../utils/types";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

let items: DataType[];

onMounted(() => {
  items = JSON.parse(String(useRoute().query.items));
});
</script>
