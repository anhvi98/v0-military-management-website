// User permission levels: 4-tier system
export type UserRole = "admin" | "commander" | "officer" | "soldier"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  rank: string
  createdAt: Date
  updatedAt: Date
}

export interface Department {
  id: string
  name: string
  code: string
  commander: string
  description: string
}

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  department: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  createdBy: string
}

export interface WorkSchedule {
  id: string
  date: Date
  title: string
  description: string
  department: string
  time: string
  location: string
}

export interface Record {
  id: string
  title: string
  content: string
  category: string
  department: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface RecordNode {
  id: string
  name: string
  type: "folder" | "file"
  parent?: string
  children?: RecordNode[]
  category?: string
  date?: Date
  department?: string
  description?: string // added description field
  createdAt?: Date // added creation date
}
