import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-card border border-border rounded-xl p-5 flex gap-4', className)}>
      <div className="w-16 h-16 rounded-lg bg-muted animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
      </div>
    </div>
  )
}

export function SkeletonStats({ className }: SkeletonProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-xl p-5 text-center animate-pulse">
          <div className="w-8 h-8 bg-muted rounded-full mx-auto mb-3" />
          <div className="h-6 bg-muted rounded w-12 mx-auto mb-2" />
          <div className="h-4 bg-muted rounded w-16 mx-auto" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonHero({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-2xl bg-muted p-8 md:p-12 animate-pulse', className)}>
      <div className="w-20 h-20 rounded-full bg-card/50 mb-6" />
      <div className="h-8 bg-card/50 rounded w-2/3 mb-3" />
      <div className="h-5 bg-card/50 rounded w-1/2 mb-6" />
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-card/50" />
        ))}
      </div>
    </div>
  )
}
