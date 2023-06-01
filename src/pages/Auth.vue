<template>
<div>Redirecting</div>
</template>

<script lang="ts">
import { EAuth } from "@edifiles/services";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

const auth = new EAuth()
export default defineComponent({
    name: 'Auth',
    data() {
        return {
            auth,
            $q: useQuasar(),
            url: this.$q.localStorage.getItem("url") || "/"
        }
    },
    props: {
        /*a_token: {
            type: String,
            required: true
        },*/
        myUrl: {
            type: String,
            required: true
        }
    },
    mounted() {
        console.log
        if( this.myUrl){
            console.log(this.myUrl)
        	//const sess = this.auth.startSession()
          //this.$router.push(this.url?.toString())
        //console.log("sess: ", sess)
        /*if(sess)
          this.$router.push(this.url.toString())*/
        }
    }
})
</script>
