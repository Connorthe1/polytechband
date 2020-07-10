<template>
    <div class="mainHeader">
        <div>
            <a @click="$router.push('/')">Главная</a>
            <a @click="$router.push('/trends')">Тренды</a>
            <a>Исполнители</a>
            <a>Сотрудничество</a>
        </div>
        <div class="forLogin">
            <a @click="$router.push('/upload')" v-if="Auth"><i class="material-icons">album</i></a>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "MainHeader",

    computed: mapGetters(["Auth"])
}
</script>

<style scoped>

</style>