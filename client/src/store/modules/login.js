import axios from "axios";
import router from '../../router'

export default {
    actions: {


        mounted(ctx){
            axios.get("http://backproject.std-263.ist.mospolytech.ru/api/auth/user", {headers:{ token : localStorage.getItem('token')}})
                .then(res =>{
                    ctx.commit("updateName", res.data.user)
                    ctx.dispatch("created")
                })
        },

        created(ctx){
            if (localStorage.getItem('token') === null){
                router.push("/").catch(() => {})
                ctx.commit("updateAuth", false)
            }else{
                ctx.commit("updateAuth", true)
            }
        },

        logout(ctx){
            localStorage.clear()
            ctx.commit("updateAuth", false)
            ctx.dispatch("created")
        },

        async login(ctx, user) {
            try {
                const res = await axios.post("http://backproject.std-263.ist.mospolytech.ru/api/auth/login", user)
                localStorage.setItem("token", res.data.token)
                ctx.commit("clearError")
                ctx.dispatch("mounted")
                return true
            } catch (e) {
                ctx.commit("updateError", e.response.data.message)
                return false
            }
        },

        async signUp(ctx, newUser){
            try{
                await axios.post("http://backproject.std-263.ist.mospolytech.ru/api/auth/register", newUser)
                ctx.commit("clearError")
                return true
            }catch (e) {
                this.error = e.response.data.message
                return false
            }

        }
    },

    mutations:{
        updateError(state, error){
            state.error = error
        },
        clearError(state){
            state.error = ""
        },
        updateAuth(state, authorized){
            state.authorized = authorized
        },
        updateName(state, name){
            state.user = name
        }
    },

    state:{
        authorized: false,
        error:"",
        user:{},
    },

    getters:{
        errors(state){
            return state.error
        },
        Username(state){
            return state.user
        },
        Auth(state){
            return state.authorized
        }
    }

}