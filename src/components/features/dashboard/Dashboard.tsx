import { Button } from "../../ui/button"

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
    return (
        <div className="w-full h-full max-w-5xl py-9">
            <div className="flex flex-col items-start justify-normal h-fit gap-10 relative">
                <img
                    src="./dashboard/bg-grid.png"
                    alt="Dashboard Image"
                    className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl border"
                />
                <div className="absolute top-15 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 text-center">
                    <div className="space-y-2">
                        <p className="text-xl sm:text-2xl md:text-[1.75rem] font-semibold text-heading-color">
                            Gamify your Campaign
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Enable gamification to start crafting <br /> your custom reward system.
                        </p>
                    </div>
                    <Button variant="default" className="px-8 sm:px-20 w-full sm:w-auto max-w-xs">
                        Enable Gamification
                    </Button>
                </div>

                <div className="justify-items-center -mt-28 grid gap-6 md:grid-cols-3 w-full">
                    {featureCards.map((card) => {
                        return (
                            <div
                                key={card.title}
                                className="relative h-55 w-73 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-secondary text-center bg-white/95 p-6 shadow-[0px_15px_42px_-16px_rgba(0,0,0,0.1)]"
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
                                <div className="space-y-2">
                                    <p className="text-base font-medium z-10">
                                        {card.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground z-10">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Dashboard