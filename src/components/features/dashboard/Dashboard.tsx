import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import DashboardSkeleton from "@/components/shared/skeleton/DashboardSkeleton"
import { useAppDispatch } from "@/store/store"
import { openModal } from "@/store/rewardSlice"
import { RewardSystemModal } from "./RewardSystemModal"

const DASHBOARD_IMAGE_URLS = [
    "./dashboard/bg-grid.png",
    "./dashboard/card-bg-waves.png",
    "./dashboard/card-gift.svg",
    "./dashboard/card-crown.svg",
    "./dashboard/card-ticket-sale.svg",
] as const

function preloadImages(urls: readonly string[]): Promise<void> {
    return Promise.all(
        urls.map(
            (url) =>
                new Promise<void>((resolve) => {
                    const img = new Image()
                    img.onload = () => resolve()
                    img.onerror = () => resolve()
                    img.src = url
                })
        )
    ).then(() => undefined)
}

const featureCards = [
    {
        title: "Reward Your Ambassadors",
        description:
            "Boost campaign performance by setting up rewards for ambassadors",
        image: "./dashboard/card-gift.svg",
    },
    {
        title: "Set Milestones",
        description:
            "Set up custom goals for sales, posts, or time-based achievements",
        image: "./dashboard/card-crown.svg",
    },
    {
        title: "Customise Incentives",
        description:
            "Create custom incentives like flat fees, free products, or special commissions.",
        image: "./dashboard/card-ticket-sale.svg",
    },
]

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let cancelled = false
        void preloadImages(DASHBOARD_IMAGE_URLS).then(() => {
            if (!cancelled) setIsReady(true)
        })
        return () => {
            cancelled = true
        }
    }, [])

    if (!isReady) {
        return (
            <>
                <DashboardSkeleton />
                <RewardSystemModal />
            </>
        )
    }

    return (
        <div className="w-full h-full max-w-5xl py-6 sm:py-9 px-4 sm:px-0">
            <div className="flex flex-col items-start justify-normal h-fit gap-6 sm:gap-10">

                {/* Hero section — stacked on mobile, overlapping on md+ */}
                <div className="relative w-full">
                    <img
                        src="./dashboard/bg-grid.png"
                        alt="Dashboard Image"
                        className="w-full h-36 sm:h-64 md:h-80 object-cover rounded-2xl border hidden sm:block"
                    />

                    {/* Mobile: plain card layout (no absolute positioning) */}
                    <div className="flex flex-col items-center justify-center gap-4 px-4 text-center py-6 sm:py-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-full">
                        <div className="space-y-2">
                            <p className="text-xl sm:text-2xl md:text-[1.75rem] font-semibold text-heading-color">
                                Gamify your Campaign
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Enable gamification to start crafting{" "}
                                <br className="hidden sm:inline" />
                                your custom reward system.
                            </p>
                        </div>
                        <Button
                            variant="default"
                            className="px-8 sm:px-20 w-full max-w-xs"
                            onClick={() => dispatch(openModal())}
                        >
                            Enable Gamification
                        </Button>
                    </div>
                </div>

                {/* Feature cards */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full sm:-mt-20 md:-mt-28">
                    {featureCards.map((card) => (
                        <div
                            key={card.title}
                            className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-secondary text-center bg-white/95 p-6 shadow-[0px_15px_42px_-16px_rgba(0,0,0,0.1)] min-h-52"
                        >
                            <img
                                src="./dashboard/card-bg-waves.png"
                                alt=""
                                className="absolute w-full h-auto object-cover left-0 top-0"
                            />
                            <div className="flex size-16.5 items-center justify-center rounded-xl shrink-0 bg-[#FBCFFB] shadow-sm z-10">
                                <div className="size-12 flex items-center justify-center rounded-[0.547rem] bg-white">
                                    <img src={card.image} alt={card.title} className="size-6" />
                                </div>
                            </div>
                            <div className="space-y-2 z-10">
                                <p className="text-base font-medium">{card.title}</p>
                                <p className="text-sm text-muted-foreground">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <RewardSystemModal />
        </div>
    )
}

export default Dashboard