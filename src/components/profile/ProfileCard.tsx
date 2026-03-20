import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

export function ProfileCard() {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex flex-col items-center pt-8 text-center">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="size-24 border-4 border-[var(--primary-light)]">
            <AvatarImage src="/avatars/alex.jpg" alt="Alex Rivera" />
            <AvatarFallback className="bg-[var(--primary)] text-2xl text-white">
              AR
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[var(--secondary)]">
            <span className="text-xs font-bold text-white">4</span>
          </div>
        </div>

        {/* Name */}
        <h2 className="mt-4 text-xl font-semibold text-[var(--foreground)]">
          Alex Rivera
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          Member since Oct 2023
        </p>

        {/* Level Badge */}
        <Badge className="mt-3 bg-[var(--secondary)] text-white">
          LEVEL 4: RESILIENT
        </Badge>

        {/* Stats */}
        <div className="mt-6 grid w-full grid-cols-3 gap-4 border-t border-[var(--border)] pt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--foreground)]">142</p>
            <p className="text-xs text-[var(--muted-foreground)]">DAYS</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--foreground)]">28</p>
            <p className="text-xs text-[var(--muted-foreground)]">MILESTONES</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[var(--foreground)]">8.4</p>
            <p className="text-xs text-[var(--muted-foreground)]">HEALTH SCORE</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
