/*import Todos from './components/Todos'*/
import Books from './components/Books'

export default function App() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>Ensayo parcial</h1>
{/* <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Todos</h2>
        <Todos />
      </section>*/}
      <hr />

      <section style={{ marginTop: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Libros</h2>
        <Books />
      </section>
    </main>
  )
}
