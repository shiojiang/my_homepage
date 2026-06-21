import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

export default function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={cn(
          'p-2 rounded-lg border border-border hover:bg-accent transition-colors',
          page <= 1 && 'opacity-40 cursor-not-allowed',
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <span className="text-sm text-muted-foreground px-3">
        {page} / {totalPages}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(
          'p-2 rounded-lg border border-border hover:bg-accent transition-colors',
          page >= totalPages && 'opacity-40 cursor-not-allowed',
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
