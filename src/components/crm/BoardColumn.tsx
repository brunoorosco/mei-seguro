"use client"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, GripVertical } from "lucide-react"
import { ColumnLane } from "./ColumnLane"
import { LeadCard } from "./LeadCard"
import { ColumnCrm, Lead } from "@/types"
import { deleteColumn } from "@/app/actions/colunmsCrm"

export function BoardColumn({
  column,
  leads,
  onDelete,
  columnHandleProps, // { attributes, listeners, isDragging }
}: {
  column: ColumnCrm
  leads: Lead[]
  onDelete: (columnId: string) => void
  columnHandleProps?: { attributes: any; listeners: any; isDragging: boolean }
}) {
  const itemIds = leads.map((l) => l._id)

  const handleDeleteColumn = async (columnId: string) => {
    try {
      await deleteColumn(columnId)
      onDelete(columnId)
    } catch {}
  }

  const isTailwindBg = typeof column.color === "string" && column.color.startsWith("bg-")

  return (
    <div className="flex-shrink-0 w-60">
      <div className="bg-card rounded-lg shadow-sm border border-gray-300">
        {/* Header da coluna (toda a área é o "handle") */}
        <div
          className={`${isTailwindBg ? column.color : ""} text-white rounded-t-lg relative`}
          style={!isTailwindBg && column.color ? { background: column.color } : undefined}
        >
          {/* 👉 Aplique attributes/listeners AQUI para que só a header mova a coluna */}
          <div
            className="p-4 pr-14 flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
            {...(columnHandleProps?.attributes ?? {})}
            {...(columnHandleProps?.listeners ?? {})}
          >
            <h3 className="font-semibold truncate">{column.name}</h3>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {itemIds.length}
            </Badge>

        
          </div>

          {/* Grupo de ações fixo no canto; NÃO inicia drag */}
          <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => handleDeleteColumn(column._id)}
              onPointerDown={(e) => e.stopPropagation()}  // 👈 impede arrastar ao clicar
              title="Excluir coluna"
              aria-label="Excluir coluna"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Leads (sortable vertical) */}
        <SortableContext id={column._id} items={itemIds} strategy={verticalListSortingStrategy}>
          <ColumnLane id={column._id}>
            {leads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} />
            ))}
          </ColumnLane>
        </SortableContext>
      </div>
    </div>
  )
}
