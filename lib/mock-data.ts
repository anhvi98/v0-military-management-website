import type { User, Department, Task, WorkSchedule, RecordNode } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Trung tá Nguyễn Văn A",
    email: "admin@squadron375.mil",
    role: "admin",
    department: "Sư đoàn Phòng không 375",
    rank: "Trung tá",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Đại úy Trần Văn B",
    email: "commander@squadron375.mil",
    role: "commander",
    department: "Phòng Tác chiến",
    rank: "Đại úy",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Phòng Tác chiến",
    code: "OPS",
    commander: "Đại úy Trần Văn B",
    description: "Quản lý tác chiến và chiến lược",
  },
  {
    id: "2",
    name: "Phòng Hành chính",
    code: "ADM",
    commander: "Thiếu úy Lê Văn C",
    description: "Quản lý hành chính và nhân sự",
  },
  {
    id: "3",
    name: "Phòng Kỹ thuật",
    code: "TECH",
    commander: "Thiếu úy Phạm Văn D",
    description: "Quản lý thiết bị và kỹ thuật",
  },
]

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Kiểm tra thiết bị",
    description: "Kiểm tra toàn bộ thiết bị phòng không",
    assignedTo: "2",
    department: "1",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: "high",
    status: "in-progress",
    createdBy: "1",
  },
]

export const mockSchedule: WorkSchedule[] = [
  {
    id: "1",
    date: new Date(),
    title: "Hội họp quân sự hàng tuần",
    description: "Hội họp báo cáo tình hình",
    department: "1",
    time: "09:00 - 11:00",
    location: "Phòng họp chính",
  },
]

export const mockRecordTree: RecordNode[] = [
  {
    id: "root-admin",
    name: "Hành chính",
    type: "folder",
    children: [
      {
        id: "rec-1",
        name: "Sổ nhân sự",
        type: "file",
        parent: "root-admin",
        category: "Hành chính",
        date: new Date("2024-11-10"),
        department: "Phòng Hành chính",
      },
      {
        id: "rec-2",
        name: "Sổ lương thưởng",
        type: "file",
        parent: "root-admin",
        category: "Hành chính",
        date: new Date("2024-11-08"),
        department: "Phòng Hành chính",
      },
      {
        id: "folder-1",
        name: "Hợp đồng",
        type: "folder",
        parent: "root-admin",
        children: [
          {
            id: "rec-3",
            name: "Hợp đồng năm 2024",
            type: "file",
            parent: "folder-1",
            category: "Hành chính",
            date: new Date("2024-01-01"),
            department: "Phòng Hành chính",
          },
          {
            id: "rec-4",
            name: "Hợp đồng năm 2025",
            type: "file",
            parent: "folder-1",
            category: "Hành chính",
            date: new Date("2024-11-01"),
            department: "Phòng Hành chính",
          },
        ],
      },
    ],
  },
  {
    id: "root-tech",
    name: "Kỹ thuật",
    type: "folder",
    children: [
      {
        id: "rec-5",
        name: "Sổ kiểm tra thiết bị tháng 11",
        type: "file",
        parent: "root-tech",
        category: "Kỹ thuật",
        date: new Date("2024-11-12"),
        department: "Phòng Kỹ thuật",
      },
      {
        id: "folder-2",
        name: "Bảo trì",
        type: "folder",
        parent: "root-tech",
        children: [
          {
            id: "rec-6",
            name: "Sổ bảo trì máy chủ",
            type: "file",
            parent: "folder-2",
            category: "Kỹ thuật",
            date: new Date("2024-11-05"),
            department: "Phòng Kỹ thuật",
          },
          {
            id: "rec-7",
            name: "Sổ bảo trì hệ thống điện",
            type: "file",
            parent: "folder-2",
            category: "Kỹ thuật",
            date: new Date("2024-10-28"),
            department: "Phòng Kỹ thuật",
          },
        ],
      },
    ],
  },
  {
    id: "root-ops",
    name: "Tác chiến",
    type: "folder",
    children: [
      {
        id: "rec-8",
        name: "Sổ lệnh tác chiến",
        type: "file",
        parent: "root-ops",
        category: "Tác chiến",
        date: new Date("2024-11-11"),
        department: "Phòng Tác chiến",
      },
      {
        id: "folder-3",
        name: "Báo cáo hàng tháng",
        type: "folder",
        parent: "root-ops",
        children: [
          {
            id: "rec-9",
            name: "Báo cáo tháng 10",
            type: "file",
            parent: "folder-3",
            category: "Tác chiến",
            date: new Date("2024-10-31"),
            department: "Phòng Tác chiến",
          },
          {
            id: "rec-10",
            name: "Báo cáo tháng 11",
            type: "file",
            parent: "folder-3",
            category: "Tác chiến",
            date: new Date("2024-11-12"),
            department: "Phòng Tác chiến",
          },
        ],
      },
    ],
  },
]
