import { useDispatch, useSelector } from 'react-redux'

import { selectUser } from '../redux/slices/usersSlice'
import type { AppDispatch, RootState } from '../redux/store'

function UserList() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users)
  const selectedUserId = useSelector((state: RootState) => state.users.selectedUserId)

  return (
    <aside className="user-list">
      <div className="section-heading">
        <div>
          <span className="section-label">Учасники</span>
          <h2>Наша команда</h2>
        </div>
        <span className="user-count">{users.length}</span>
      </div>

      <div className="users">
        {users.map((user) => (
          <button
            className={`user-item ${user.id === selectedUserId ? 'is-selected' : ''}`}
            key={user.id}
            onClick={() => dispatch(selectUser(user.id))}
            type="button"
          >
            <span className="avatar" style={{ backgroundColor: user.color }}>
              {user.initials}
            </span>
            <span className="user-item-copy">
              <strong>{user.name}</strong>
              <small>{user.role}</small>
            </span>
            {user.isFavorite && <span className="favorite-mark">★</span>}
          </button>
        ))}
      </div>

      <p className="hint">Натисни на учасника, щоб переглянути профіль</p>
    </aside>
  )
}

export default UserList