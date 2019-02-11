<template>
    <div id="edit-amount">
    <h3>Edit Amount</h3>
     <div class="row">
        <form @submit.prevent="updateAmount" class="col s12">
            <div class="row">
                <label>Serial Number</label>
                <div class="input-field col s12">
                    
                    <input disabled type="text" v-model="SrNo" required>
                    
                </div>
            </div>
             <div class="row">
                <label>From</label>
                <div class="input-field col s12">
                    <input type="text" v-model="From" required>
              
                </div>
            </div>
             <div class="row">
                <label>To</label>
                <div class="input-field col s12">
                    <input type="text" v-model="To" required>
                
                </div>
            </div>
             <div class="row">
                <label>Amount</label>
                <div class="input-field col s12">
                    <input type="text" v-model="Amount" required>
                
                </div>
             </div> 
             <div class="row">
                <label>Description</label>
                <div class="input-field col s12">
                    <input type="text" v-model="Description" required>
                
                </div>
             </div>
            
            
            <button type="submit" class="btn">Update</button>
            <router-link to="/" class="btn grey">Cancel</router-link>
        </form>
    </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name:'edit-amount',
    data(){
        return{
            SrNo:null,
            From:null,
            To:null,
            Amount:null,
            Description:null,
            dob:null        
        }
    },beforeRouteEnter(to,from,next){
         db.collection('lenden').where('SrNo','==',to.params.SrNo).
         get().then(querySnapshot => {
             querySnapshot.forEach(doc =>{
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
            db.collection('lenden').where('SrNo','==',
            this.$route.params.SrNo).get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc =>{
                     this.SrNo = doc.data().SrNo
                     this.From = doc.data().From
                     this.To = doc.data().To
                     this.Amount = doc.data().Amount
                     this.Description = doc.data().Description
                     this.dob = doc.data().dob
                    })
                }
            )
        },
        updateAmount(){
         var DateOfBirth = prompt("Enter DOB","ddmmyyyy")
         if(DateOfBirth == this.dob){
         db.collection('lenden').where('SrNo','==',
            this.$route.params.SrNo).get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc =>{
                        doc.ref.update({
                            SrNo:this.SrNo,
                            From:this.From,
                            To:this.To,
                            Amount:this.Amount,
                            Description:this.Description,
                            dob:this.dob
                        }).then(() => {
                            this.$router.push({name:'view-amount',
                            params:{SrNo:this.SrNo}})
                        })
                    })
                }
            )   
        }else{}
        }
        
    }
}
</script>
