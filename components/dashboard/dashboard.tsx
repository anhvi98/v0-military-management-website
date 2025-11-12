"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import Sidebar from "./sidebar"
import Header from "./header"
import DashboardHome from "./pages/home"
import DepartmentPage from "./pages/departments"
import TaskPage from "./pages/tasks"
import SchedulePage from "./pages/schedule"
import RecordsPage from "./pages/records"
import UsersPage from "./pages/users"

type Page = "home" | "departments" | "tasks" | "schedule" | "records" | "users"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!user) return null

  const renderPage = () => {
    switch (currentPage) {
      case "departments":
        return <DepartmentPage />
      case "tasks":
        return <TaskPage />
      case "schedule":
        return <SchedulePage />
      case "records":
        return <RecordsPage />
      case "users":
        return <UsersPage />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={user.role}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{renderPage()}</div>
        </main>
      </div>
    </div>
  )
}
