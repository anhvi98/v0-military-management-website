"use client"

import type { UserRole } from "@/lib/types"
import { Home, Building2, CheckSquare, Calendar, BookOpen, Users, Menu, Shield } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: any) => void
  isOpen: boolean
  onToggle: () => void
  userRole: UserRole
}

const menuItems = [
  {
    id: "home",
    label: "Trang chủ",
    icon: Home,
    roles: ["admin", "commander", "officer", "soldier"] as UserRole[],
  },
  {
    id: "departments",
    label: "Phòng ban",
    icon: Building2,
    roles: ["admin", "commander"] as UserRole[],
  },
  {
    id: "tasks",
    label: "Công việc",
    icon: CheckSquare,
    roles: ["admin", "commander", "officer", "soldier"] as UserRole[],
  },
  {
    id: "schedule",
    label: "Lịch công tác",
    icon: Calendar,
    roles: ["admin", "commander", "officer", "soldier"] as UserRole[],
  },
  {
    id: "records",
    label: "Sổ sách",
    icon: BookOpen,
    roles: ["admin", "commander", "officer"] as UserRole[],
  },
  {
    id: "users",
    label: "Quản lý User",
    icon: Users,
    roles: ["admin"] as UserRole[],
  },
]

export default function Sidebar({ currentPage, onPageChange, isOpen, onToggle, userRole }: SidebarProps) {
  const visibleItems = menuItems.filter((item) => item.roles.includes(userRole))

  return (
    <aside
      className={`bg-secondary border-r border-border h-screen flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {isOpen && (
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary text-sm">375</span>
          </div>
        )}
        <button onClick={onToggle} className="p-2 hover:bg-secondary-foreground/10 rounded text-secondary-foreground">
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground hover:bg-secondary-foreground/10"
              }`}
              title={item.label}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        {isOpen && (
          <div className="text-xs text-secondary-foreground/60">
            <p className="font-semibold mb-1">Sư đoàn Phòng không</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  )
}
