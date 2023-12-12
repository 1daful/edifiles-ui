<template>
  <template v-if="navType ==='left' || navType ==='right'">
      <QItem v-for="data in menuList.content" :key="data.path"
      :dark="style?.dark" :dense="style?.dense" class="header-link">
        <QItemSection v-if="data.icon">
          <QAvatar :icon="data.icon"></QAvatar>
        </QItemSection>
        <QItemSection class="">
          <RouterLink
            class="text-h6 textweight-bolder"
            :to="{
              path: data.path,
            }"
          >
          <QBtn flat>
            {{ data.name }}
          </QBtn>
          </RouterLink>
        </QItemSection>
      </QItem>
  </template>

  <template v-else>
    <template v-for="data in menuList.content" :key="data.path">
      <!--QAvatar :icon="data.icon" v-if="data.icon"></QAvatar-->
      <RouterLink
        class="q-ma-sm header-link gt-sm"
        :to="{
          path: data.path,
        }">
          <QBtn flat :icon="data.icon">
            {{ data.name }}
          </QBtn>
      </RouterLink>
    </template>
  </template>
</template>
<script setup lang="ts">
import { TabType, NavList } from "../utils/types";
import { ref } from "vue";
import { EAuth } from '@edifiles/services';
import { config } from "../../public/config";

const auth = new EAuth(config.api.Supabase)
const drawerOpen = ref(false);
let userInfo = auth.getUser();
const props = defineProps({
  navType: {
    type: String as () => TabType,
    required: true
  },
  menuList: {
    type: Object as () => NavList,
    required: true
  },
  style: {
    type: Object
  }
});

</script>
<style scoped>
a {
  text-decoration-line: none;
}

.header-link{
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