"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Mail, Phone } from "lucide-react"
import { Lead } from "@/types"

export function LeadCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead._id,
  })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} className="w-full" {...attributes} {...listeners}>
      <Card
        className={`mb-2 cursor-move transition-shadow py-0 border-gray-400 ${
          isDragging ? "opacity-50 ring-2 ring-primary/50" : "hover:shadow-md"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <CardTitle className="text-base font-semibold line-clamp-1">{lead.name}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {lead.company?.razao_social || "Nome da Empresa"}
              </p>
            </div>
            <div className="cursor-grab active:cursor-grabbing">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="text-xs line-clamp-1">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span className="text-xs">{lead.phone}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-primary">R$ {lead.finance?.servico || "-"}</span>
          </div>

          {lead.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {lead.tags.map((tag) => (
                <Badge key={tag.name} variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
