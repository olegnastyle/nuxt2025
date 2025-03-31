import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      loader: false, // индикатор загрузки
      search: '', // поисковая строка
      authToggle: true, // переключитель состояния авторизации / регистрации
      userMe: {},
    }
  },
  actions: {
    async fetchUserMe() {
      try {
        const token = localStorage.getItem('jwt')
        const response = await fetch('https://static.dublecode.ru/api/users/me',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        )

        const data = await response.json();
        this.userMe = data;
      } catch (error) {
        console.log(error);
      }
    },
  }
})