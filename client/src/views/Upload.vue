<template>
    <main>
        <h1>Загрузка нового альбома</h1>
        <ul>
            <li>Название альбома</li>
            <li><input type="text" v-model="name" /></li>

            <li>Описание альбома</li>
            <li><input type="text" v-model="desc" /></li>

            <li>Обложка альбома</li>
            <li><input type="file" @change="onFileSelected"/> </li>

            <li>Вложенные треки</li>
            <li><input type="file" @change="onSongSelected"/> </li>
<!--            <UploadWindow />-->

            <li>Теги</li>
            <li><input type="text" /></li>

            <h2>{{res}}</h2>

            <button @click="addAlbum">Добавить альбом</button>
        </ul>
    </main>
</template>

<script>

import {mapGetters} from "vuex"

    export default {
        name: 'Upload',
        components: {
        },

        created() {
            this.$store.dispatch("created")
        },

        data(){
          return{
              name:"",
              desc:"",
              logo: null,
              songs: null,
              res: ""
          }
        },

        methods:{

            onFileSelected(event){
                this.logo = event.target.files[0]
            },
            onSongSelected(event){
                this.songs = event.target.files[0]
            },

            addAlbum(){

                const fd = new FormData();
                fd.append("name", this.name)
                fd.append("desc", this.desc)
                fd.append("songs", this.songs)
                fd.append("logo", this.logo)


                // let album = {
                //     host: this.Username.login,
                //     name: this.name,
                //     desc : this.desc,
                //     logo: fd
                // }

                this.$store.dispatch("addAlbum", fd)
                    .then((isTrue)=>{
                        if(isTrue){
                            this.res = "Альбом загружен"
                        }else {
                            this.res = "Произошла ошибка"
                        }
                    })
            }
        },

        computed:mapGetters(["Username"])
    }
</script>

<style scoped>
    main{
        color:white;
    }
    h1{
        margin: 0px;
        color:white;
        font-weight: 400;
        padding-top: 20px;
        padding-bottom: 40px;
    }
    ul{
        list-style-type: none;
        margin: 0px;
        padding: 0px;
    }
    li{
        line-height: 10px
    }
    input{
        width:338px;
        height: 24px;
        margin: 10px 10px 40px;
        font-size: 20px;
        padding: 6px;
    }
    button{
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
    button:hover{
        background-color: #181818;
        transition: 0.5s;
    }
    .rokka-uploader {
        height: 50vh
    }


    .rokka-uploader .button,
    .rokka-uploader .rokka-fileupload {
        padding: 5px;
        background-color: transparent;
        border: 1px solid;
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }

    .rokka-uploader .drop-active h3 {
        margin: -0.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }

    .rokka-uploader .removeButton {
        background-color: transparent;
        border: 0;
        font-weight: 100;
        color: black;
        cursor: pointer;
    }

</style>
