<template>
  <div>
    <div class="q-pa-md media item-start q-gutter-md">
      <q-list>
        <q-item>
          <q-item-section v-for="result in results" :key="result.index"
            ><router-link
              :to="{
                name: 'SERPView',
                params: { type: result.index },
                query: { items: JSON.stringify(result.items) },
              }"
            >
              {{ result.index }}</router-link
            ></q-item-section
          >
        </q-item>
      </q-list>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Search } from "@edifiles/services";
//import { mount } from 'mount-vue-component';
//import AwIconToolbar from "../components/AwIconToolbar.vue";
import { DataType } from "../utils/types";

//const gh = document.getElementById('k')
//const com = mount(AwIconToolbar, {element: gh})
const emit = defineEmits(["search"]);
const props = defineProps({
  query: {
    type: String,
    required: true,
  },
  indexes: {
    type: Array<string>,
    required: true,
  },
});

let results: {
  index: string,
  items: DataType[]
}[] = [{
  index: '',
  items: []
}]

onMounted(async () => {
  const search = new Search();
  results.forEach(async (result, i) => {
    const p = await search.search(result.index, props.query);
    result.index = props.indexes[i]
    result.items = p.hits;
  });
  emit("search", results);
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
.myCard {
  width: 100%;
  max-width: 250px;
  min-width: 200px;
}
a {
  color: black;
  text-decoration: none;
}
.uppercase {
  text-transform: uppercase;
}
.float {
  top: 0;
  left: 230px;
  right: 2px;
  transform: translateY(-50%);
}
.innerfloat {
  top: 0;
  left: 200px;
  right: 5px;
  transform: translateY(-50%);
}
</style>
