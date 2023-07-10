import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state() {
    return {
      userList: [],
      filteredUserList: [],
      page: 1,
      searchQuery: ''
    };
  },
  mutations: {
    setUserList(state, userList) {
      state.userList = userList;
      state.filteredUserList = userList;
    },

    updateSearchQuery(state, value) {
      state.searchQuery = value;
    },
    filterUserList(state, searchQuery) {
      state.searchQuery = searchQuery.trim();
      if (searchQuery.trim() === '') {
        state.filteredUserList = state.userList;
      }
      else{
        state.filteredUserList = state.userList.filter((user) => {
          const fullName = user.fullName.toLowerCase();
          return fullName.includes(searchQuery.toLowerCase());
        });
      }

    },

    updateUser(state, updatedUser) {
      const userIndex = state.userList.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        const updatedUserCopy = {
          ...state.userList[userIndex],
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          avatar: updatedUser.avatar,
          fullName: `${updatedUser.first_name} ${updatedUser.last_name}`,
        };
        state.userList.splice(userIndex, 1, updatedUserCopy);
        const filteredUserIndex = state.filteredUserList.findIndex((user) => user.id === updatedUser.id);
        if (filteredUserIndex !== -1) {
          state.filteredUserList.splice(filteredUserIndex, 1, updatedUserCopy);
        }
      }
    },
    
    
    
    
    // updateUser(state, updatedUser) {
    //   const userIndex = state.userList.findIndex((user) => user.id === updatedUser.id);
    //   if (userIndex !== -1) {
    //     const updatedUserCopy = {
    //       ...state.userList[userIndex],
    //       id: updatedUser.id,
    //       first_name: updatedUser.first_name,
    //       last_name: updatedUser.last_name,
    //       avatar: updatedUser.avatar,
    //     };
    //     state.userList.splice(userIndex, 1, updatedUserCopy);
    //     state.filteredUserList.splice(userIndex, 1, updatedUserCopy);
    //   }
    // },
    deleteUser(state, userId) {
      const userIndex = state.userList.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.userList.splice(userIndex, 1);
      }
    
      const filteredUserIndex = state.filteredUserList.findIndex((user) => user.id === userId);
      if (filteredUserIndex !== -1) {
        state.filteredUserList.splice(filteredUserIndex, 1);
      }
    },
    
    
    
    
    addUser(state, newUser) {
      state.filteredUserList.push(newUser);

    },
  },
  actions: {
    async fetchUserList({ commit }) {
      try {
        const response = await axios.get('https://reqres.in/api/users');
        const userList = response.data.data.map((user) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          fullName: `${user.first_name} ${user.last_name}`,
        }));
        commit('setUserList', userList);
      } catch (error) {
        console.error('Failed to fetch user list:', error);
      }
    },
    async updateUser({ commit }, updatedUser) {
      try {
        // Make API request to update the user
        // Replace `apiEndpoint` with the appropriate API endpoint for updating a user
        // await axios.put(`https://reqres.in/api/users/${updatedUser.id}`, updatedUser);

        commit('updateUser', updatedUser);
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },
    clearSearchQuery({ commit }) {
      commit('updateSearchQuery', '');
    },
    async deleteUser({ commit }, userId) {
      try {
        // Make API request to delete the user
        // Replace `apiEndpoint` with the appropriate API endpoint for deleting a user
        // await axios.delete(`https://reqres.in/api/users/${userId}`);

        commit('deleteUser', userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    },
    async createUser({ commit}, newUser) {
      try {
        // Make API request to create the user
        // Replace `apiEndpoint` with the appropriate API endpoint for creating a user
        // const response = await axios.post('https://reqres.in/api/users', newUser);
        // const id = response.data.id;
        const createdUser = {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          avatar: newUser.avatar,
          fullName: `${newUser.first_name} ${newUser.last_name}`,
        };
        commit('addUser', createdUser);

      } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
      }
    },
    filterUserList({ commit, state }, searchQuery) {
      commit('filterUserList', searchQuery);
    },
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.filteredUserList.find((user) => user.id === id);
    },
    getUserList: (state) => {
      return state.userList;
    },
    getFilteredUserList: (state) => {
      return state.filteredUserList;
    },
    getSearchInput: (state) => {
      return state.searchQuery;
    },
  },
});
