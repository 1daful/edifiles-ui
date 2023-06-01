<template>
  <QCard>
    <QCardSection>
      <!--<QSelect :options="data.options" v-model="select" v-if="data.options"></QSelect>-->
      <div v-for="(range, i) in filt.rangeList" :key="i" ref="rangeRef">
        {{ range.title }}
        <QInput ref="from" label="From" v-model="min[i]"></QInput>
        <QInput ref="to" label="To" v-model="max[i]"></QInput>
      </div>
      <div v-for="check in data.checks" :key="check.attribute">
        {{ check.attribute }}
        <QCheckbox
          v-for="(ch, i) in check.values"
          :label="ch.label"
          :checked-icon="ch.iChecked"
          :indeterminate-icon="ch.iUndetermined"
          :unchecked-icon="ch.iUnchecked"
          :val="ch.label"
          v-model="model"
          :key="i"
        ></QCheckbox>
      </div>
    </QCardSection>
    <QCardActions>
      <QBtn
        :label="defaultAction.label"
        :icon="defaultAction.icon"
        @click="filter"
      ></QBtn>
    </QCardActions>
  </QCard>
</template>

<script setup lang="ts">
import { Filters, Action } from "../utils/types";
import { Filter, FilterCheck, FilterRange } from '@edifiles/services';
import { Search } from '@edifiles/services';
import { onMounted, ref } from "vue";

//let select: string[];
const props = defineProps({
  data: {
    type: Object as () => Filters,
    required: true,
  },

  action: {
    type: Object as () => Action,
  },

  query: {
    type: String,
    required: true,
  },
});

//const emit = defineEmits([props.action.event]);
const filt = ref(props.data);

const filter = () => {
  const check = filterCheck();
  const range = filterRange();
  const filters: Filter = {
    check,
    range,
  };
  const search = new Search();
  console.log("filters ", filters);
  const result = search.search(props.data.index, props.query, filters);
  //emit(defaultAction.event, result);
};

let min = ref([]);
let max = ref([]);
let model = ref([]);

let defaultAction = {
  label: "Filter",
  event: filter.toString(),
  icon: "sort",
  //|| "sort_by_alpha" || "category",
};
const filterRange = () => {
  let filters: FilterRange[] = [];
  props.data.rangeList.forEach((range, i) => {
    let filter: FilterRange = {
      attribute: range.title,
      lower: min.value[i],
      upper: max.value[i],
    };
    filters.push(filter);
  });
  return filters;
};
const filterCheck = () => {
  let filters: FilterCheck[] = [];
  props.data.checks.forEach((check) => {
    let filter: FilterCheck = {
      attribute: check.attribute,
      values: model.value,
    };
    filters.push(filter);
  });
  return filters;
};

onMounted(() => {
  console.log("filters ", filter());
  if (props.action) {
    defaultAction = props.action;
  }
  //window.dispatchEvent(defaultAction.event);
});
/*onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});*/
</script>
