<template></template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { QDialog } from 'quasar';

import { Repository } from "@edifiles/services";
import { Search } from "@edifiles/services";
import { Action, Layout, View } from "../utils/types";
import { Component, createApp, defineComponent } from 'vue';
import { FilterType } from '@edifiles/services';

const AwDialog: Component = {
  components: {
    QDialog
  },
}

createApp(AwDialog)

const el = document.getElementById('#ap')
/*const createHook = (hook: {event: CustomEvent, listen: Function}) => {
  el?.dispatchEvent(hook.event)
  el?.addEventListener('wheel', filter)
}*/

const router = useRouter()

const search = async (type: string, keyword: string) => {
  let search = new Search();
  return await search.search(type, keyword);
};

const filter = async (collName: string, filters: FilterType[], limit: number) => {
  const repo = new Repository(collName);
  return await repo.readItems(collName, undefined, filters, undefined, limit);
};

const view = () => {};

//const sort = (table: string, )=> { new Repository().readItems() }

const open = (type: string | boolean, route: {}) => {
  if(typeof type === 'string') {
    useRouter().push(route)
  }
  else if(typeof type === 'boolean') {
    type = true
  }
}

const j = defineComponent({

})
const mount = () => {
}

const actions: Action[] = [
  {
    label: "",
    event: "filter",
    name: "",
    type: "filter",
    icon: "filter_list",
  },
  {
    label: "",
    event: "view",
    name: "",
    type: "view",
    icon: "eye",
  },
  {
    label: "",
    event: "sort",
    name: "",
    type: "sort",
    icon: "sort" || "sort_by_alpha" || "category",
  },
  {
    label: "",
    event: "rate",
    name: "",
    type: "rate",
    icon: "star" || "star_rate" || "star_half" || "thumbs_up_down",
  },
  {
    label: "",
    event: "like",
    name: "",
    type: "like",
    icon: "thumb_up",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "addTo",
    icon: "add",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "groupBy",
    icon: "group",
  },
  {
    label: "",
    event: search.toString(),
    name: "",
    type: "search",
    icon: "search",
  },
  {
    label: "create",
    event: "",
    name: "",
    type: "create",
    icon: "",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "update",
    icon: "",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "read",
    icon: "",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "delete",
    icon: "",
  },
  {
    label: "",
    event: "open",
    name: "",
    type: "open",
    icon: "",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "upload",
    icon: "arrow_up",
  },
  {
    label: "",
    event: "",
    name: "",
    type: "download",
    icon: "arrow_down",
  },
];

const action: Action = {
  label: "",
  event: search.toString(),
  name: "",
  type: "search",
  icon: "search",
};
</script>
