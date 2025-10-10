"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnCrm } from "@/types";

type ColumnHandleBind = {
  attributes: React.HTMLAttributes<any>;
  listeners: any;
  isDragging: boolean;
};

export function SortableBoardColumn({
  column,
  children,
}: {
  column: ColumnCrm;
  children: (bind: ColumnHandleBind) => React.ReactNode;
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { type: "column" }, // 👈 identifica como coluna
  });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className={`flex-shrink-0 ${isDragging ? "opacity-70" : ""}`}>
      {children({ attributes, listeners, isDragging })}
    </div>
  );
}
