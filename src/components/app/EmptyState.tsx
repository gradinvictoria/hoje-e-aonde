type Props = {
  onClear: () => void
}

export function EmptyState({ onClear }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#e6ddd1] bg-white px-8 py-20 text-center">
      <div className="flex h-22 w-22 items-center justify-center rounded-full bg-[#f7f2ec] text-3xl" style={{ height: 88, width: 88 }}>
        🔍
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink">Nenhum estabelecimento encontrado</h3>
      <p className="max-w-md text-[15px] text-muted">
        Não encontramos resultados para os filtros selecionados. Tente ajustar a localização, categorias ou tags.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="rounded-full border-2 border-orange px-7 py-3 text-sm font-bold text-orange"
      >
        Limpar filtros
      </button>
    </div>
  )
}
