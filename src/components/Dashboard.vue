<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Dashboard</h4></li>
            <li v-for="friend in lenden" v-bind:key="friend.id" 
            class="collection-item">
            <div class="chip">&#9673;</div>{{friend.From}}
            &#8594;
            {{friend.To}}

            <router-link class="secondary-content" v-bind:to="{name:
            'view-amount', params: {SrNo: friend.SrNo}}">
            <i class="fa fa-eye"></i>
            </router-link>
            </li>
        </ul>
        
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name:'dashboard',
    data(){
        return{
            lenden:[]
        }
    },
    created(){
       db.collection('lenden').orderBy('SrNo').get().then
       (querySnapshot => {
           querySnapshot.forEach(doc => {
               const data = {
                   'id':doc.id,
                   'SrNo':doc.data().SrNo,
                   'From':doc.data().From,
                   'To':doc.data().To,
                   'Amount':doc.data().Amount,
                   'Description':doc.data().Description    
               }
               this.lenden.push(data)
           })
       })
    }
}
</script>
