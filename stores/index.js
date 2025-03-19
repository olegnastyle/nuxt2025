import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      loader: false,
      search: '',
      authToggle: true,
    }
  },
})