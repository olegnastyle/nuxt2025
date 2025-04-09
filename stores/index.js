import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      loader: false, // индикатор загрузки
      search: '', // поисковая строка
      authToggle: true, // переключитель состояния авторизации / регистрации
      editProfileToggle: true, // переключитель редактирования профиля
      userMe: {}, // данные пользователя
    }
  },
  actions: {
    // получение данных пользователя
    async fetchUserMe() {
      try {
        this.loader = true;
        const token = localStorage.getItem('jwt')
        
        if (token) {
          const response = await fetch('https://static.dublecode.ru/api/users/me?populate=*',
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          )

          const data = await response.json();
          this.userMe = data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loader = false;
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
        this.loader = true;
        const response = await fetch('https://static.dublecode.ru/api/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "identifier": loginData.email,
            "password": loginData.password
          }),
        });
    
        const data = await response.json();
        // перезаписываем токен
        localStorage.setItem('jwt', data.jwt);
        // обновили данные о пользователе
        this.userMe = data.user;
        // получаем полные данные пользователя
        await this.fetchUserMe();
        
      } catch (error) {
        console.log('Ошибка при авторизации:', error);
      } finally {
        this.loader = false;
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

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Ошибка от сервера:', errorData);
          throw new Error('Ошибка при сохранении данных');
        }

        const data = await response.json();
        // обновили данные о пользователе
        this.userMe = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loader = false;
        this.editProfileToggle = true;
      }
    },
  }
})