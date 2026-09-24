import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type User = {
  id: number
  name: string
  role: string
  email: string
  location: string
  initials: string
  color: string
  description: string
  isFavorite: boolean
}

export type UsersState = {
  users: User[]
  selectedUserId: number
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Анна Коваленко',
    role: 'Frontend developer',
    email: 'anna@example.com',
    location: 'Київ, Україна',
    initials: 'АК',
    color: '#7c5cff',
    description: 'Створює зрозумілі інтерфейси та перетворює складні задачі на прості рішення.',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Максим Шевченко',
    role: 'Product designer',
    email: 'maksym@example.com',
    location: 'Львів, Україна',
    initials: 'МШ',
    color: '#f06b9a',
    description: 'Досліджує потреби користувачів і допомагає команді робити продукт кориснішим.',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Софія Мельник',
    role: 'Project manager',
    email: 'sofia@example.com',
    location: 'Одеса, Україна',
    initials: 'СМ',
    color: '#2ba88a',
    description: 'Організовує командну роботу, планує релізи та тримає фокус на результаті.',
    isFavorite: false,
  },
]

const initialState: UsersState = {
  users: initialUsers,
  selectedUserId: initialUsers[0].id,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const user = state.users.find((item) => item.id === action.payload)

      if (user) {
        user.isFavorite = !user.isFavorite
      }
    },
  },
})

export const { selectUser, toggleFavorite } = usersSlice.actions
export default usersSlice.reducer
