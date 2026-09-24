import { useDispatch, useSelector } from 'react-redux'

import { toggleFavorite } from '../redux/slices/usersSlice'
import type { AppDispatch, RootState } from '../redux/store'

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, selectedUserId } = useSelector((state: RootState) => state.users)
  const selectedUser = users.find((user) => user.id === selectedUserId) ?? users[0]

  return (
    <article className="profile-card">
      <div className="profile-top">
        <span className="profile-avatar" style={{ backgroundColor: selectedUser.color }}>
          {selectedUser.initials}
        </span>
        <button
          aria-label={selectedUser.isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
          className={`favorite-button ${selectedUser.isFavorite ? 'is-favorite' : ''}`}
          onClick={() => dispatch(toggleFavorite(selectedUser.id))}
          type="button"
        >
          {selectedUser.isFavorite ? '★' : '☆'}
        </button>
      </div>

      <span className="section-label">Профіль учасника</span>
      <h2>{selectedUser.name}</h2>
      <p className="profile-role">{selectedUser.role}</p>
      <p className="profile-description">{selectedUser.description}</p>

      <div className="profile-details">
        <div>
          <span className="detail-label">Email</span>
          <strong>{selectedUser.email}</strong>
        </div>
        <div>
          <span className="detail-label">Локація</span>
          <strong>{selectedUser.location}</strong>
        </div>
      </div>

    </article>
  )
}

export default UserProfile