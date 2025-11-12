"use client"

import type React from "react"

import { useState } from "react"
import { mockUsers } from "@/lib/mock-data"
import type { User } from "@/lib/types"
import { Plus, Edit2, Trash2, Lock } from "lucide-react"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rank: "",
    role: "soldier" as const,
    department: "",
  })

  const roleLabels: Record<string, string> = {
    admin: "Quản trị viên",
    commander: "Chỉ huy",
    officer: "Sĩ quan",
    soldier: "Binh sĩ",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editId) {
      setUsers(
        users.map((u) =>
          u.id === editId
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                rank: formData.rank,
                role: formData.role,
                department: formData.department,
              }
            : u,
        ),
      )
      setEditId(null)
    } else {
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          rank: formData.rank,
          role: formData.role,
          department: formData.department,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    }
    setFormData({
      name: "",
      email: "",
      rank: "",
      role: "soldier",
      department: "",
    })
    setShowForm(false)
  }

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      rank: user.rank,
      role: user.role,
      department: user.department,
    })
    setEditId(user.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Quản lý User</h1>
          <p className="text-sm text-muted-foreground mt-1">4 cấp độ quyền hạn</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="military-btn flex items-center gap-2">
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      {showForm && (
        <div className="military-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tên đầy đủ</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cấp bậc</label>
                <input
                  type="text"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                  placeholder="Trung tá, Đại úy..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phòng ban</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quyền hạn</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground"
              >
                <option value="soldier">Binh sĩ (Cấp 4)</option>
                <option value="officer">Sĩ quan (Cấp 3)</option>
                <option value="commander">Chỉ huy (Cấp 2)</option>
                <option value="admin">Quản trị viên (Cấp 1)</option>
              </select>
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
                  setFormData({
                    name: "",
                    email: "",
                    rank: "",
                    role: "soldier",
                    department: "",
                  })
                }}
                className="military-btn-secondary"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Tên</th>
              <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Cấp bậc</th>
              <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Phòng ban</th>
              <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Quyền hạn</th>
              <th className="px-4 py-3 text-left text-muted-foreground font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-card/50 transition">
                <td className="px-4 py-3 text-foreground font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3 text-foreground">{user.rank}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-sm text-xs font-semibold flex items-center gap-1 w-fit ${
                      user.role === "admin"
                        ? "bg-destructive/20 text-destructive"
                        : user.role === "commander"
                          ? "bg-orange-500/20 text-orange-400"
                          : user.role === "officer"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    <Lock size={12} />
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 hover:bg-primary/20 text-primary rounded transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 hover:bg-destructive/20 text-destructive rounded transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission Levels Legend */}
      <div className="military-card p-6 mt-8">
        <h3 className="font-bold text-primary mb-4">Cấp độ quyền hạn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-background rounded border border-border">
            <p className="font-semibold text-foreground mb-1">Cấp 1: Quản trị viên</p>
            <p className="text-xs text-muted-foreground">Toàn quyền quản lý hệ thống</p>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <p className="font-semibold text-foreground mb-1">Cấp 2: Chỉ huy</p>
            <p className="text-xs text-muted-foreground">Quản lý phòng ban và công việc</p>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <p className="font-semibold text-foreground mb-1">Cấp 3: Sĩ quan</p>
            <p className="text-xs text-muted-foreground">Xem và quản lý sổ sách</p>
          </div>
          <div className="p-3 bg-background rounded border border-border">
            <p className="font-semibold text-foreground mb-1">Cấp 4: Binh sĩ</p>
            <p className="text-xs text-muted-foreground">Xem công việc và lịch trình</p>
          </div>
        </div>
      </div>
    </div>
  )
}
