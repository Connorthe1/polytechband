import Vuex from "vuex"
import Vue from "vue";
import login from "./modules/login"
import albumUpload from "./modules/albumUpload";


Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        authorized: Boolean,
        userName: ""
    },

    actions: {
        AuthCheck() {
            this.authorized = (localStorage.getItem("token") !== null)
        },
        logOut(){
            localStorage.clear()
        }
    },

    modules:{
        login,
        albumUpload
    }

})