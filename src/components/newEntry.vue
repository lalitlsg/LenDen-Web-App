<template>
    <div id="new-entry">
        <h3>New Entry</h3>
        <div class="row">
            <form @submit.prevent="saveEntry" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text"  v-model="SrNo" required>
                        <label>Phone Number</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="From" required>
                        <label>From</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="To" required>
                        <label>To</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="Amount" required>
                        <label>Amount</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="Description" required>
                        <label>Description </label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dob" required>
                        <label>Date of Birth </label>
                    </div>
                </div>
                <button type="submit" class="btn orange">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name:'new-entry',
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
    methods:{
        saveEntry(){
            db.collection('lenden').add(
                {
                    SrNo:this.SrNo,
                    From:this.From,
                    To:this.To,
                    Amount:this.Amount,
                    Description:this.Description,
                    dob:this.dob 
                }
            ).then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>
