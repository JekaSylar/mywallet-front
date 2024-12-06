import {computed} from 'vue';
import { defineStore } from 'pinia';
import axios from '@/axios';
import {useFlashMessage} from '@/stores/flashMessage.js'

const TOKEN_KEY = "jwt-token";

export const useAuth = defineStore('auth', () => {

    const isAuthenticated = computed(() => !!localStorage.getItem(TOKEN_KEY));

    const removeToken = () => localStorage.removeItem(TOKEN_KEY);

    const message = useFlashMessage();

    const login = async (email, password) => {
      try {
        const { data } = await axios.post('login', { email, password });
        localStorage.setItem(TOKEN_KEY, data.data.token);
      } catch {
        message.setFlashMessage( 'error', 'Логін або пароль невірні');
      }
    }

    const register = async (name, email, password, password_confirmation) => {
      try {
        const { data } = await axios.post('register', { name, email, password, password_confirmation });
         localStorage.setItem(TOKEN_KEY, data.data.token);
      } catch(e) {
        message.setFlashMessage( 'error', e.response.data.message);
      }
    }

    const resetPassword = async (email) => {
      try {
         const { data } = await axios.post('password/mail', { email });
        message.setFlashMessage( 'success', data.message);
        return data.token
      }
      catch (e) {
        message.setFlashMessage( 'error', e.response.data.message);
      }

    }

  const codeResetPassword = async (code, token) => {
    try {
      const { data } =   await axios.post('password/code/check/', {  code, token,});
      message.setFlashMessage( 'success', data.message);
     return true;
    }
    catch (e) {
      message.setFlashMessage( 'error', e.response.data.message);
      return false;
    }

  }

  const updatePassword = async (token, password, password_confirmation) => {
    try {
      const { data } = await axios.post('password/update', { token, password, password_confirmation});
      message.setFlashMessage( 'success', data.message);
      await login(data.emailUser, password);
    }
    catch (e) {
      message.setFlashMessage( 'error', e.response.data.message);
    }
  }

  const googleCallback = async  () => {
    try {
      const { data } = await axios.get('google/callback');
      localStorage.setItem(TOKEN_KEY, data.token);

    }
    catch (e) {
      message.setFlashMessage( 'error', e.response.data.message);
    }
  }

  const logout = async () => {
    try {
       await axios.get('logout');
      localStorage.removeItem(TOKEN_KEY);
    }
    catch (e) {
      message.setFlashMessage( 'error', e.response.data.message);
      console.error(e.message)
    }
  }




  return {
      isAuthenticated,
    removeToken,
    login,
    register,
    resetPassword,
    codeResetPassword,
    updatePassword,
    googleCallback,
    logout
  }
});

