export interface User {
    id: string
    name: string
    email: string
    role: 'ADMIN' | 'STAFF'
    createdAt: string
    updatedAt: string
}

export interface AuthResponse {
    id: string
    name: string
    email: string
    role: "ADMIN" | "STAFF"
    token: string
}