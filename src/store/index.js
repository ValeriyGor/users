import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_url: "http://demo7931371.mockable.io",
    credentials: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma'
      }
    },
    allUsers: [],
    users: [],
    settingsSearch: {
      name: '',
      count: 10,
      page: 1,
      totalPages: 1,
      usersLength: 0
    }
  },
  getters: {
    users(state) {
      return state.users
    },
    user: (state) => (id) => {
      let users = [];
      state.allUsers.forEach(user => {
        if(user.id == id) users.push(user);
      });
      return users[0];
    },
    settingsSearch(state) {
      return state.settingsSearch
    },
    filteredUsers(state){
      let filtered = state.allUsers
          .filter(user => {
            return state.settingsSearch.name == '' || user.name.toLowerCase().indexOf(state.settingsSearch.name.toLowerCase()) !== -1;
          });
      let firstUser = (state.settingsSearch.page - 1) * state.settingsSearch.count;
      let lastUser = state.settingsSearch.page == state.settingsSearch.totalPages ? filtered.length : state.settingsSearch.page * state.settingsSearch.count;
      return filtered.slice(firstUser, lastUser);
    }
  },
  mutations: {
    SET_ALL_USERS: (state, payload) => {
      state.allUsers = payload;
    },
    SET_NAME_SEARCH: (state, payload) => {
      state.settingsSearch.name = payload
    },
    SET_COUNT_SHOW: (state, payload) => {
      state.settingsSearch.count = payload
    },
    SET_PAGE: (state, payload) => {
      state.settingsSearch.page = payload
    },
    SET_PAGINATION: (state, payload = state.allUsers.length) => {
      state.settingsSearch.page = 1;
      state.settingsSearch.usersLength = payload;
      state.settingsSearch.totalPages = Math.ceil(payload/state.settingsSearch.count);
    },
  },
  actions: {
    setAllUsers: ({commit, state}, payload) => {
      commit('SET_ALL_USERS', payload)
      commit('SET_PAGINATION', payload.length)
      return state.allUsers
    },
    setNameSearch: ({commit, state}, payload) => {
      commit('SET_NAME_SEARCH', payload);
      commit('SET_PAGE', 1);
      return state.settingsSearch.name
    },
    setCountShow: ({commit, state}) => {
      commit('SET_PAGINATION')
      return state.settingsSearch.count
    },
    setPagination: ({commit, state}, payload) => {
      commit('SET_PAGINATION', payload)
      return state.settingsSearch
    },
    setPage: ({commit, state}, payload) => {
      commit('SET_PAGE', payload);
      return state.settingsSearch.page
    }
  },
  modules: {
  }
})
