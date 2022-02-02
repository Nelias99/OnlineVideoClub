<template>
 <div class="column is-three-fifths">
        <table v-if="data.length!=0" class="table">
            <thead>
                <tr>
                    <th v-for="(column,index) in columns" :key="index">{{column}}</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,index_row) in users" :key="index_row" v-bind:class="{ editing: editId === row._id }" >
                    <td v-for="(column,index) in columns" :key="index"> {{row[column]}} </td>    
                    <td>
                        <p class="buttons">
        
                            <b-button variant="danger"  @click="deleteUser(row._id)">Delete </b-button>
                        </p>
                    </td>   
                </tr>
            </tbody>
        </table> 
        <div v-else class="notification is-danger">
           <strong> No Data to Show</strong>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import axios from 'axios';
export default {
    components:{
  },
    computed: {
       ...mapGetters(['users'])
,
            data(){
                return this.users
            },
            columns(){
                return this.users.length>0 ?
                       Object.keys(this.users[0]) : []
            }
        },
 methods:{
     ...mapActions(["getusers"]),

     deleteUser(id){
         axios.delete("http://localhost:5000/admin/deluser/"+id)
         this.getusers();
    

     }
     
    },
    created() {
        this.getusers();
      
}}
</script>

<style>
</style>