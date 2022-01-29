<template>
  <div>
    <h2>Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">Username: {{ user.username }}</li>
        <li class="list-group-item">Name: {{ user.name }}</li>
        <li class="list-group-item">Role: {{user.type}}</li>
      </ul>
    </div>

       <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
          :z-index="zIndex"
        >

          <v-btn
            color="primary"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
    <div id='userposts'>

   
    </div><div></div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components:{
  },
  computed: mapGetters(["user"]),
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile();
  },
   data: () => ({
      absolute: true,
      overlay: false,
      overlay2:false
    }),
};
</script>

<style>
</style>