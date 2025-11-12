"use client"

import type { User } from "@/lib/types"
import { LogOut, Bell } from "lucide-react"

interface HeaderProps {
  user: User
  onLogout: () => void
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="military-header h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-primary">Sư đoàn Phòng không 375</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right text-sm">
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.rank}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-destructive/20 text-destructive rounded transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
