<template>
  <div class="row jstify-start" v-if="view.navType === 'left' || view.navType === 'right'">
    <div class="col-3 header-link" v-show="view">
      <QList :bordered="style?.border" :dense="style?.dense" :dark="style?.dark">
        <EView :view="view"></EView>
        <slot name="nav"></slot>
      </QList>
    </div>
  </div>

  <q-layout class="hero-header row" :style="heroStyle" style="min-height: 50px" v-else view="'lHh Lpr lFf'">
    <q-header
      :class="{ 'fixed-nav': heroStyle?.fixedNav }"
      :style="{ backgroundColor: `${headerColor}` }"
    >
      <q-toolbar class="text-h5 text-weight-bolder justify-end">
        <q-item-label v-if="brand" class="logo"> {{ brand }}</q-item-label>
        <EView :view="view"></EView>
        <slot name="nav"></slot>
        <q-btn
          size="20px"
          color="primary"
          flat
          dense
          round
          @click="drawerOpen = !drawerOpen"
          aria-label="Menu"
          icon="menu"
          class="lt-md"
        ></q-btn>
      </q-toolbar>
    </q-header>
    <div class="overlay" :style="{ backgroundColor: heroStyle?.backgroundColor }"></div>
    <div class="hero-content text-white" v-if="hero">
      <h4>{{ hero.title }}</h4>
      <p>{{ hero.subtitle }}</p>
      <q-btn label="{{ hero.buttonText }}" v-if="hero.buttonText"></q-btn>
    </div>
    <q-drawer
      
      style="z-index: 999"
      v-model="drawerOpen"
      side="left"
      :width="200"
      bordered
      class="bg-grey-2 q-pa-sm"
      :breakpoint="500"
    >
      <q-list padding>
        <q-btn
          icon="close"
          @click="drawerOpen = !drawerOpen"
          color="red"
        ></q-btn>
        <EView :view="view"></EView>
        <div v-if="!userInfo">
          <q-btn class="q-ma-sm" color="primary" size="12px" to="/signin"
            >Sign in</q-btn
          >
          <q-btn color="primary" size="12px" to="/signup">Sign up</q-btn>
        </div>
      </q-list>
    </q-drawer>
  </q-layout>
</template>
<script setup lang="ts">
import { TabType, View } from "../utils/types";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { EAuth } from '@edifiles/services';
import EView from "./EView.vue";
import { config } from "../../public/config";

const auth = new EAuth(config.api.Supabase)
const drawerOpen = ref(false);
let userInfo = auth.getUser();
const props = defineProps({
  view: {
    type: Object as () => View,
    required: true
  },
  style: {
    type: Object
  },
  heroStyle: {
    type: Object,
  },
  brand: {
    type: String,
  },
  hero: {
    type: Object,
  }
});

let headerColorRef = ref("rgba(255, 0,0,0)");
let headerColor = computed({
  get: () => {
    return headerColorRef.value;
  },
  set: (val: string) => {
    headerColorRef.value = val;
  },
});

</script>
<style scoped>
a {
  text-decoration-line: none;
}

.header-link a {
  color: black;
  /*font-weight: bold;*/
}

.header div {
  display: inline;
}
.router-link-active button {
  background: #00080fc9;
  /*background: #4b98db94; #ddd, gainsboro, #f7f7f7, dodgerblue, #f97300, aqua, cornflowerblue*
    background:#e96711e5;
    color: rgb(189, 187, 187)*/
  color: white;
}
/*.outline:hover {
    border-style: solid;
    border-width: 1px;
    border-color: blue;
  }*/

.btn-color {
  background: rgb(55, 25, 112);
}
.margin {
  margin-top: 4%;
  margin-left: 45%;
}
.hero-header {
  z-index: 998;
}

.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.hero-content {
  text-align: center;
  margin-top: 50px;
  z-index: 998;
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
}
.logo {
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  color: rgba(27, 195, 201, 0.219);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>