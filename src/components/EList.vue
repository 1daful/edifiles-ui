<template>
  <q-list>
    <div class="row">
      <div class="col">
        <EDataItem v-for="item in data.items" :dataItem="item"></EDataItem>
        <!--q-item-section v-for="(v, k) in data.meta" :key="k">
          {{ v }}
        </q-item-section>
        <q-item-section class="text-3">
          <q-item-label caption>
          {{ data.title }}
          </q-item-label>
        </q-item-section>-->
      </div>
    </div>
    <div class="q-gutter-xs">
      <QBtn
        v-for="action in data.actions"
        :label="action.label"
        @click="$emit(action.event.toString())"
        :icon="action.icon"></QBtn>
    </div>
  </q-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataType } from "../utils/types";
import EDataItem from "./EDataItem.vue"

export default defineComponent({
  name: "awlist",
  components: {
    EDataItem
  },
  props: {
    data: {
      required: true,
      type: Object as () => DataType,
    },
  },
});
</script>
