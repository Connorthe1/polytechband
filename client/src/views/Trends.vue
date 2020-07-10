<template>
    <main>
        <div class="oneAlbum" v-for="album in allAlbums" :key="album._id">
            <img :src="album.logo" alt="">
            <span class="name" href="">{{album.name}}</span>
            <span class="data">{{album.data.substring(0,10)}}</span>
        </div>
    </main>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Trends",

    computed: mapGetters(["allAlbums"]),

    mounted() {
        this.$store.dispatch("getAlbums")
    }
}
</script>

<style scoped>
    main{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap
    }
    .oneAlbum img {
        width: 200px;
        height: 240px;
    }
    .oneAlbum{
        display: flex;
        flex-direction: column;
        width: 200px;
        margin: 10px 20px;
        padding-bottom: 10px;
    }
    .oneAlbum:hover{
        -webkit-box-shadow: 5px 5px 5px 0px rgba(50, 50, 50, 1);
        -moz-box-shadow:    5px 5px 5px 0px rgba(50, 50, 50, 1);
        box-shadow:         5px 5px 5px 0px rgba(50, 50, 50, 1);
    }
    .name{
        font-size: 28px;
        font-weight: 500;
        color: white;
    }
    .data{
        color: #938080;
    }
</style>