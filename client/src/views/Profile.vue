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

     
  
  
   
    <div></div>
    <br>
    <form @submit.prevent="logoutUser">
  <input type="submit" class="btn btn-primary" value="Logout">
  &nbsp;&nbsp;&nbsp;&nbsp;
</form>

<div>
  <!-- Using modifiers -->
  <b-button v-b-toggle.collapse-2 class="m-1">Update Profile</b-button>


  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
     <div class="card card-body">
    <form class="form-horizontal" role="form" @submit.prevent="updateProfile">
          <div class="form-group">
            <label class="col-lg-3 control-label">Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model=user.name>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model=user.email>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Username:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model=user.username>
            </div>
          </div>
          <div class="form-group"></div>
           <input type="submit" class="btn btn-primary" value="Apply">
          </form>
  </div>

  </b-collapse>
 <Users v-if="user.type=='admin'" ></Users>
</div>



  


  </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Users from "../components/Users.vue"
export default {
  data() {
    return {
      username: this.username,
      name: this.name,
      email: this.email
    };
  },

  components:{
    Users
  },
  computed: mapGetters(["user","users"]),
  methods: {
    ...mapActions(["getProfile","logout","updateprofile","getusers"]),
    
    logoutUser(){
      this.logout();
    },
    updateProfile(){
       console.log(this.username)
       const user = {_id:this.user._id,username:this.user.username,name:this.user.name,email:this.user.email}
      this.updateprofile(user);
      this.getUsers();
     
},



   
  },
  created() {
    this.getProfile();
    this.getusers();
  }
  
 



   
};

</script>




<style>
</style>