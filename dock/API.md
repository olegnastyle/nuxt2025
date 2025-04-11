# API Документация

## Endpoints

### Посты

#### Получение списка постов
```http
GET /api/posts
```

Параметры:
- `populate=*` - Получить все связанные данные
- `filters[slug][$eqi]=${slug}` - Фильтр по slug
- `filters[categories][slug][$eqi]=${category}` - Фильтр по категории

#### Получение поста
```http
GET /api/posts/${id}
```

#### Обновление просмотров
```http
PUT /api/posts/${id}
```

Тело запроса:
```json
{
  "data": {
    "views": number
  }
}
```

### Категории

#### Получение списка категорий
```http
GET /api/categories
```

Параметры:
- `populate=*` - Получить все связанные данные

### Навигация

#### Получение навигации
```http
GET /api/navbars
```

Параметры:
- `populate[categories][populate][0]=subcategories` - Получить категории и подкатегории
- `sort=sort:asc` - Сортировка по полю sort

### Глобальные настройки

#### Получение настроек
```http
GET /api/global
```

Параметры:
- `populate=*` - Получить все связанные данные

#### Обновление настроек
```http
PUT /api/global
```

Тело запроса:
```json
{
  "data": {
    "block1": boolean,
    "block2": boolean
  }
}
```

## Аутентификация

### Регистрация
```http
POST /api/auth/local/register
```

Тело запроса:
```json
{
  "username": string,
  "email": string,
  "password": string
}
```

### Авторизация
```http
POST /api/auth/local
```

Тело запроса:
```json
{
  "identifier": string,
  "password": string
}
``` 