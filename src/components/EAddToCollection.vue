<template>
  <q-card style="min-width: 200px; min-height: 90px">
    <q-card-section v-if="!user">
      <p>Please log in first</p>
      <q-btn to="/signIn" label="Sign In"></q-btn>
    </q-card-section>
    <q-card-actions v-if="user">
      <div>
        <q-btn
          color="red"
          :icon="icon"
          class="text-white q-ma-sm"
          ref="favourites"
          @click="addToCollection(item, 'favourites')"
        />
        <q-btn
          color="red"
          icon="watch_later"
          class="text-white q-ma-sm"
          ref="collectionsDialog"
        >
          <q-popup-proxy @show="getCollections(item)">
            <q-card>
              <q-card-section>
                <div>
                  <h5>Add to collection</h5>
                  <q-btn
                    v-for="collection in collections"
                    :label="collection.collectionName"
                    @click="addToCollection(item, collection.collectionName)"
                  ></q-btn>
                </div>
                <h5>Or create a new collection</h5>
                <q-input v-model="collectionName" label="Name of collection"> </q-input>
                <q-btn
                  label="Add to collection"
                  @click="addToCollection(item, collectionName)"
                ></q-btn>
              </q-card-section>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { EAuth } from "@edifiles/services";
import { Repository } from "@edifiles/services";
import { DataType } from "../utils/types";
//import { Collection } from "edifiles/src/utility/Types";
import { computed, ref } from "vue";

const auth = new EAuth()
const props = defineProps({
  item: {
    type: Object as () => DataType,
  },
});

let icon = computed(() => {
  let ic = props.item?.icon;
  if (!ic) ic = "mdi-heart";
  return ic;
});
//let showDialog = false;
//let dialogShown = false;
let collections: Record<string, any>[];
let collectionName = "";
const user = auth.getUser();
const repository = new Repository();

async function addToCollection(item: any, name: string) {
  if (user) {
    let collectedItem = {
      id: user.id + item.id,
      userId: user.id,
      //collected: false
      type: item.type,
      mediaId: item.id,
      collectionName: name,
    };
    //Object.assign(collectedItem, item)
    const coll = item.type + "Collection";
    const repository = new Repository(coll);
    const data = await repository.addItem(coll, collectedItem);
    //if (data) item.icon = 'library_add_checked'
    //let re = this.$refs.mediaItems
    //this.$refs.mediaItems[0] = "schedule";
    //re.icon = 'library_add'
    //this.$refs[item.id].icon = 'schedule'
    //console.log("refs ", re)
  }
}
async function getCollections(item: any) {
  //dialogShown = true;
  if (user) {
    //Object.assign(collectedItem, item)
    const coll = item.type + "Collection";
    collections = await repository.readItems(
      coll,
      [`collectionName`],
      [
        {
          prop: "userId",
          operator: "eq",
          value: user?.id,
        },
      ]
    );
    //if (data) item.icon = 'library_add_checked'
    //let re = this.$refs.mediaItems
    //this.$refs.mediaItems[0] = "schedule";
    //this.$refs.mediaItems[0] = 'schedule'
    //re.icon = 'library_add'
    //this.$refs[item.id].icon = 'schedule'
    //console.log("refs ", re)
  } else {
    //this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
  }
}
</script>
