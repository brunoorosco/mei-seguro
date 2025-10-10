"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone } from "lucide-react"
import type { Lead } from "@/types"

export function LeadCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead._id,
    data: { type: "lead" }, // importante para o onDragStart/onDragEnd
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full select-none"
    >
      <Card
        className={[
          "mb-2 transition-shadow border-gray-300",
          "cursor-grab active:cursor-grabbing",
          isDragging ? "opacity-50 ring-2 ring-primary/50" : "hover:shadow-md",
        ].join(" ")}
      >
        <CardContent className="px-4 pt-0 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-base font-semibold">{lead.name}</CardTitle>
              {/* ajuste aqui conforme sua estrutura (ex.: lead.company?.razao_social) */}
              {lead.company?.razao_social ? (
                <p className="text-sm text-muted-foreground line-clamp-1">{lead.company.razao_social}</p>
              ) : lead.company ? (
                <p className="text-sm text-muted-foreground line-clamp-1">{String(lead.company)}</p>
              ) : null}
            </div>
          </div>
          {lead.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span className="text-xs break-all line-clamp-1">{lead.email}</span>
            </div>
          )}

          {lead.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span className="text-xs">{lead.phone}</span>
            </div>
          )}

          {/* Valor/ficha financeira (ajuste conforme seu modelo) */}
          {typeof lead.finance?.servico === "number" && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-primary">
                R$ {lead.finance.servico}
              </span>
            </div>
          )}

          {/* Tags, se tiver */}
          {Array.isArray(lead.tags) && lead.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {(lead as any).tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
