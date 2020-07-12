<template>
    <main>
        <div>
        <div class="albumHeader">
            <img v-bind:src="allAlbums.logo" alt="">
            <ul>
                <li><p style="font-size:42px; font-weight: 600" >{{ allAlbums.name }}</p></li>
                <li><p style="font-size:22px; font-weight: 300; color: #8f5fd2" >{{ allAlbums.host }}</p></li>
                <li><p style="font-size:22px; font-weight: 300" >{{ allAlbums.desc }}</p></li>
                <li><p style="font-size:18px; font-weight: 300; color: #7c56f1">{{ allAlbums.data.substring(0,10)}}</p></li>
            </ul>
        </div>
        <div class="albumBody">

            <audio controls>
                <source v-bind:src="allAlbums.songs" type="audio/mpeg" controls="controls">
            </audio>

        </div>
        </div>
    </main>
</template>

<script>

import {mapGetters} from "vuex"

    export default {
        name: "Album",

        computed: mapGetters(["allAlbums"]),

        mounted() {
            this.$store.dispatch("getAlbumsOne", this.$route.params.id)
        }
    }
</script>

<style scoped>
    .albumHeader img{
        width: 250px;
        height: 250px;
    }
    .albumHeader{
        display: flex;
        flex-direction: row;
    }
    .albumBody{
        margin-top: 100px;
        display: flex;
        flex-direction: column;
    }
    ul{
        list-style-type: none;
        color: white;
        margin: 0;
        padding: 0px 20px;
    }
    ul{
        text-align: left;
        line-height: 10px;
    }
</style>