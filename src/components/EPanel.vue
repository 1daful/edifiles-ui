<template>
  <QCard>
    <QImg v-if="data.overlay" :src="data.overlay" style="max-width: 30em; max-height: 50em">
      <AwList :data="data"></AwList>
    </QImg>
    <template v-else>
      <QCardSection>
        <EDataItem v-for="item in data.items" :dataItem="item"></EDataItem>
        <QCardActions>
          <QBtn
            v-for="action in data.actions"
            :label="action.label"
            @click="$emit(action.event.toString())"
            :icon="action.icon"
          ></QBtn>
        </QCardActions>
      </QCardSection>
    </template>
  </QCard>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataType } from "../utils/types";
import AwList from "../components/EList.vue";
import EAction from "../components/EAction.vue";
import EDataItem from "../components/EDataItem.vue";

export default defineComponent({
  name: "AwPanel",
  components: {
    AwList,
    EAction,
    EDataItem
  },
  props: {
    data: {
      required: true,
      type: Object as () => DataType,
    },
  },
  mounted() {
    /*if (this.data.setHeader) {
      Object.keys(this.data.meta).forEach((key) => {
        const item = {
          label: "",
        };
        item.label = key;
        this.data.header = [];
        this.data.header?.push(item);
        console.log("Header ", this.data.header);
      });
    }*/
  },
});
</script>
