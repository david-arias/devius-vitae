'use client'

interface Props {
  id: string
  label: string
  onDelete: (id: string) => Promise<void>
}

export default function DeleteButton({ id, label, onDelete }: Props) {
  const handleClick = async () => {
    if (!confirm(`¿Eliminar "${label}"? Esta acción no se puede deshacer.`)) return
    await onDelete(id)
    // revalidatePath is called inside onDelete → page re-renders via router refresh
    window.location.reload()
  }

  return (
    <button onClick={handleClick}
      className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors">
      <span className="material-symbols-outlined text-[18px]">delete</span>
    </button>
  )
}
