import axios from "axios";
// import router from '../../router'

export default {
    actions:{
        async addAlbum(ctx, album){
            try {
                const res = await axios.post("http://localhost:5000/api/upload", album, {headers:{ token : localStorage.getItem('token')}})
                console.log(res)
                return true
            }catch (e) {
                this.error = e.response.data.message
                console.log(e)
                return false
            }
        },

        async getAlbums(ctx){
            try{
                const res = await axios.get("http://localhost:5000/api/albums")
                ctx.commit("updateAlbums", res.data.album)
            }catch (e) {
                this.error = e.response.data.message
            }
        },
        async getAlbumsOne(ctx, id){
            try{
                const res = await axios.get("http://localhost:5000/api/albums/one", {headers:{ idAlbum : id}})
                ctx.commit("updateAlbums", res.data.album)
            }catch (e) {
                this.error = e.response.data.message
            }
        }
    },

    mutations:{
        updateAlbums(state, albums){
            state.albums = albums
        },
    },

    state:{
        albums:[]
    },

    getters:{
        allAlbums(state){
            return state.albums
        }
    }
}