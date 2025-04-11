# Архитектура приложения

## Структура проекта

```
├── assets/         # Статические ресурсы (CSS, изображения)
├── components/     # Vue компоненты
│   ├── ui/        # UI компоненты (кнопки, формы и т.д.)
│   └── layout/    # Компоненты разметки (header, footer)
├── layouts/        # Шаблоны страниц
├── pages/          # Страницы приложения
├── plugins/        # Плагины Nuxt
├── public/         # Публичные файлы
├── server/         # Серверная логика
└── stores/         # Хранилище состояния (Pinia)
```

## Основные компоненты

### Страницы
- `pages/index.vue` - Главная страница со слайдером
- `pages/[category]/[slug].vue` - Детальная страница поста
- `pages/blog.vue` - Страница блога
- `pages/shop.vue` - Страница магазина

### Компоненты
- `components/AppHeader.vue` - Шапка сайта с навигацией
- `components/AppFooter.vue` - Подвал сайта
- `components/AppAuth.vue` - Компонент авторизации
- `components/ui/Profile.vue` - Профиль пользователя

## API и маршруты

### API Endpoints
- `https://static.dublecode.ru/api/posts` - Посты
- `https://static.dublecode.ru/api/categories` - Категории
- `https://static.dublecode.ru/api/navbars` - Навигация
- `https://static.dublecode.ru/api/global` - Глобальные настройки

### Маршруты
- `/` - Главная страница
- `/:category/:slug` - Детальная страница поста
- `/blog` - Страница блога
- `/shop` - Страница магазина

## Технологии

- Nuxt 3
- Vue 3
- Pinia
- Tailwind CSS
- Swiper
- Markdown-it 