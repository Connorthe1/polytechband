<template>
    <div>
    <transition name="slide-fade">
        <Login v-if="login" @closeModal="login = false" @toReg="signup = true" />
    </transition>
    <transition name="slide-fade">
        <SignUp v-if="signup" @closeModal="signup = false" @toLog="login = true" />
    </transition>
    <header>
        <div class="header_size">
            <a @click="$router.push('/')" >PolytechBand</a>
            <div class="header_right" v-if="!Auth">
                <a @click="signup = true">sign up</a>
                <a @click="login = true">log in</a>
            </div>
            <div class="header_right" v-if="Auth">
                <a>{{Username.login}}</a>
                <a @click="$store.dispatch('logout')">log out</a>
            </div>
        </div>
    </header>
    </div>
</template>

<script>

import Login from "./modals/Login"
import SignUp from "./modals/SignUp"

import {mapGetters} from "vuex"

export default {

    computed: mapGetters(["Username", "Auth"]),

    components:{
        Login,
        SignUp
    },

    data(){
        return{
            login: false,
            signup: false
        }
    },



}

</script>

<style scoped>

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

</style>