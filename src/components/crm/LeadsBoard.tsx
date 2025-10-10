"use client"
import { useEffect, useMemo, useState, useTransition } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ColumnCrm, Lead } from "@/types"
import { NewLeadDialog } from "./NewLeadDialog"
import { NewColumnDialog } from "./NewColumnDialog"
import { BoardColumn } from "./BoardColumn"
import { listLeads } from "@/app/actions/getLeads"
import { getColumns } from "@/app/actions/colunmsCrm"

export default function LeadsBoard() {
  const [columns, setColumns] = useState<ColumnCrm[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // dialogs
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false)

  // loading
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const [resLeads, resCols] = await Promise.all([listLeads(), getColumns()])
      if (resCols?.ok) {
        // _id -> string
        setColumns(resCols.data.map((c: any) => ({ ...c, _id: String(c._id) })))
        console.log(
          "[LeadsBoard.tsx:40]",
          resCols.data.map((c: any) => ({ ...c, _id: String(c._id) }))
        )
      }
      if (resLeads?.ok) {
        // _id e columnId -> string
        setLeads(
          resLeads.data.items.map((l: any) => ({
            ...l,
            _id: String(l._id),
            columnId: l.columnId ? String(l.columnId) : "", // importante!
          }))
        )
        console.log(
          "[LeadsBoard.tsx:51]",
          resLeads.data.items.map((l: any) => ({
            ...l,
            _id: String(l._id),
            columnId: l.columnId ? String(l.columnId) : "", // importante!
          }))
        )
      }
    })
  }, [])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const activeLead = useMemo(
    () => (activeId ? leads.find((l) => l._id === activeId) : null),
    [activeId, leads]
  )

  const leadsByColumn = useMemo(
    () =>
      columns.reduce<Record<string, Lead[]>>((acc, col) => {
        acc[col._id] = leads.filter((l) => l.columnId === col._id)
        return acc
      }, {}),
    [columns, leads]
  )

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id))
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    setActiveId(null)
    if (!over) return

    const leadId = String(active.id)
    let target = String(over.id)

    // se soltar em cima de outro lead, pegamos a coluna dele
    const overLead = leads.find((l) => l._id === target)
    if (overLead) target = overLead.columnId ?? ""

    const current = leads.find((l) => l._id === leadId)
    if (!current || current.columnId === target) return

    setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, columnId: target } : l)))

    const moved = leads.find((l) => l._id === leadId)
    const col = columns.find((c) => c._id === target)
    toast.success("Lead movido", { description: `${moved?.name} movido para ${col?.name}` })
  }

  function handleCreateLead(lead: Omit<Lead, "_id" | "createdAt">, columnId: string) {
    const newLead: Lead = {
      ...lead,
      columnId,
    } as Lead

    setLeads((prev) => [...prev, newLead])
    toast.success("Lead adicionado", { description: "Lead criado com sucesso" })
  }

  function handleCreateColumn(col: ColumnCrm) {
    setColumns((prev) => [...prev, col])
    toast.success("Coluna adicionada", {
      description: `Coluna "${col.name}" criada com sucesso`,
    })
  }

  function handleDeleteColumn(columnId: string) {
    const hasLeads = leads.some((l) => l.columnId === columnId)
    if (hasLeads)
      return toast.error("Erro", { description: "Não é possível excluir uma coluna com leads" })
    setColumns((prev) => prev.filter((c) => c._id !== columnId))
    toast.success("Coluna removida", { description: "Coluna removida com sucesso" })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Gestão de Leads</h1>
            <p className="text-muted-foreground mt-2">
              Arraste os cards para mudar o status dos leads
            </p>
          </div>
          <div className="flex gap-3">
            <NewLeadDialog
              columns={columns}
              onCreate={handleCreateLead}
              open={isAddLeadOpen}
              onOpenChange={setIsAddLeadOpen}
            />
            <NewColumnDialog
              onCreate={handleCreateColumn}
              open={isAddColumnOpen}
              onOpenChange={setIsAddColumnOpen}
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {pending ? (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-60">
                <div className="bg-card rounded-lg shadow-sm border border-gray-300">
                  <div className="p-4 rounded-t-lg">
                    <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-20 bg-muted animate-pulse rounded" />
                    <div className="h-20 bg-muted animate-pulse rounded" />
                    <div className="h-20 bg-muted animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-6 overflow-x-auto pb-4">
              {columns.map((col, index) => (
                <BoardColumn
                  key={col._id || index}
                  column={col}
                  leads={leadsByColumn[col._id] || []}
                  onDelete={handleDeleteColumn}
                />
              ))}
            </div>

            <DragOverlay>
              {activeLead ? (
                <Card className="w-50 cursor-grabbing rotate-3 shadow-lg">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base font-semibold">{activeLead.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {activeLead.company?.razao_social || ""}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-lg font-bold text-primary">
                      R$ {activeLead.finance?.servico ?? 0}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  )
}
