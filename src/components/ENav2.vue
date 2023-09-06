<template>
  <div class="row jstify-start" v-if="props.navType === 'top' || props.navType === 'bottom'">
    <div class="col-3 header-link">
      <QList>
        <QItem v-for="data in menuList" :key="data.name">
          <QItemSection v-if="data?.icon">
            <QAvatar :icon="data.icon"></QAvatar>
          </QItemSection>
          <QItemSection>
            <RouterLink
              class="text-h6 textweight-bolder"
              :to="{
                path: data.path,
                params: data.params,
                query: data.query,
              }"
            >
              {{ data.name }}
            </RouterLink>
          </QItemSection>
        </QItem>
        <slot name="nav"></slot>
      </QList>
    </div>
  </div>

  <div v-else-if="props.navType === 'left' || props.navType === 'right'">
    <q-layout class="hero-header" style="min-height: 50px">
      <q-header
      >
        <q-toolbar class="text-h5 text-weight-bolder justify-between">
          <template v-for="data in menuList" :key="data.path">
            <QAvatar :icon="data.icon" v-if="data.icon"></QAvatar>
            <RouterLink
              class="q-ma-sm"
              :to="{
                name: data.name,
                params: data.params,
                query: {
                  name: data.query,
                },
              }"
            >
              {{ data.name }}
            </RouterLink>
          </template>
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
      <q-drawer
        style="z-index: 999"
        v-model="drawerOpen"
        :side="props.navType"
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
          <router-link v-for="menu in menuList" :key="menu.name" :to="menu.path">
            <q-item clickable tag="a">
              <q-item-section avatar>
                <q-icon name="link" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ menu.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </router-link>
          <div v-if="!userInfo">
            <q-btn class="q-ma-sm" color="primary" size="12px" to="/signin"
              >Sign in</q-btn
            >
            <q-btn color="primary" size="12px" to="/signup">Sign up</q-btn>
          </div>
        </q-list>
      </q-drawer>
    </q-layout>
  </div>
  </template>
<script setup lang="ts">
import { TabType, NavLink } from "../utils/types";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { EAuth } from '@edifiles/services';
import { useRoute } from "vue-router";

const auth = new EAuth()
const drawerOpen = ref(false);
let userInfo = auth.getUser();
const props = defineProps({
  navType: {
    type: String as () => TabType,
    required: true
  },
  menuList: {
    type: Array as () => NavLink[],
    required: true
  }
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