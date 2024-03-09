export interface VouchDto {
  firstName: string
  lastName: string
  message: string
  skills: string
  relationship: string
}

export interface Vouch {
  id: string
  firstName: string
  lastName: string
  message: string
  skills: string
  relationship: string
  createdAt: string
  addedAt?: string
  updatedAt: string
}

export interface AccessRequestDto {
  email: string
  message: string
}

export interface AccessRequest {
  id: string
  email: string
  message: string
  createdAt: string
  updatedAt: string
}
