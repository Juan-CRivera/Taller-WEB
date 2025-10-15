// API 1: TODOS
export interface Health { ok: boolean; ts: number }
export interface Todo { id: number; title: string; done: boolean }
export interface TodosListResponse { data: Todo[] }

// API 2: LIBROS
export interface BookItem {
  id: string
  isActive: boolean
  picture: string
  datePublish: string
  nameBook: string
  gender: string
}
export interface AllDataResponse { status: boolean; data: BookItem[]; dateTime: string }
export interface DataInfoResponse { status: boolean; item: BookItem; dateTime: string }
