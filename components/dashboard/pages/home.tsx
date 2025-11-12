"use client"

import { useAuth } from "@/lib/auth-context"
import { mockDepartments, mockTasks, mockSchedule } from "@/lib/mock-data"
import { Building2, CheckSquare, Calendar } from "lucide-react"

export default function DashboardHome() {
  const { user } = useAuth()

  const stats = [
    {
      label: "Phòng ban",
      value: mockDepartments.length,
      icon: Building2,
      color: "text-blue-500",
    },
    {
      label: "Công việc",
      value: mockTasks.length,
      icon: CheckSquare,
      color: "text-green-500",
    },
    {
      label: "Lịch trình hôm nay",
      value: mockSchedule.length,
      icon: Calendar,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="military-card p-6 border-l-4 border-primary">
        <h1 className="text-3xl font-bold text-primary mb-2">Chào mừng, {user?.name}</h1>
        <p className="text-muted-foreground">
          Cấp bậc: <span className="font-semibold text-foreground">{user?.rank}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="military-card p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Tasks */}
      <div className="military-card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Công việc gần đây</h2>
        <div className="space-y-3">
          {mockTasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-background rounded hover:bg-background/80 transition"
            >
              <div>
                <p className="font-semibold text-foreground">{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-sm text-xs font-semibold ${
                  task.priority === "high"
                    ? "bg-destructive/20 text-destructive"
                    : task.priority === "medium"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung" : "Thấp"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="military-card p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Phòng ban</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockDepartments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 bg-background rounded border border-border hover:border-primary transition"
            >
              <h3 className="font-semibold text-foreground mb-2">{dept.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
              <p className="text-xs text-muted-foreground">
                Chỉ huy: <span className="text-foreground">{dept.commander}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
