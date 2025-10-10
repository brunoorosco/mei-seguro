"use client"
import { useDroppable } from "@dnd-kit/core"

export function ColumnLane({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={[
        "p-4 min-h-[200px] transition-colors",
        "border-2 border-dashed rounded-b-lg",
        isOver ? "border-primary/60 bg-primary/5" : "border-transparent",
      ].join(" ")}
    >
      {children}
    </div>
  )
}
