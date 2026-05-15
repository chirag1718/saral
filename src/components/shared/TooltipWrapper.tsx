import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { ComponentProps, ReactNode } from "react"

type TooltipWrapperProps = {
    tooltip: ReactNode
    side?: ComponentProps<typeof TooltipContent>["side"]
    children: ReactNode
    className?: string
}

export function TooltipWrapper({ tooltip, side = "top", children, className }: TooltipWrapperProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild className={className}>
                <span className="inline-flex w-fit">
                    {children}
                </span>
            </TooltipTrigger>
            <TooltipContent side={side}>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}