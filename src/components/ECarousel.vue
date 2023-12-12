<template>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-carousel
          v-bind="slides"
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide :name="slide.name" class="column no-wrap flex-center"
          :class="slide.style"
          :img-src="slide.img"
          v-for="slide in slides">
              {{ slide.content }}
              <component :is="slide.component" v-if="slide.component"></component>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { Slide } from '../utils/DataTypes';

const props = defineProps({
    slides: {
        type: Array as ()=> Slide[],
        required: true
    }
});
  </script>
  