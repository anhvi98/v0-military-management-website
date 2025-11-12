"use client"

import { useState } from "react"
import { mockTasks } from "@/lib/mock-data"
import type { Task } from "@/lib/types"
import { Plus, CheckCircle2, Circle } from "lucide-react"

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter)

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const statuses: Array<Task["status"]> = ["pending", "in-progress", "completed"]
          const current = statuses.indexOf(task.status)
          const next = statuses[(current + 1) % statuses.length]
          return { ...task, status: next }
        }
        return task
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Quản lý Công việc</h1>
        <button className="military-btn flex items-center gap-2">
          <Plus size={20} />
          Thêm công việc
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as "all" | "pending" | "in-progress" | "completed")}
            className={`px-4 py-2 rounded-sm transition-colors ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {status === "all"
              ? "Tất cả"
              : status === "pending"
                ? "Chờ xử lý"
                : status === "in-progress"
                  ? "Đang làm"
                  : "Hoàn thành"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="military-card p-4 flex items-start gap-4">
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className="mt-1 flex-shrink-0 text-muted-foreground hover:text-primary transition"
            >
              {task.status === "completed" ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              <div className="flex gap-3 mt-3 flex-wrap">
                <span className="text-xs text-muted-foreground">Hạn: {task.dueDate.toLocaleDateString("vi-VN")}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-sm ${
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
