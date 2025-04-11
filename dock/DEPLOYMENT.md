# Развертывание приложения

## Требования

- Node.js 18+
- npm 9+

## Установка

1. Клонировать репозиторий:
```bash
git clone https://github.com/your-username/nuxt2025.git
cd nuxt2025
```

2. Установить зависимости:
```bash
npm install
```

3. Создать файл `.env`:
```env
NUXT_PUBLIC_API_BASE=https://static.dublecode.ru/api
```

## Разработка

Запуск в режиме разработки:
```bash
npm run dev
```

## Сборка

1. Сборка для продакшена:
```bash
npm run build
```

2. Предпросмотр сборки:
```bash
npm run preview
```

## Деплой

1. Собрать приложение:
```bash
npm run build
```

2. Запустить в продакшене:
```bash
npm run start
```

## PM2

Для запуска в продакшене через PM2:

1. Установить PM2:
```bash
npm install -g pm2
```

2. Запустить приложение:
```bash
pm2 start ecosystem.config.cjs
```

3. Мониторинг:
```bash
pm2 monit
``` 