<template>
  <div class="row jstify-start" v-if="props.vertical">
    <div class="col-3 header-link" v-show="dataList">
      <QList>
        <QItem v-for="data in dataList" :key="data.path">
          <QItemSection v-if="data.meta?.icon">
            <QAvatar :icon="data.meta.icon"></QAvatar>
          </QItemSection>
          <QItemSection class="">
            <RouterLink
              class="text-h6 textweight-bolder"
              :to="{
                name: data.name,
                params: props.routeParams?.params,
                query: props.routeParams?.query,
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
  <div v-else>
    <q-layout class="hero-header" :style="heroStyle" style="min-height: 50px">
      <q-header
        :class="{ 'fixed-nav': heroStyle?.fixedNav }"
        :style="{ backgroundColor: `${headerColor}` }"
      >
        <q-toolbar class="text-h5 text-weight-bolder justify-between">
          <q-item-label v-if="brand" class="logo"> {{ brand }}</q-item-label>
          <template v-for="data in dataList" :key="data.path">
            <QAvatar :icon="data.meta.icon" v-if="data.meta?.icon"></QAvatar>
            <RouterLink
              class="q-ma-sm"
              :to="{
                name: data.name,
                params: props.routeParams?.params,
                query: {
                  name: props.routeParams?.query,
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
            @click="leftDrawerOpen = !leftDrawerOpen"
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
        v-model="leftDrawerOpen"
        side="left"
        :width="200"
        bordered
        class="bg-grey-2 q-pa-sm"
        :breakpoint="500"
      >
        <q-list padding>
          <q-btn
            icon="close"
            @click="leftDrawerOpen = !leftDrawerOpen"
            color="red"
          ></q-btn>
          <router-link v-for="menu in dataList" :key="menu.name" :to="menu.path">
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
    <RouterView :key="useRoute().fullPath"></RouterView>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { getRoute } from "../utils/RoutesUtil";
import { EAuth } from '@edifiles/services';
import { useRoute } from "vue-router";

const auth = new EAuth()
let userInfo = auth.getUser();
const leftDrawerOpen = ref(false);
const emit = defineEmits([]);
const props = defineProps({
  brand: {
    type: String,
  },
  hero: {
    type: Object,
    /*title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },*/
  },
  routeName: {
    type: String,
    required: true,
  },
  horizontal: {
    type: Boolean,
  },
  vertical: {
    type: Boolean,
  },
  routeParams: {
    type: Object as () => {
      params?: any;
      query?: any;
    },
  },
  heroStyle: {
    type: Object,
  },
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

//const routes: RouteRecordRaw[] = useRouter().options.routes;
//const routes = useRoute().matched[1]?.children;
//const route = getRoute(props.routeName, routes);
/*const f = {
  icon: "",
};
const r = Object.assign(f, route);*/

const handleScroll = () => {
  if (window.pageYOffset > 0) {
    headerColor.value = props.heroStyle?.headerColor;
  } else {
    headerColor.value = "rgba(255, 0,0,0)";
  }
};

let dataList = ref(getRoute(props.routeName));
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
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
