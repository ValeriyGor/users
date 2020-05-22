<template>
    <div class="users-list__item">
        <router-link :to="`/${user.id}`">
            <div class="users-list__img">
                <img :src="user.img ? user.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS09nSSOV3sEiGgOJW0F7L_LVK44If07LuLmh5J50YUdNl0cQlh&usqp=CAU'" alt="">
            </div>
            <p>{{user.name}}</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "UserItem",
        props: {
            user: Object
        },
        created() {

        }
    }

</script>

<style lang="sass">
    .users-list
        &__item
            padding: 15px
            text-align: center
            a
                text-decoration: none
                color: #fefefe
        &__img
            display: block
            width: 100px
            height: 100px
            border-radius: 50%
            background-color: #ccc
            margin: 10px auto
            overflow: hidden
            img
                max-width: 100%


</style>