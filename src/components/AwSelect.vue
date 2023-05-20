<template>
  <QBtn :label="label"></QBtn>
  <div></div>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
  },
});
</script>
