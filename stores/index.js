import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      loader: false, // индикатор загрузки
      search: '', // поисковая строка
      authToggle: true, // переключитель состояния авторизации / регистрации
      editProfileToggle: false,
      userMe: {},
    }
  },
  actions: {
    // получение данных пользователя
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
    // выход из профиля
    logout() {
      localStorage.removeItem('jwt')
      this.userMe = {}
    },
    // авторизация
    async login(loginData) {
      try {
        const response = await fetch('https://static.dublecode.ru/api/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Указываем тип контента
          },
          body: JSON.stringify({
            "identifier": loginData.email,
            "password": loginData.password
          }),
        });
    
        const data = await response.json();
        localStorage.setItem('jwt', data.jwt)
        this.userMe = data.user
        if (!response.ok) {
          throw new Error(data.error.message); // Обработка ошибок
        }
      } catch (error) {
        console.log('Ошибка при авторизации:', error);
      }
    },
    // сохранение профиля
    async saveUserMe(editUserMe) {
      this.editProfileToggle = false;
      try {
        this.loader = true;
        const token = localStorage.getItem('jwt');
        
        const response = await fetch(`https://static.dublecode.ru/api/users/${this.userMe.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: editUserMe.name,
            email: editUserMe.email,
          }),
        });
        
        const data = await response.json();
      } catch (error) {
        console.error(error);
      } finally {
        this.loader = false;
        this.editProfileToggle = true;
      }
    },
  }
})