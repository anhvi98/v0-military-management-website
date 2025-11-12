"use client"

import { mockSchedule } from "@/lib/mock-data"
import { MapPin, Clock } from "lucide-react"

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Lịch công tác</h1>

      <div className="space-y-4">
        {mockSchedule.map((event) => (
          <div key={event.id} className="military-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-primary">{event.title}</h3>
              <span className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-sm">
                {event.date.toLocaleDateString("vi-VN")}
              </span>
            </div>

            <p className="text-muted-foreground mb-4">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-primary" />
                <span className="text-foreground">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-primary" />
                <span className="text-foreground">{event.location}</span>
              </div>
              <div className="text-sm text-muted-foreground">Phòng ban: {event.department}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
