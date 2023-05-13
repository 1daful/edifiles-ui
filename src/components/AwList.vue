<template>
  <q-list>
    <div class="row">
      <div class="col-sm">
        <div v-if="!data.overlay && (data.img || data.icon)">
          <q-avatar :icon="data.icon" v-if="data.icon"></q-avatar>
          <q-avatar v-else-if="data.img">
            <q-img :src="data.img" />
          </q-avatar>
        </div>
        <q-item-section v-for="(v, k) in data.meta" :key="k">
          {{ v }}
        </q-item-section>
        <q-item-section class="text-3">
          <!--<q-item-label caption>-->
          {{ data.meta.title }}
          <!--</q-item-label>-->
        </q-item-section>
      </div>
    </div>
    <div class="q-gutter-xs">
      <q-btn
        :label="action.label"
        @click="$emit(action.event)"
        :icon="action.icon"
        :key="action.label"
        v-for="action in data.actions"
      ></q-btn>
    </div>
  </q-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataType } from "../utils/types";
export default defineComponent({
  name: "awlist",
  props: {
    data: {
      required: true,
      type: Object as () => DataType,
    },
  },
});
</script>
