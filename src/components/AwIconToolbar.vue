<template>
    <div class="bg-primary text-white row justify-end">
        <q-btn v-for="data in actions" :key="data.label" flat rounded dense :icon="data.icon" class="q-mr-sm" :label="data.label" @click="$emit(data.event)" />
    </div>
  </template>
<script lang="ts">
import { defineComponent } from 'vue';
import { action } from "../utils/types";

export default defineComponent({
    name: "AwIconToolbar",
    props: {
        actions: {
            required: true,
            type:  Array as () => action[]
        }
    }
})
</script>