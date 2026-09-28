import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserList from './UserList'
import UserProfile from './UserProfile'
import '../App.css'
import { fetchUsers } from '../redux/slices/usersSlice'
import type { AppDispatch, RootState } from '../redux/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { error, status, users } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">React demo</span>
          <h1>Команда поруч</h1>
          <p className="subtitle">
            Познайомся з людьми, які створюють цей продукт разом.
          </p>
        </div>
      </header>

      <section className="workspace" aria-label="Профілі учасників команди">
        {status === 'loading' && <p className="request-message">Завантаження учасників…</p>}
        {status === 'failed' && (
          <div className="request-message" role="alert">
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => dispatch(fetchUsers())}
              type="button"
            >
              Спробувати знову
            </button>
          </div>
        )}
        {status === 'succeeded' &&
          (users.length > 0 ? (
            <>
              <UserList />
              <UserProfile />
            </>
          ) : (
            <p className="request-message">Список учасників порожній.</p>
          ))}
      </section>
    </main>
  )
}

export default App
