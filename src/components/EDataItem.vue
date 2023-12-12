<template>
      <!--div class="text-h6">{{ header.title }}</div>-->
        <div class="row">
            <template v-for="dataContent in dataItem.content">
                <div class="col-lg">
                    <QAvatar :icon="dataContent.icon" v-if="dataContent.icon"></QAvatar>
                    <QAvatar v-if="dataContent.avatar">
                        <QImg :src="dataContent.avatar"></QImg>
                    </QAvatar>
                    <QImg :src="dataContent.thumbnail" v-if="dataContent.thumbnail"></QImg>
                </div>
                <div class="col-lg">
                    <QItemLabel v-if="dataContent.label"> {{ dataContent.label }} </QItemLabel>
                </div>
                <div class="col-lg">
                    <EAction :action="dataContent.action" v-if="dataContent.action"></EAction>
                </div>
            </template>
        </div>
      <!--div>
        {{ header.description }}
      </div>-->
</template>

<script setup lang="ts">
import { DataItem } from '../utils/types';
import EAction from "./EAction.vue";

defineProps({
    dataItem: {
        type: Object as () => DataItem,
        required: true
    }
})
</script>