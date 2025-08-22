# Изменения в проекте mobilehook-redux

## Внесенные изменения

### 1. Добавлены зависимости Redux
- `react-redux`: для связи React компонентов с Redux store
- `redux`: основная библиотека Redux
- `redux-thunk`: middleware для асинхронных операций

### 2. Создана Redux архитектура
- **store/clientsSlice.js**: содержит Redux actions, action creators, thunk функции и reducer для управления клиентами
- **store/index.js**: конфигурация Redux store с применением thunk middleware

### 3. Модифицирован App.js
- Добавлен Provider для подключения Redux store
- Убраны статические данные (companyName, clientsData)
- ClientManager теперь получает данные из Redux store

### 4. Модифицирован ClientManager.js
- Использует useSelector и useDispatch хуки для работы с Redux
- Загружает данные из API при монтировании компонента с помощью loadCompanyData thunk
- Управляет состоянием через Redux actions
- Добавлены состояния загрузки и ошибок
- Убраны локальные useState для клиентов

### 5. Redux Store Structure
```
state = {
  clients: {
    companyName: string,
    clients: array,
    loading: boolean,
    error: string|null
  }
}
```

### 6. API Integration
- Данные загружаются из https://fe.it-academy.by/Examples/mobile_company.json
- Используется Redux Thunk для асинхронной загрузки
- Обработка состояний загрузки и ошибок

### 7. Компоненты MobileClient (ClientRow, ClientFilter, etc.)
- Остались без изменений
- Продолжают получать данные через props от ClientManager
- Не работают напрямую с Redux

## Как это работает

1. При загрузке приложения ClientManager диспатчит `loadCompanyData()`
2. Thunk функция выполняет запрос к API
3. Полученные данные сохраняются в Redux store
4. ClientManager получает данные через useSelector
5. Дочерние компоненты получают данные через props как раньше
6. Все изменения (добавление, удаление, редактирование) происходят через Redux actions
