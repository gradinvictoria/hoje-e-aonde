import { useState } from 'react'
import type { PlacesMeta } from '../../lib/placesApi'

export type FiltersState = {
  q: string
  categories: string[]
  tags: string[]
  state: string
  city: string
  neighborhood: string
  minRating: number | null
  priceMin: number
  priceMax: number
  openNow: boolean | null
}

export const EMPTY_FILTERS: FiltersState = {
  q: '',
  categories: [],
  tags: [],
  state: '',
  city: '',
  neighborhood: '',
  minRating: null,
  priceMin: 0,
  priceMax: 250,
  openNow: null,
}

type Props = {
  meta: PlacesMeta
  filters: FiltersState
  onChange: (patch: Partial<FiltersState>) => void
  onClear: () => void
  activeCount: number
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function CheckboxList({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: { name: string; count: number }[]
  selected: string[]
  onToggle: (name: string) => void
}) {
  const [search, setSearch] = useState('')
  const filtered = options.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs font-bold text-ink">{title}</p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Buscar ${title.toLowerCase()}...`}
        className="rounded-[10px] border border-[#e6ddd1] px-3 py-2 text-xs placeholder:text-muted-light focus:border-orange focus:outline-none"
      />
      <div className="flex max-h-44 flex-col gap-2 overflow-y-auto pr-1">
        {filtered.map((opt) => (
          <label key={opt.name} className="flex cursor-pointer items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={selected.includes(opt.name)}
                onChange={() => onToggle(opt.name)}
                className="h-[18px] w-[18px] accent-orange"
              />
              <span className={selected.includes(opt.name) ? 'font-bold text-ink' : 'text-muted'}>{opt.name}</span>
            </span>
            <span className="text-xs text-muted-light">{opt.count}</span>
          </label>
        ))}
        {filtered.length === 0 && <p className="text-xs text-muted-light">Nada encontrado.</p>}
      </div>
    </div>
  )
}

export function FilterSidebar({ meta, filters, onChange, onClear, activeCount }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink">Filtros</h2>
        <button type="button" onClick={onClear} className="text-xs font-bold text-orange">
          Limpar tudo
        </button>
      </div>
      <hr className="border-[#e6ddd1]" />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-ink">Faixa de preço</p>
        <input
          type="range"
          min={0}
          max={250}
          step={5}
          value={filters.priceMax}
          onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
          className="w-full accent-orange"
        />
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase text-muted-light">Mínimo</span>
            <input
              type="number"
              min={0}
              value={filters.priceMin}
              onChange={(e) => onChange({ priceMin: Number(e.target.value) })}
              className="w-full rounded-lg border border-[#e6ddd1] px-2.5 py-1.5 text-sm font-bold text-ink"
            />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase text-muted-light">Máximo</span>
            <input
              type="number"
              min={0}
              value={filters.priceMax}
              onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
              className="w-full rounded-lg border border-[#e6ddd1] px-2.5 py-1.5 text-sm font-bold text-ink"
            />
          </div>
        </div>
      </div>
      <hr className="border-[#e6ddd1]" />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-ink">Localização</p>
        <select
          value={filters.state}
          onChange={(e) => onChange({ state: e.target.value })}
          className="rounded-xl border border-[#e6ddd1] px-4 py-2.5 text-sm text-ink"
        >
          <option value="">Estado</option>
          {meta.states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
          className="rounded-xl border border-[#e6ddd1] px-4 py-2.5 text-sm text-ink"
        >
          <option value="">Cidade</option>
          {meta.cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filters.neighborhood}
          onChange={(e) => onChange({ neighborhood: e.target.value })}
          className="rounded-xl border border-[#e6ddd1] px-4 py-2.5 text-sm text-ink"
        >
          <option value="">Bairro</option>
          {meta.neighborhoods.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <hr className="border-[#e6ddd1]" />

      <CheckboxList
        title="Categorias"
        options={meta.categories}
        selected={filters.categories}
        onToggle={(name) => onChange({ categories: toggleInList(filters.categories, name) })}
      />
      <hr className="border-[#e6ddd1]" />

      <div className="flex flex-col gap-2.5">
        <p className="text-xs font-bold text-ink">Avaliação</p>
        {[4.5, 4, 3.5].map((rating) => (
          <label key={rating} className="flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === rating}
              onChange={() => onChange({ minRating: filters.minRating === rating ? null : rating })}
              className="h-[18px] w-[18px] accent-orange"
            />
            <span className="text-[#ffb100]">
              {'★'.repeat(Math.floor(rating))}
              <span className="text-[#e6ddd1]">{'★'.repeat(5 - Math.floor(rating))}</span>
            </span>
            <span className="text-sm text-ink">{rating.toFixed(1)} ou mais</span>
          </label>
        ))}
      </div>
      <hr className="border-[#e6ddd1]" />

      <div className="flex flex-col gap-2.5">
        <p className="text-xs font-bold text-ink">Aberto agora</p>
        <div className="flex items-center gap-6">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="openNow"
              checked={filters.openNow === true}
              onChange={() => onChange({ openNow: filters.openNow === true ? null : true })}
              className="h-[18px] w-[18px] accent-orange"
            />
            <span className="text-sm text-ink">Sim</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              name="openNow"
              checked={filters.openNow === false}
              onChange={() => onChange({ openNow: filters.openNow === false ? null : false })}
              className="h-[18px] w-[18px] accent-orange"
            />
            <span className="text-sm text-ink">Não</span>
          </label>
        </div>
      </div>
      <hr className="border-[#e6ddd1]" />

      <CheckboxList
        title="Tags"
        options={meta.tags}
        selected={filters.tags}
        onToggle={(name) => onChange({ tags: toggleInList(filters.tags, name) })}
      />

      {activeCount > 0 && (
        <p className="text-center text-xs text-muted-light">{activeCount} filtro(s) ativo(s)</p>
      )}
    </div>
  )
}
