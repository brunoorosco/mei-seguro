"use client"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ColumnLane } from "./ColumnLane"
import { LeadCard } from "./LeadCard"
import { ColumnCrm, Lead } from "@/types"
import { deleteColumn } from "@/app/actions/colunmsCrm"

export function BoardColumn({
  column,
  leads,
  onDelete,
}: {
  column: ColumnCrm
  leads: Lead[]
  onDelete: (columnId: string) => void
}) {
  const itemIds = leads.map((l) => l._id)

  const handleDeleteColumn = async (columnId: string) => {
    const res = await deleteColumn(columnId)
    onDelete(columnId)
  }

  return (
    <div className="flex-shrink-0 w-60">
      <div className="bg-card rounded-lg shadow-sm border-gray-300 border">
        <div
          style={{ background: column.color }}
          className={`${column.color} text-white p-4 rounded-t-lg`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{column.name}</h3>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {itemIds.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20 cursor-pointer"
              onClick={() => handleDeleteColumn(column._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <SortableContext id={column._id} items={itemIds} strategy={verticalListSortingStrategy}>
          <ColumnLane id={column._id}>
            {leads.map((lead, index) => (
              <LeadCard key={index} lead={lead} />
            ))}
          </ColumnLane>
        </SortableContext>
      </div>
    </div>
  )
}
