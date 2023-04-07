import { defineStore } from 'pinia'
import axios from '../utils/axios'
import { useAuthStore } from './auth.store';

export const useUsersStore = defineStore({
  id: 'users-store',

  state: () => ({
    users: null,
    usersCount: 0
  }),

  getters: {
    getUsers() {
      return this.users
    },
    getUsersCount() {
      return this.usersCount
    }
  },

  actions: {
    async fetchAllUsers() {
      try {
        const res = await axios.get(`/auth/users`, useAuthStore().getAuthHeader);
        console.log(res);
        this.users = res.data.data
        this.usersCount = res.data.meta.count
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async addNewUser(data) {
      try {
        const res = await axios.post('/auth/users', data, useAuthStore().getAuthHeader);
        console.log(res);
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async updateUser(id, data) {
      try {
        const res = await axios.patch(`/auth/users/${id}`, data, useAuthStore().getAuthHeader);
        let users = this.users.filter(user => user.id != id)
        users.push(res.data.data);
        users.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
        this.users = users;
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async deleteUser(id) {
      try {
        const res = await axios.delete(`/auth/users/${id}`, useAuthStore().getAuthHeader);
        console.log(res);
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    }


  },
});