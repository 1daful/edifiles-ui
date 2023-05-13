<template>
  <QCard>
    <QImg v-if="data.img" :src="data.img" style="max-width: 30em; max-height: 50em">
      <AwList :data="data" v-if="data.overlay"></AwList>
    </QImg>
    <QCardSection v-if="!data.overlay">
      <div class="text-h6">{{ data.meta.title }}</div>
      <QItem>
        <template v-for="item in data.header">
          <QItemSection>
            <QAvatar :icon="item.icon" v-if="item.icon"></QAvatar>
            <QAvatar :icon="item.icon" v-if="item.icon">
              <QImg :src="item.img"></QImg>
            </QAvatar>
          </QItemSection>
          <QItemSection>
            <QItemLabel> {{ item.label }} </QItemLabel>
          </QItemSection>
        </template>
      </QItem>
      <div>
        {{ data.meta.description }}
      </div>
    </QCardSection>
    <QCardActions>
      <QBtn
        v-for="action in data.actions"
        :label="action.label"
        @click="$emit(action.event)"
        :icon="action.icon"
      ></QBtn>
    </QCardActions>
  </QCard>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataType } from "../utils/types";
import AwList from "../components/AwList.vue";

export default defineComponent({
  name: "AwPanel",
  components: {
    AwList,
  },
  props: {
    data: {
      required: true,
      type: Object as () => DataType,
    },
  },
  mounted() {
    if (this.data.setHeader) {
      Object.keys(this.data.meta).forEach((key) => {
        const item = {
          label: "",
        };
        item.label = key;
        this.data.header = [];
        this.data.header?.push(item);
        console.log("Header ", this.data.header);
      });
    }
    console.log("header:, ", this.data.header);
  },
});
</script>
