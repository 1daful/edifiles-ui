<template>
  <QBtn>{{ hello }}</QBtn>
</template>
<script setup lang="ts">
defineProps({
  hello: {
    required: true,
    type: String,
  },
});
</script>
