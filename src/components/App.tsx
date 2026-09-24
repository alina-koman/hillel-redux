import UserList from './UserList'
import UserProfile from './UserProfile'
import '../App.css'

function App() {
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
        <UserList />
        <UserProfile />
      </section>
    </main>
  )
}

export default App
