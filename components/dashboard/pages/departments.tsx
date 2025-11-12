"use client"

import type React from "react"

import { useState } from "react"
import { mockDepartments } from "@/lib/mock-data"
import { Plus, Edit2, Trash2 } from "lucide-react"
import type { Department } from "@/lib/types"

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    commander: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editId) {
      setDepartments(departments.map((d) => (d.id === editId ? { ...d, ...formData } : d)))
      setEditId(null)
    } else {
      setDepartments([
        ...departments,
        {
          id: Date.now().toString(),
          ...formData,
        },
      ])
    }
    setFormData({ name: "", code: "", commander: "", description: "" })
    setShowForm(false)
  }

  const handleEdit = (dept: Department) => {
    setFormData({
      name: dept.name,
      code: dept.code,
      commander: dept.commander,
      description: dept.description,
    })
    setEditId(dept.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Quản lý Phòng ban</h1>
        <button onClick={() => setShowForm(!showForm)} className="military-btn flex items-center gap-2">
          <Plus size={20} />
          Thêm phòng ban
        </button>
      </div>

      {showForm && (
        <div className="military-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tên phòng ban</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mã phòng</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Chỉ huy</label>
                <input
                  type="text"
                  value={formData.commander}
                  onChange={(e) => setFormData({ ...formData, commander: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mô tả</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="military-btn">
                {editId ? "Cập nhật" : "Tạo mới"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditId(null)
                  setFormData({ name: "", code: "", commander: "", description: "" })
                }}
                className="military-btn-secondary"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="military-card p-6 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-primary mb-2">{dept.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-foreground">
                  <span className="text-muted-foreground">Mã:</span> {dept.code}
                </span>
                <span className="text-foreground">
                  <span className="text-muted-foreground">Chỉ huy:</span> {dept.commander}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(dept)}
                className="p-2 hover:bg-primary/20 text-primary rounded transition"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(dept.id)}
                className="p-2 hover:bg-destructive/20 text-destructive rounded transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
