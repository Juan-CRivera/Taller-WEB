import type {
  Health, TodosListResponse, Todo,
  AllDataResponse, DataInfoResponse
} from '../types'

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
  }
  const ct = res.headers.get('content-type') || ''
  return (ct.includes('application/json') ? res.json() : res.text()) as Promise<T>
}

export const API = {
  // Backend 1 (3000)
  health: () => http<Health>('/api/v1/health'),
  listTodos: () => http<TodosListResponse>('/api/v1/todos'),
  createTodo: (data: Pick<Todo, 'title'>) =>
    http<Todo>('/api/v1/todos', { method: 'POST', body: JSON.stringify(data) }),

  // Backend 2 (5000)
  books: {
    all: () => http<AllDataResponse>('/books/allData'),
    info: (id: string) => http<DataInfoResponse>(`/books/dataInfo/${id}`),
    search: (p: { status?: 'true' | 'false'; gender?: string }) => {
      const qs = new URLSearchParams()
      if (p.status) qs.set('status', p.status)
      if (p.gender?.trim()) qs.set('gender', p.gender.trim())
      return http<AllDataResponse>(`/books/dataInfoQuery?${qs.toString()}`)
    },
  },
}
