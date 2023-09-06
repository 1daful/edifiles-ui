<template>
      <!--div class="text-h6">{{ header.title }}</div>-->
        <div class="row">
            <template v-for="dataContent in dataItem.content">
                <div class="col-sm">
                    <QAvatar :icon="dataContent.icon" v-if="dataContent.icon"></QAvatar>
                    <QAvatar :icon="dataContent.icon" v-if="dataContent.img">
                    <QImg :src="dataContent.img"></QImg>
                    </QAvatar>
                </div>
                <div class="col-sm">
                    <QItemLabel> {{ dataContent.label }} </QItemLabel>
                </div>
                <div class="col-sm">
                    <EAction :action="dataContent.action" v-if="dataContent.action">
                    </EAction>
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