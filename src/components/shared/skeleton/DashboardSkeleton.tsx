import { Skeleton } from "@/components/ui/skeleton"

const FEATURE_CARD_COUNT = 3

function FeatureCardSkeleton() {
    return (
        <div
            className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-secondary bg-white/95 p-6 shadow-[0px_15px_42px_-16px_rgba(0,0,0,0.1)] min-h-52"
        >
            <Skeleton className="absolute inset-x-0 top-0 h-24 w-full rounded-none" />
            <Skeleton className="size-16.5 shrink-0 rounded-xl z-10" />
            <div className="flex w-full flex-col items-center gap-2 z-10">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full max-w-56" />
                <Skeleton className="h-4 w-full max-w-44" />
            </div>
        </div>
    )
}

const DashboardSkeleton = () => {
    return (
        <div
            className="w-full h-full max-w-5xl py-6 sm:py-9 px-4 sm:px-0"
            aria-busy="true"
            aria-label="Loading dashboard"
        >
            <div className="flex flex-col items-start justify-normal h-fit gap-6 sm:gap-10">
                {/* Hero */}
                <div className="relative w-full">
                    <Skeleton className="hidden sm:block w-full h-36 sm:h-64 md:h-80 rounded-2xl border" />

                    <div className="flex flex-col items-center justify-center gap-4 px-4 text-center py-6 sm:py-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-full">
                        <div className="flex w-full flex-col items-center gap-2">
                            <Skeleton className="h-7 w-56 sm:h-8 sm:w-64 md:h-9 md:w-72" />
                            <Skeleton className="h-4 w-full max-w-xs sm:max-w-sm" />
                            <Skeleton className="h-4 w-48 sm:hidden" />
                        </div>
                        <Skeleton className="h-10 w-full max-w-xs rounded-md" />
                    </div>
                </div>

                {/* Feature cards */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full sm:-mt-20 md:-mt-28">
                    {Array.from({ length: FEATURE_CARD_COUNT }).map((_, i) => (
                        <FeatureCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardSkeleton
