<template>
  <div class="container">
    <div class="users-list__header">
      <h1>Users LIST </h1>
      <input
          type="text"
          v-model="name"
          @input="setNameSearch"
          placeholder="Search By Name"
      >
    </div>
    <div class="users-list">
      <UserItem v-for="user in usersList" :key="user.id" :user="user"/>
      <p
          v-if="usersList.length === 0 && !loading"
          class="text-center nothing-find"
      >
        По Вашему запросу ничего не найдено
      </p>
      <p
          v-if="loading"
          class="text-center loading"
      >
        Загрузка...
      </p>
    </div>
    <div class="bottom-controls">
      <div class="pagination">
        <button
            :disabled="settingsSearch.page <= 1"
            type="button"
            class="pagination__item"
            @click="setPage(--page)"
        >
          Prev
        </button>
        <button
            type="button"
            class="pagination__item"
            :class="{'active': page === settingsSearch.page}"
            v-for="page in settingsSearch.totalPages"
            :key="page"
            @click="setPage(page)"
        >
            {{page}}
        </button>
        <button
            :disabled="settingsSearch.page === settingsSearch.totalPages"
            type="button"
            class="pagination__item"
            @click="setPage(++page)"
        >
          Next
        </button>
      </div>
      <div class="showUserCount">
        Записей на странице:
        <select id="" v-model="settingsSearch.count" @change="setCountShow">
          <option :value="count" v-for="(count, index) in showUserCount" :key="index">{{count}}</option>
        </select>
        из {{settingsSearch.usersLength}}
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from '@/components/UserItem'
import {getAllUsers} from '@/services/users'

export default {
  name: 'Home',
  components: {
    UserItem
  },
  data() {
    return {
      showUserCount: [5, 10, 20, 50],
      name: '',
      page: 1,
      loading: false
    }
  },
  created() {
    if(this.usersList.length === 0){
      this.loading = true;
      getAllUsers().then(response => {
        this.$store.dispatch("setAllUsers", response.data);
        this.loading = false;
      }).catch(error => {
        this.loading = false;
        alert(error.message)
      })
    }
  },
  computed: {
    usersList() {
      return this.$store.getters.filteredUsers;
    },
    settingsSearch() {
      return this.$store.getters.settingsSearch;
    }
  },
  methods: {
    setNameSearch() {
      this.$store.dispatch("setNameSearch", this.name);
      this.$store.dispatch('setPagination', this.usersList.length)
    },
    setCountShow() {
      this.$store.dispatch("setCountShow");
    },
    setPage(page) {
      this.page = page;
      this.$store.dispatch("setPage", page)
    }
  }
}
</script>

<style lang="sass">
  .users-list
    display: flex
    flex-wrap: wrap
    &__header
      display: flex
      align-items: center
      justify-content: space-between
      padding: 25px 0 15px
      input
        padding: 8px 15px
        font-size: 16px
        border-radius: 3px
        border: 1px solid #999
    &__item
      flex: 0 0 20%
      max-width: 20%

  .bottom-controls
    padding-top: 25px
    display: flex
    justify-content: space-between

  .pagination
    padding-bottom: 50px
    &__item
      margin-right: 7px
      outline: none
      border: 0
      min-width: 30px
      font-size: 14px
      padding: 5px
      text-align: center
      cursor: pointer
      transition: all 0.3s
      background-color: #fefefe
      color: #111
      &:disabled
        background-color: #bbb
      &:hover
        opacity: 0.9
      &.active
        background-color: #08c
        color: #ffffff
  .nothing-find, .loading
    padding: 50px 15px
    flex: 0 0 100%

  @media screen and (max-width: 767px)
    .users-list
      &__item
        flex: 0 0 50%
        max-width: 50%
      &__header
        flex-direction: column
        h1
          margin-bottom: 15px
        input
          text-align: center
    .bottom-controls
      flex-direction: column
      justify-content: center
    .pagination, .showUserCount
      text-align: center
      padding-bottom: 20px

</style>