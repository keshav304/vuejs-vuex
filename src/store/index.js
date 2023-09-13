import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    filteredUsers: [], 
    pagination: {
      currentPage: 1,
      perPage: 5,
    },
  },
  getters: {
    totalPages(state) {
      return Math.ceil(state.filteredUsers.length / state.pagination.perPage);
    },
    paginatedUsers(state) {
      const start = (state.pagination.currentPage - 1) * state.pagination.perPage;
      const end = start + state.pagination.perPage;
      return state.filteredUsers.slice(start, end);
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      state.filteredUsers = users;
    },
    SET_FILTER(state, { key, value }) {
      state.filters[key] = value;
    },
    SET_FILTERED_USERS(state, filteredUsers) {
      state.filteredUsers = filteredUsers;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    CLEAR_FILTERS(state) {
      state.filteredUsers = state.users; 
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;
        commit('SET_USERS', users);
        commit('SET_FILTERED_USERS', users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    applyFilters({ commit, state }, filters) {
      const { name, username, email, address, phone, website } = filters;
      console.log({name, username, email, address, phone, website});
      const filteredUsers = state.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(name.toLowerCase()) &&
          user.username.toLowerCase().includes(username.toLowerCase()) &&
          user.email.toLowerCase().includes(email.toLowerCase()) &&
          user.address.street.toLowerCase().includes(address.street.toLowerCase()) &&
          user.phone.toLowerCase().includes(phone.toLowerCase()) &&
          user.website.toLowerCase().includes(website.toLowerCase())
        );
      });
      commit('SET_FILTERED_USERS', filteredUsers);
      commit('SET_PAGINATION', { ...state.pagination, currentPage: 1 });
    },
    
    setPage({ commit, state }, page) {
      commit('SET_PAGINATION', { ...state.pagination, currentPage: page });
    },
    clearFilters({ commit }) {
      commit('CLEAR_FILTERS'); // Call the CLEAR_FILTERS mutation to clear filters
    },
  },
  modules: {
  }
})
