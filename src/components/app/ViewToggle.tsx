type Props = {
  value: 'grid' | 'list'
  onChange: (value: 'grid' | 'list') => void
}

export function ViewToggle({ value, onChange }: Props) {
  return (
    <div className="flex overflow-hidden rounded-xl border border-[#e6ddd1] bg-white">
      <button
        type="button"
        aria-pressed={value === 'grid'}
        onClick={() => onChange('grid')}
        className={`flex h-10 w-11 items-center justify-center text-base ${value === 'grid' ? 'bg-ink text-white' : 'text-muted'}`}
      >
        ▦
      </button>
      <button
        type="button"
        aria-pressed={value === 'list'}
        onClick={() => onChange('list')}
        className={`flex h-10 w-11 items-center justify-center text-base ${value === 'list' ? 'bg-ink text-white' : 'text-muted'}`}
      >
        ≡
      </button>
    </div>
  )
}
