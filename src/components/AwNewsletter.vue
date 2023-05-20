<template>
  <q-input v-model="email"></q-input>
  <q-btn @click="onSubmit">Submit</q-btn>
</template>

<script setup lang="ts">
import { Axiosi } from "edifiles/src/api/Axiosi";
import { Repository } from "edifiles/src/model/Repository";
import { ListMonk } from "edifiles/src/api/Email/Listmonk";
import { ref } from "vue";

const email = ref("");
const repo = new Repository("subscribers");
const emailProvider = new ListMonk();
const resource = emailProvider.subscriber(
  {},
  {
    email: email.value,
    status: "enabled",
    list: [0],
  }
);
const client = new Axiosi();

const onSubmit = async () => {
  const data = await client.post(resource);
  repo.addItem(resource.response.name, {
    email: email,
    id: data[0].id,
  });
};
</script>
