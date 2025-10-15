import { useEffect, useState } from 'react'
import type React from 'react'
import { API } from '../services/api'
import type { Todo } from '../types'

export default function Todos() {
  const [list, setList] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const todosResp = await API.listTodos()
      setList(Array.isArray(todosResp?.data) ? todosResp.data : [])
    } catch (e) {
      console.error('Error cargando todos', e) // no mostramos error en pantalla
      setList([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  async function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const t = title.trim(); if (!t) return
    try {
      const created = await API.createTodo({ title: t })
      setList(prev => [created, ...prev]); setTitle('')
    } catch (e) {
      console.error('Error creando todo', e)
    }
  }
  const onTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.target.value)

  return (
    <section>
      <form onSubmit={onAdd} style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input value={title} onChange={onTitle} placeholder="Nueva tarea…"
          style={{ flex:1, padding:10, borderRadius:8, border:'1px solid #ccc' }}/>
        <button type="submit" style={{ padding:'10px 14px', borderRadius:8 }}>Agregar</button>
        <button type="button" onClick={load} style={{ padding:'10px 14px', borderRadius:8 }}>Recargar</button>
      </form>

      {loading && <p>Cargando…</p>}
      {!loading && list.length === 0 && <p>No hay tareas.</p>}

      <ul style={{ listStyle:'none', padding:0, display:'grid', gap:8 }}>
        {list.map(t => (
          <li key={t.id} style={{ padding:10, border:'1px solid #ddd', borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <strong>{t.title}</strong>{t.done ? <span style={{ color:'green' }}> hecha</span> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
