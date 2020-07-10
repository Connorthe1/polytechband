<template>

    <div @click="closeModal" class="modal" >
        <div class="insideM" @click.stop="">
            <form @submit.prevent="submitHandler">
            <ul>
                <li style="text-align: right; margin: 10px"><i @click="closeModal" style="cursor: pointer" class="material-icons">close</i></li>
                <li style="margin-bottom: 60px"><h1>Log in</h1></li>
                <li style="line-height: 0px">Login</li>

                <li><input
                        type="text"
                        id="idLogin"
                        v-model="clientLogin"
                /></li>
                <li><i v-if="!$v.clientLogin.required && $v.clientLogin.$dirty" class="error">Field login is required</i></li>
                <li><i v-if="!$v.clientLogin.minLength || !$v.clientLogin.maxLength" class="error">Field login must have from 3 to 30 letters</i></li>

                <li style="line-height: 0px; margin-top: 20px">Password</li>
                <li><input
                        type="password"
                        id="idPass"
                        v-model="password"
                /></li>
                <li><i v-if="!$v.password.required && $v.password.$dirty" class="error">Field password is required</i></li>
                <li><i v-if="!$v.password.minLength" class="error">Field password must have at least 6 symbols</i></li>

                <li><i class="error">{{ errors }}</i></li>
                <li><button type="submit">Log in</button></li>
                <li style="padding-bottom: 20px"><span @click="toReg">create account</span></li>
            </ul>
            </form>
        </div>

    </div>


</template>

<script>
import {mapGetters} from "vuex"
import {mapMutations} from "vuex"
import {required, minLength, maxLength} from "vuelidate/lib/validators"

export default {

    validations:{
            clientLogin: {required,  minLength:minLength(3), maxLength:maxLength(30)},
            password: {required, minLength:minLength(6)}
    },

    computed:
        mapGetters(["errors"])
    ,

    data(){
        return{
            clientLogin:"",
            password:"",
        }
    },

    methods:{
        closeModal(){
            this.$emit('closeModal')
            this.$store.commit('clearError')
        },
        ...mapMutations(['clearError']),

        toReg() {
            setTimeout(() => {
                this.closeModal()
            }, 50)
            this.$emit('toReg');
        },

        submitHandler(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }
            this.login()

        },

        login(){
            let user = {
                login: this.clientLogin,
                password : this.password
            }
            this.$store.dispatch("login", user)
                .then((isTrue)=>{
                    if(isTrue){
                        this.closeModal()
                    }
                })
        }
    }
}
</script>

<style scoped>
   .modal{
       position: absolute;
       display: flex;
       justify-content: center;
       justify-items: center;
       align-items: center;
       width: 100%;
       height: 100%;
       background-color: rgba(0, 0, 0, 0.4);
       z-index: 5;
       font-family: Gilroy;
    }
   .insideM{
       width: 520px;
       height: auto;
       background-color: #bfbfbf;
       z-index: 10;
       border-radius: 10px;
       border: 2px solid #262626;
       text-align: center;
    }
   .insideM ul{
       list-style-type: none;
       margin: 0px;
       padding: 0px;
   }
    .insideM input{
        width: 338px;
        height: 24px;
        margin: 10px;
        font-family: Gilroy;
        font-size: 20px;
        padding: 6px;
    }
    .insideM button{
        width: 350px;
        height: 46px;
        margin: 20px;
        font-weight: 500;
        font-family: Gilroy;
        font-size: 20px;
        cursor: pointer;
        background-color: #262626;
        color: white;
        border-style: none;
        transition: 0.5s;
    }
    .insideM button:hover{
        background-color: #181818;
        transition: 0.5s;
    }
    .insideM ul:last-child span{
        color: #2a1f47;
        text-decoration: underline;
        cursor: pointer;
    }
    .error{
        color: #c71313;
        font-size: 20px;
    }
</style>