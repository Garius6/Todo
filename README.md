# Todo

## Общая информация
Каждый метод нижеописанного API должен сопровождаться префиксом /api

## Модели
todo - модель содержит информацию об 2 карточке. Модель состоит из: поле id - уникальный номер карточки, поле title - содержит имя карточки, поле description - содержимое карточки.

### Пример
```json
{id: 1, title: test, description: test}
```

## API
`GET /todo` - возвращает список всех сохраненных todo

`GET /todo/{id}` - возвращает todo с соответствующим id

`POST /todo` - создает todo c переданными параметрами

`PUT /todo/{id}` - изменяет данные todo c соответствующим id

`DELETE /todo/{id}` - удаляет todo с соответствующим id