<template>


    <div @click="closeModal" class="modal" >
        <div class="insideM" @click.stop="">
            <form @submit.prevent="submitHandler">
                <ul>
                    <li style="text-align: right; margin: 10px"><i @click="closeModal" style="cursor: pointer" class="material-icons">close</i></li>
                    <li style="margin-bottom: 60px"><h1>Sign up</h1></li>

                    <li style="line-height: 0px">Email</li>
                    <li><input
                            type="text"
                            v-model="email"
                    /></li>
                    <li><i v-if="!$v.email.required && $v.email.$dirty" class="error">Field email is required</i></li>
                    <li><i v-if="!$v.email.email" class="error">Enter email correctly</i></li>


                    <li style="line-height: 0px; margin-top: 20px">Login</li>
                    <li><input
                            type="text"
                            v-model="clientLogin"
                    /></li>
                    <li><i v-if="!$v.clientLogin.required && $v.clientLogin.$dirty" class="error">Field login is required</i></li>
                    <li><i v-if="!$v.clientLogin.minLength || !$v.clientLogin.maxLength" class="error">Field login must have from 3 to 30 letters</i></li>

                    <li style="line-height: 0px; margin-top: 20px">Password</li>
                    <li><input
                            type="password"
                            v-model="password"
                    /></li>
                    <li><i v-if="!$v.password.required && $v.clientLogin.$dirty" class="error">Field password is required</i></li>
                    <li><i v-if="!$v.password.minLength" class="error">Field password must have at least 6 symbols</i></li>

                    <li style="line-height: 0px; margin-top: 20px">Re-enter password</li>
                    <li><input
                            type="password"
                            v-model="repeatPassword"
                    /></li>
                    <li><i v-if="$v.repeatPassword.sameAsPassword && $v.repeatPassword.$dirty" class="error">Password is not identical</i></li>

                    <li><i class="error"></i></li>
                    <li><button type="submit">Sign up</button></li>
                    <li style="padding-bottom: 20px"><span @click="toLog">log in</span></li>
                </ul>
            </form>
        </div>
    </div>


</template>

<script>
import {required, minLength, maxLength, email, sameAs} from "vuelidate/lib/validators"


export default {

    validations: {
        clientLogin: {required, minLength: minLength(3), maxLength: maxLength(30)},
        email: {required, email},
        password: {required, minLength: minLength(6)},
        repeatPassword: {
            sameAsPassword: sameAs('password')
        }
    },


    data(){
        return{
            clientLogin:"",
            email:"",
            password:"",
            repeatPassword:""
        }
    },

    methods:{
        closeModal(){
            this.$emit('closeModal');
        },

        toLog() {
            setTimeout(() => {
                this.closeModal()
            }, 50)
            this.$emit('toLog');
        },

        submitHandler(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }
            this.signUp()
        },

        signUp() {
            let newUser = {
                login: this.clientLogin,
                password: this.password,
            }
            this.$store.dispatch("signUp", newUser)
                .then((isTrue) => {
                    if (isTrue) {
                        this.toLog()
                    }
                })
        },
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
        width:338px;
        height: 24px;
        margin: 10px;
        font-family: Gilroy;
        font-size: 20px;
        padding: 6px;
    }
    .insideM button{
        width:350px;
        height: 46px;
        margin: 20px;
        font-weight: 500;
        font-family: Gilroy;
        font-size: 20px;
        cursor: pointer;
        background-color: #262626;
        color:white;
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