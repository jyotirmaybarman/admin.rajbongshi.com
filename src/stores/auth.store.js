import { defineStore } from 'pinia'
import axios from '../utils/axios';
import { useNotification } from '../utils/notification';
import { useJwt } from '@vueuse/integrations/useJwt';

const { notify } = useNotification();

export const useAuthStore = defineStore({
  id: 'auth-store',

  state: () => ({
    user: null,
    token: null,
    interval: null
  }),

  getters: {
    getUser() {
      return this.user;
    },
    getAuthHeader() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      };
    }
  },

  actions: {
    async register(data) {
      try {
        const res = await axios.post('/auth/register', data);
        notify({ message: res.data.message, type: "success" });
        return { data: res.data, success: true }
      } catch (error) {
        notify({ message: error.response.data.message, type: "error" });
        return { data: error.response.data, success: false }
      }
    },
    async resendVerificationEmail(data) {
      try {
        const res = await axios.post(`/auth/resend-verification`, data);
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async login(data) {
      try {
        const res = await axios.post('/auth/login', data);
        this.token = res.data.access_token;
        await this.getLoggedInUser();
        notify({ message: res.data.message, type: "success" });
        return { data: res.data, success: true }
      } catch (error) {
        notify({ message: error.response.data.message, type: "error" });
        return { data: error.response.data, success: false }
      }
    },
    async logout() {
      try {
        const res = await axios.post('/auth/logout', this.getAuthHeader);
        this.user = null;
        this.token = null;
        notify({ message: res.data.message, type: "success" });
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        notify({ message: error.response.data.message, type: "error" });
        return { data: error.response.data, success: false }
      }
    },
    async getLoggedInUser() {
      try {
        const res = await axios.get('/auth/me', this.getAuthHeader);
        this.user = res.data;
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async refreshAccessToken() {
      try {
        const res = await axios.post('/auth/refresh');
        this.token = res.data.access_token;
        this.attachIntervalToAccessTokenRefresh(this.token)
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async verifyEmail(data) {
      try {
        const res = await axios.post('/auth/verify-email', data);
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async requestPassowrdResetLink(data) {
      try {
        const res = await axios.post(`/auth/forgot-password`, data);
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async resetPassword(data) {
      try {
        const res = await axios.post('/auth/reset-password', data);
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    async updateProfile(data) {
      try {
        const res = await axios.patch('/auth/update-profile', data, this.getAuthHeader);
        this.getLoggedInUser();
        return { data: res.data, success: true }
      } catch (error) {
        console.log(error);
        return { data: error.response.data, success: false }
      }
    },
    
    attachIntervalToAccessTokenRefresh(token){
      if(this.interval){
        clearInterval(this.interval);
      }
      let { payload: token_data } = useJwt(token);
      const miliSecondsLeft = (token_data.value.exp - token_data.value.iat) * 1000;
      this.interval = setInterval(() => {
        this.refreshAccessToken();
      }, miliSecondsLeft - 2000)
    },
  },
});