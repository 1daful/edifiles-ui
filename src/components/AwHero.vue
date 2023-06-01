<template>
  <div class="hero-header" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
    <q-header
      :class="{ 'fixed-nav': fixedNav }"
      :style="{ backgroundColor: `${headerColor}` }"
    >
      <q-toolbar>
        <q-toolbar-title> My App </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <q-btn label="{{ buttonText }}"></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HeroHeader",
  props: {
    title: {
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
    },
  },
  data() {
    return {
      fixedNav: false,
      headerColor: "rgba(255, 0,0,0)",
      bgImg: "../../public/hero_blue.jpeg",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 10) {
        this.fixedNav = true;
        this.headerColor = "rgba(255, 0,0,1)";
      } else {
        this.fixedNav = false;
        this.headerColor = "rgba(255, 0,0,0)";
      }
    },
  },
};
</script>

<style scoped>
.hero-header {
  position: relative;
  height: 500px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.hero-content {
  max-width: 800px;
  text-align: center;
  margin-top: 50px;
}
</style>

<style>
.hero {
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.hero-menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.hero-content {
  color: white;
  text-align: center;
  margin: auto;
  max-width: 80%;
}

.title {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 2rem;
}
</style>
