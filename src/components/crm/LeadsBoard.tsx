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
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ColumnCrm, Lead } from "@/types"
import { NewLeadDialog } from "./NewLeadDialog"
import { NewColumnDialog } from "./NewColumnDialog"
import { BoardColumn } from "./BoardColumn"
import { listLeads, moveLeadToColumn } from "@/app/actions/leads"
import { getColumns, updateColumnsOrder } from "@/app/actions/colunmsCrm"
import { SortableBoardColumn } from "./SortableContext"

function InsertBetweenButton({
  index,
  onInsert,
}: {
  index: number
  onInsert: (i: number) => void
}) {
  return (
    <button
      onClick={() => onInsert(index)}
      className="self-stretch w-8 shrink-0 rounded-lg border border-dashed text-muted-foreground hover:text-primary hover:border-primary/50"
      title="Adicionar coluna aqui"
    >
      +
    </button>
  )
}

export default function LeadsBoard() {
  const [columns, setColumns] = useState<ColumnCrm[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // dialogs
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false)
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null) // 👈 para inserir entre colunas

  // loading
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const [resLeads, resCols] = await Promise.all([listLeads(), getColumns()])
      if (resCols?.ok) {
        // _id -> string
        setColumns(resCols.data.map((c: any) => ({ ...c, _id: String(c._id) })))
        // console.log("[LeadsBoard.tsx:cols]", resCols.data);
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
        // console.log("[LeadsBoard.tsx:leads]", resLeads.data.items);
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
    const type = e.active.data.current?.type
    if (type === "lead") setActiveId(String(e.active.id))
  }

  async function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    setActiveId(null)
    if (!over) return

    const activeType = active.data.current?.type
    const overType = over.data.current?.type

    if (activeType === "column" && overType === "column") {
      const from = columns.findIndex((c) => c._id === String(active.id))
      const to = columns.findIndex((c) => c._id === String(over.id))
      if (from !== -1 && to !== -1 && from !== to) {
        // snapshot para possível rollback
        const prev = columns
        const next = arrayMove(prev, from, to)

        // ✅ update otimista na UI
        setColumns(next)

        // payload com a nova ordem
        const payload = next.map((c, index) => ({ id: c._id, position: index }))

        try {
          await updateColumnsOrder(payload)
          // opcional:
          toast.success("Ordem salva!")
        } catch (err) {
          // ⛑️ rollback se falhar
          setColumns(prev)
          // opcional:
          toast.error("Não foi possível salvar a ordem das colunas")
        }
      }
      return
    }

    // 2) Mover lead entre colunas
    // 2) Mover lead entre colunas
    if (activeType === "lead") {
      const leadId = String(active.id)
      let target = String(over.id)

      // se soltou em cima de outro lead, pegue a coluna desse lead
      const overLead = leads.find((l) => l._id === target)
      if (overLead) target = overLead.columnId ?? ""

      const current = leads.find((l) => l._id === leadId)
      if (!current || current.columnId === target) return

      // (opcional) se você usa "order" por lead:
      const targetLeads = leads.filter((l) => l.columnId === target)
      const nextOrder = targetLeads.length // coloca no fim da coluna destino

      // snapshot para rollback
      const prev = leads

      // ✅ update otimista
      setLeads((prevLeads) =>
        prevLeads.map((l) =>
          l._id === leadId
            ? {
                ...l,
                columnId: target,
                ...(typeof (l as any).order === "number" ? { order: nextOrder } : {}),
              }
            : l
        )
      )

      try {
        // chame seu server action para persistir:
        // - se você não usa order, passe só (leadId, target)
        // - se usa order, passe {leadId, columnId, order}
        await moveLeadToColumn({
          id: leadId,
          columnId: target,
          ...(typeof (current as any).order === "number" ? { order: nextOrder } : {}),
        })

        const moved = prev.find((l) => l._id === leadId)
        const col = columns.find((c) => c._id === target)
        toast.success("Lead movido", { description: `${moved?.name} movido para ${col?.name}` })
      } catch (err) {
        // ⛑️ rollback
        setLeads(prev)
        toast.error("Não foi possível salvar a movimentação do lead")
      }
      return
    }
  }

  function handleCreateLead(lead: Omit<Lead, "_id" | "createdAt">, columnId: string) {
    const newLead: Lead = {
      ...lead,
      columnId,
    } as Lead

    setLeads((prev) => [...prev, newLead])
    toast.success("Lead adicionado", { description: "Lead criado com sucesso" })
  }

  // abre o dialog de coluna já com índice de inserção
  function handleOpenNewColumnAt(idx: number) {
    setInsertionIndex(idx)
    setIsAddColumnOpen(true)
  }

  function handleCreateColumn(col: ColumnCrm) {
    setColumns((prev) => {
      if (insertionIndex == null) return [...prev, col] // sem posição => ao fim
      const copy = [...prev]
      copy.splice(insertionIndex, 0, col) // insere no meio
      return copy
    })
    setInsertionIndex(null)
    toast.success("Coluna adicionada", {
      description: `Coluna "${col.name}" criada com sucesso`,
    })
  }

  function handleDeleteColumn(columnId: string) {
    const hasLeads = leads.some((l) => l.columnId === columnId)
    if (hasLeads)
      return toast.error("Erro", {
        description: "Não é possível excluir uma coluna com leads",
      })
    setColumns((prev) => prev.filter((c) => c._id !== columnId))
    toast.success("Coluna removida", {
      description: "Coluna removida com sucesso",
    })
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
              onOpenChange={(open) => {
                if (!open) setInsertionIndex(null)
                setIsAddColumnOpen(open)
              }}
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
            <SortableContext
              items={columns.map((c) => c._id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-3 overflow-x-auto pb-4 items-stretch">
                {columns.map((col, idx) => (
                  <div key={col._id} className="flex items-stretch">
                    {/* (opcional) botão de inserir no meio
                    {idx === 0 ? null : (
                      <InsertBetweenButton index={idx} onInsert={handleOpenNewColumnAt} />
                    )} */}

                    <SortableBoardColumn column={col}>
                      {(bind) => (
                        <BoardColumn
                          column={col}
                          leads={leadsByColumn[col._id] || []}
                          onDelete={handleDeleteColumn}
                          columnHandleProps={bind} // 👈 handle recebe listeners/attributes
                        />
                      )}
                    </SortableBoardColumn>
                  </div>
                ))}
                {/* <InsertBetweenButton index={columns.length} onInsert={handleOpenNewColumnAt} /> */}
              </div>
            </SortableContext>
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
