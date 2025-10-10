"use client"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import type { ColumnCrm } from "@/types"
import { colorOptions } from "@/components/crm/data"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils" // opcional: helper de classe
import { columnSchema } from "@/schemas/column"
import { submitColumn } from "@/app/actions/colunmsCrm"

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

type FormData = z.infer<typeof columnSchema>

export function NewColumnDialog({
  onCreate,
  open,
  onOpenChange,
}: {
  onCreate: (col: ColumnCrm) => void // recebe já com id
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(columnSchema),
    defaultValues: { name: "", value: "", description: "", color: "bg-blue-500" },
    mode: "onChange",
  })

  const [valueManuallyEdited, setValueManuallyEdited] = useState(false)

  // gera slug automaticamente a partir do name, SE o usuário ainda não editou manualmente o value
  const name = watch("name")
  useEffect(() => {
    if (!valueManuallyEdited) {
      setValue("value", slugify(name || ""), { shouldValidate: true })
    }
  }, [name, valueManuallyEdited, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const res = await submitColumn({
      name: data.name,
      value: data.value,
      description: data.description || undefined,
      color: data.color,
    })

    if (!res.ok) {
      // aqui você pode usar um toast
      console.error(res.error)
      return
    }

    // monta objeto para o estado local do board
    onCreate({
      _id: res._id,
      name: data.name,
      value: data.value,
      description: data.description || "",
      color: data.color,
      createdAt: new Date()
    })

    // reset e fechar
    reset({ name: "", value: "", description: "", color: "bg-blue-500" })
    setValueManuallyEdited(false)
    onOpenChange(false)
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!isSubmitting) onOpenChange(v)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isSubmitting} className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Nova Coluna
        </Button>
      </DialogTrigger>

      <DialogContent onKeyDown={(e) => e.key === "Enter" && onSubmit()}>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Coluna</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 py-2" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="columnName">Nome da Coluna *</Label>
            <Input id="columnName" placeholder="Ex: Negociação" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="columnValue">Valor (slug)</Label>
            <Input
              id="columnValue"
              placeholder="negociacao"
              {...register("value")}
              onChange={(e) => {
                setValue("value", slugify(e.target.value), { shouldValidate: true })
                setValueManuallyEdited(true)
              }}
            />
            {errors.value && <p className="text-sm text-destructive">{errors.value.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="columnDesc">Descrição</Label>
            <Input
              id="columnDesc"
              placeholder="Texto opcional para identificar a coluna"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setValue("color", c.value, { shouldValidate: true })}
                  className={cn(
                    "h-10 rounded-md",
                    c.value,
                    watch("color") === c.value && "ring-2 ring-ring ring-offset-2"
                  )}
                  title={c.label}
                  aria-label={`Selecionar cor ${c.label}`}
                />
              ))}
            </div>
            {errors.color && <p className="text-sm text-destructive">{errors.color.message}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button
            className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => {
                if (isSubmitting) return
                reset({ name: "", value: "", description: "", color: "bg-blue-500" })
                setValueManuallyEdited(false)
                onOpenChange(false)
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !isValid} className="cursor-pointer">
              {isSubmitting ? "Salvando..." : "Adicionar Coluna"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
