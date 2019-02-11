<template>
    <div id="view-amount">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{From}}&#8594;{{To}}</h4></li>
            <li class="collection-item">Amount : {{Amount}}</li>
            <li class="collection-item">Description : {{Description}}</li>
        </ul>
        <router-link to="/" class="btn">Back</router-link>
        <button @click="deleteEntry" class="btn red">Delete</button>

    <div class="fixed-action-btn">
       <router-link @click="edit" v-bind:to="{name:'edit-amount',
       params:{SrNo:SrNo}}" class="btn-floating btn-large red">
            <i class="fa fa-pencil"></i>
       </router-link>
    </div>

    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name:'view-amount',
    data(){
        return{
            SrNo:null,
            From:null,
            To:null,
            Amount:null,
            Description:null,
            dob:null
        }
    },
    beforeRouteEnter(to,from,next){
       db.collection('lenden').where('SrNo','==',to.params.SrNo).get()
       .then(querySnapshot => {
           querySnapshot.forEach(doc => {
               next(vm => {
                   vm.SrNo = doc.data().SrNo
                   vm.From = doc.data().From
                   vm.To = doc.data().To
                   vm.Amount = doc.data().Amount
                   vm.Description = doc.data().Description,
                   vm.dob = doc.data().dob
               })
           })
       })
    },
    watch:{
        '$route':'fetchData'
    },
    methods:{
        fetchData(){
            db.collection('lenden').where('SrNo','==',this.$route.params.SrNo).get()
            .then(querySnapshot => {
                 querySnapshot.forEach(doc =>{
                     this.SrNo = doc.data().SrNo
                     this.From = doc.data().From
                     this.To = doc.data().To
                     this.Amount = doc.data().Amount
                     this.Description = doc.data().Description
                     this.dob = doc.data().dob
                     
                     
                 })
            })
        },
        deleteEntry(){
            var dateOfBirth = prompt("Enter DOB",'ddmmyyyy')
            if( dateOfBirth==this.dob ){ 
                 db.collection('lenden').where('SrNo','==',this.$route.params.SrNo).get()
                 .then(querySnapshot => {
                 querySnapshot.forEach(doc =>{
                   doc.ref.delete()
                   this.$router.push('/') 
                 })
            })
            }else{

            }
        },
        edit(){
            var dateOfBirth = prompt("Enter DOB",'ddmmyyyy')
     
        }
    }
}
</script>
