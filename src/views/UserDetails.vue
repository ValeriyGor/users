<template>
    <div class="user-details">
        <div class="container">
            <router-link to="/" class="back-to-home">Вернуться к списку</router-link>
            <div class="user-details__flex">
                <div class="user-details__photo" v-if="user">
                    <img :src="user.img ? user.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS09nSSOV3sEiGgOJW0F7L_LVK44If07LuLmh5J50YUdNl0cQlh&usqp=CAU'" alt="">
                </div>
                <div class="user-details__info" v-if="user">
                    <p><span>Имя:</span> {{user.name}}</p>
                    <p><span>Email:</span> {{user.email}}</p>
                    <p><span>Телефон:</span> {{user.phone}}</p>
                    <p><span>Компания:</span> {{user.company.name}}</p>
                    <p><span>Сайт:</span> {{user.website}}</p>
                    <p><span>Город:</span> {{user.address.city}}</p>
                    <p><span>Индекс:</span> {{user.address.zipcode}}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "UserDetails",
        computed: {
            user() {
                return this.$store.getters.user(this.$route.params.userId);
            }
        }
    }
</script>

<style lang="sass">
    .back-to-home
        color: #fefefe
        text-decoration: none

    .user-details
        padding-top: 30px
        &__flex
            display: flex
            padding-top: 30px
        &__photo
            flex: 0 0 20%
            img
                border-radius: 50%
                overflow: hidden
                width: 200px
                max-width: 100%
        &__info
            flex: 0 0 80%
            padding-left: 15px
            p
                font-size: 16px
                padding: 5px
            span
                font-weight: bold
                min-width: 150px


</style>