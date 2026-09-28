import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

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
  selectedUserId: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const user = value as Record<string, unknown>

  return (
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.role === 'string' &&
    typeof user.email === 'string' &&
    typeof user.location === 'string' &&
    typeof user.initials === 'string' &&
    typeof user.color === 'string' &&
    typeof user.description === 'string' &&
    typeof user.isFavorite === 'boolean'
  )
}

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { state: { users: UsersState }; rejectValue: string }
>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.BASE_URL}users.json`)

    if (!response.ok) {
      throw new Error(`Не вдалося завантажити учасників (${response.status}).`)
    }

    const data: unknown = await response.json()

    if (!Array.isArray(data) || !data.every(isUser)) {
      return rejectWithValue('Отримано некоректний список учасників.')
    }

    return data
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().users
      return status !== 'loading' && status !== 'succeeded'
    },
  },
)

const initialState: UsersState = {
  users: [],
  selectedUserId: null,
  status: 'idle',
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
        state.selectedUserId = action.payload[0]?.id ?? null
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error.message ?? 'Не вдалося завантажити учасників.'
      })
  },
})

export const { selectUser, toggleFavorite } = usersSlice.actions
export default usersSlice.reducer
