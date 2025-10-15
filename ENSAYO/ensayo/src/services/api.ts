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
 if (ct.includes('application/json')) {
  return res.json() as Promise<T>;
} else {
  
  // Si no es JSON, intenta parsear como JSON de todas formas
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    console.error('Error al parsear JSON:', e);
    throw new Error(`Response is not JSON: ${text}`);
  }
}
}

export const API = {
  books: {
    all: () => http<AllDataResponse>('/allData'), 
    info: (id: string) => http<DataInfoResponse>(`/dataInfo/${id}`), 
    search: (p) => {
      const qs = new URLSearchParams()
      if (p.status) qs.set('status', p.status)
      if (p.gender?.trim()) qs.set('gender', p.gender.trim())
      return http<AllDataResponse>(`/dataInfoQuery?${qs.toString()}`) 
    },
  },
}
