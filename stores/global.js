import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    block1: false,
    block2: false,
    documentId: '',
    locale: 'ru'
  }),
  actions: {
    async fetchGlobalSettings() {
      try {
        const response = await fetch('https://static.dublecode.ru/api/global')
        const data = await response.json()
        
        this.block1 = data.data.block1
        this.block2 = data.data.block2
        this.documentId = data.data.documentId
        this.locale = data.data.locale
      } catch (error) {
        console.error('Ошибка при получении глобальных настроек:', error)
      }
    },
    async updateBlockVisibility(blockName, value) {
      try {
        const token = localStorage.getItem('jwt')
        const response = await fetch(`https://static.dublecode.ru/api/global`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              [blockName]: value
            }
          }),
        })

        if (!response.ok) {
          throw new Error('Ошибка при обновлении настроек')
        }

        const data = await response.json()
        this[blockName] = data.data[blockName]
      } catch (error) {
        console.error('Ошибка при обновлении настроек:', error)
      }
    }
  }
}) 