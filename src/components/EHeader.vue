<template>
  <div class="row jstify-start"
  v-if="view.navType === 'left' || view.navType === 'right'">
    <div class="col-3 header-link" v-show="view">
      <QList :bordered="listStyle?.bordered"
      :dense="listStyle?.dense"
      :dark="listStyle?.dark">
        <EView :view="view"></EView>
      </QList>
    </div>
  </div>

  <q-layout class="hero-header col" :style="heroStyle" 
  style="min-height: 50px"
  view="'lHh Lpr lFf'" v-else>
    <q-header
      :class="headerStyle?.class"
      :style="{ backgroundColor: `${headerColor}` }"
      :reveal="headerStyle?.reveal"
      :bordered="headerStyle?.bordered"
      :elevated="headerStyle?.elevated"
    >
      <q-toolbar class="text-h5 text-weight-bolder justify-between">
        <a :href="brand.baseUrl" v-if="brand">
        <img class="ml-2" height="30" alt="Company logo" src="/logo.png" />
        <q-item class="self-center" color="primary">
          {{ brand.title }}
        </q-item>
      </a>
        <q-item-label v-if="brand" class="logo"> {{ brand.name }}</q-item-label>
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
        <EAction :action="menuAction"></EAction>
        <EView :view="view"></EView>>
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
import { TabType, View, Action } from "../utils/types";
import { computed, ref } from "vue";
import { EAuth } from '@edifiles/services';
import EView from "./EView.vue";
import EAction from "./EAction.vue";
import { HeaderStyle, ListStyle } from "../utils/DataTypes";

const auth = new EAuth()
let drawerOpen = false;
let userInfo = auth.getUser();
const props = defineProps({
  view: {
    type: Object as () => View,
    required: true
  },
  headerStyle: {
    type: Object as () => HeaderStyle,
    default: {
      reveal: true,
      bordered: false,
      elevated: true,
      class: "fixed-nav"
    }
  },  
  heroStyle: {
    type: Object,
  },
  listStyle: {
    type: Object as ()=> ListStyle
  },
  brand: {
    type: Object,
  },
  hero: {
    type: Object,
  },
  menuAction: {
    type: Object as () => Action,
    default: {
      name: "menuBtn",
      icon: 'close',
      event: ()=> {drawerOpen = !drawerOpen},
      style: {
        size: "20px",
        color: "red",
        type: "flat",
        shape: "round",
        dense: true,
        class: "lt-md"
      }
    }
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