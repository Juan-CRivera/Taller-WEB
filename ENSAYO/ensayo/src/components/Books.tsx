// Books.tsx
import { useEffect, useState } from 'react'
import type React from 'react'
import { API } from '../services/api'
import type { BookItem } from '../types'

type StatusFilter = '' | 'true' | 'false'

export default function Books() {
  const [list, setList] = useState<BookItem[]>([])
  const [status, setStatus] = useState<StatusFilter>('') // '', 'true', 'false'
  const [gender, setGender] = useState('')
  const [detail, setDetail] = useState<BookItem | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadAll() {
    setLoading(true); setDetail(null)
    try {
      const json = await API.books.all()
      setList(Array.isArray(json?.data) ? json.data : [])
    } catch (e) {
      console.error('Error cargando libros', e)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  async function search() {
    setLoading(true); setDetail(null)
    try {
      const json = await API.books.search({
        status: status || undefined,
        gender: gender || undefined,
      })
      setList(Array.isArray(json?.data) ? json.data : [])
    } catch (e) {
      console.error('Error buscando libros', e)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  async function openDetail(id: string) {
    try {
      const json = await API.books.info(id)
      setDetail(json?.status ? json.item : null)
    } catch (e) {
      console.error('Error cargando detalle', e)
    }
  }

  useEffect(() => { loadAll() }, [])

  const onStatus: React.ChangeEventHandler<HTMLSelectElement> =
    (e) => setStatus(e.target.value as StatusFilter)
  const onGender: React.ChangeEventHandler<HTMLInputElement> =
    (e) => setGender(e.target.value)

  return (
    <section>
      <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
        <select value={status} onChange={onStatus} style={{ padding:10, borderRadius:8 }}>
          <option value="">Status (todos)</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>

        <input
          placeholder="Género (p.ej. suspenso)"
          value={gender}
          onChange={onGender}
          style={{ padding:10, borderRadius:8, border:'1px solid #ccc', minWidth:220 }}
        />

        <button onClick={search} style={{ padding:'10px 14px', borderRadius:8 }}>Buscar</button>
        <button onClick={loadAll} style={{ padding:'10px 14px', borderRadius:8 }}>Ver todos</button>
      </div>

      {loading && <p>Cargando…</p>}
      {!loading && list.length === 0 && <p>No hay resultados.</p>}

      {/* 👇 ESTO es lo que debe mostrarse, NO el JSON */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:12 }}>
        {list.map(b => (
          <article key={b.id} onClick={() => openDetail(b.id)} style={{ cursor:'pointer', border:'1px solid #ddd', borderRadius:12, padding:12 }}>
            <img src={b.picture} alt={b.nameBook} style={{ width:'100%', height:120, objectFit:'cover', borderRadius:8, marginBottom:8 }} />
            <h4 style={{ margin:'0 0 4px' }}>{b.nameBook}</h4>
            <small style={{ opacity:.7 }}>{b.gender} · {b.datePublish}</small>
            <div style={{ marginTop:6 }}>
              <span style={{ fontSize:12, padding:'2px 6px', borderRadius:6, background:b.isActive?'#d6f5d6':'#f5d6d6', color:'#333' }}>
                {b.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </article>
        ))}
      </div>

      {detail && (
        <div style={{ marginTop:16, padding:12, border:'1px solid #bbb', borderRadius:12 }}>
          <h3 style={{ marginTop:0 }}>Detalle</h3>
          <div style={{ display:'flex', gap:12 }}>
            <img src={detail.picture} alt={detail.nameBook} style={{ width:120, height:120, objectFit:'cover', borderRadius:8 }} />
            <div>
              <p><strong>{detail.nameBook}</strong></p>
              <p>Género: {detail.gender}</p>
              <p>Publicado: {detail.datePublish}</p>
              <p>Status: {detail.isActive ? 'Activo' : 'Inactivo'}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}