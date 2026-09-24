# Команда поруч

Невеликий React-застосунок для перегляду профілів учасників команди. Користувач може вибрати учасника зі списку, переглянути його контактну інформацію та додати або прибрати його з обраного.

## Демо

Відкрити deployed-версію проєкту: [https://hillel-redux.vercel.app/](https://hillel-redux.vercel.app/)

## Можливості

- список учасників команди з іменем, роллю та ініціалами;
- вибір активного профілю;
- відображення детальної інформації про учасника;
- додавання профілю до обраного та видалення з обраного;
- адаптивний інтерфейс для desktop і mobile;
- централізоване керування станом через Redux Toolkit.

## Технології

- React 19;
- TypeScript;
- Vite;
- Redux Toolkit;
- React Redux;
- Oxlint.

## Як працює стан

Стан застосунку зберігається в Redux store і має один slice `users`:

```ts
{
  users: User[],
  selectedUserId: number
}
```

Slice розташований у `src/redux/slices/usersSlice.ts` і містить:

- початковий список користувачів;
- reducer `selectUser` для вибору активного профілю;
- reducer `toggleFavorite` для зміни статусу обраного профілю;
- actions, автоматично створені через `createSlice`.

Компоненти не передають дані через props між рівнями:

1. `UserList` читає список користувачів і поточного користувача через `useSelector`.
2. При натисканні на учасника компонент dispatch-ить action `selectUser`.
3. `UserProfile` отримує активного користувача з Redux store.
4. Кнопка обраного dispatch-ить action `toggleFavorite`.
5. Redux оновлює стан, після чого компоненти автоматично перемальовуються.

Redux store підключений до React у `src/main.tsx` через `Provider`.

## Структура проєкту

```text
src/
├── components/
│   ├── App.tsx              # Основний layout сторінки
│   ├── UserList.tsx         # Список учасників і вибір профілю
│   └── UserProfile.tsx      # Деталі активного профілю
├── redux/
│   ├── slices/
│   │   └── usersSlice.ts    # Стан, reducers та actions користувачів
│   └── store.ts             # Конфігурація Redux store і типи
├── App.css                  # Стилі компонентів застосунку
├── index.css                # Глобальні стилі та фон
└── main.tsx                 # Точка входу і Redux Provider
```

## Встановлення та запуск

Потрібні Node.js і npm.

```bash
npm install
npm run dev
```

Після запуску development-серверу відкрийте адресу, яку покаже Vite у терміналі, зазвичай `http://localhost:5173`.

## Доступні команди

```bash
npm run dev      # запуск development-серверу
npm run build    # перевірка TypeScript і production-збірка
npm run lint     # перевірка коду Oxlint
npm run preview  # локальний перегляд production-збірки
```

## Production-збірка

Для перевірки готовності застосунку до деплою виконайте:

```bash
npm run build
npm run preview
```

Production-файли створюються у директорії `dist/`.
