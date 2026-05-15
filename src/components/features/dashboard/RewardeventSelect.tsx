import { useRef, useEffect } from "react";
import { Check, ChevronDown, DollarSign } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandList, CommandItem, CommandShortcut } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
    toggleEventDrop,
    closeEventDrop,
    selectEventOption,
    setSalesVal,
    setPostsX,
    setPostsY,
    saveEventOption,
    clearEventOption,
    type EventKey,
} from "@/store/rewardSlice";
import { EVENT_OPTIONS } from "@/constants/rewardOptions";


export function RewardEventSelect() {
    const dispatch = useAppDispatch();
    const {
        eventKey,
        eventLabel,
        eventSaved,
        eventDropOpen,
        salesVal,
        postsX,
        postsY,
    } = useAppSelector((s) => s.reward);

    const salesInputRef = useRef<HTMLInputElement>(null);
    const postsXInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (eventKey === "sales" && !eventSaved) {
            setTimeout(() => salesInputRef.current?.focus(), 50);
        }
        if (eventKey === "posts" && !eventSaved) {
            setTimeout(() => postsXInputRef.current?.focus(), 50);
        }
    }, [eventKey, eventSaved]);

    const POST_INTERVAL_OPTIONS = [
        "14 days",
        "1 month",
        "2 months",
        "3 months",
        "6 months",
        "1 year",
    ] as const;

    const salesSaveDisabled = !salesVal || Number(salesVal) <= 0;
    const postsSaveDisabled = !postsX || !postsY || Number(postsX) <= 0;

    const triggerLabel = !eventKey
        ? null
        : eventSaved
            ? eventLabel
            : EVENT_OPTIONS.find((o) => o.key === eventKey)?.label ?? null;

    // Show inline inputs + footer buttons only when an option needing input is selected but not saved
    const showSalesInput = eventKey === "sales" && !eventSaved;
    const showPostsInput = eventKey === "posts" && !eventSaved;
    const showFooter = showSalesInput || showPostsInput;

    const footerSaveDisabled = showSalesInput ? salesSaveDisabled : postsSaveDisabled;

    return (
        <Popover
            open={eventDropOpen}
            onOpenChange={(open) => {
                if (!open) dispatch(closeEventDrop());
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => dispatch(toggleEventDrop())}
                    className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border transition-colors font-normal",
                        "bg-background hover:bg-accent/30",
                        eventDropOpen ? "border-primary" : "border-border",
                        triggerLabel ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    <span>{triggerLabel ?? "Select an event"}</span>
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 transition-transform shrink-0",
                            eventDropOpen && "rotate-180"
                        )}
                    />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-89.5 p-0 border-primary mt-0 shadow-md"
                align="center"
                sideOffset={0}
            >
                <Command>
                    <CommandList className="max-h-none">
                        {EVENT_OPTIONS.map((opt) => (
                            <div key={opt.key}>
                                <CommandItem
                                    value={opt.key ?? ""}
                                    onSelect={() => {
                                        if (eventSaved && eventKey === opt.key) {
                                            dispatch(closeEventDrop());
                                            return;
                                        }
                                        dispatch(selectEventOption(opt.key));
                                    }}
                                    className={cn(
                                        "px-3 py-2 cursor-pointer text-sm mb-1",
                                        "data-[selected=true]:bg-accent hover:text-primary",
                                        eventKey === opt.key && "text-primary bg-accent",
                                    )}
                                >
                                    <p>{opt.label}</p>
                                    <CommandShortcut>
                                        {eventKey === opt.key && (
                                            <Check className="size-4 text-primary" />
                                        )}
                                    </CommandShortcut>
                                </CommandItem>

                                {opt.key === "sales" && showSalesInput && (
                                    <div className="bg-muted/40 px-3 pb-3 pt-1">
                                        <div className="relative">
                                            <div className="flex items-center justify-center h-7.5 w-fit -translate-y-1/2 absolute top-1/2 left-0 px-2 border-r rounded-l border-gray-200">
                                                <DollarSign className="size-3.5 text-muted-foreground" />
                                            </div>
                                            <Input
                                                ref={salesInputRef}
                                                type="number"
                                                placeholder="e.g. 100"
                                                value={salesVal}
                                                onChange={(e) => dispatch(setSalesVal(e.target.value))}
                                                className="h-8 pl-10 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>
                                )}

                                {opt.key === "posts" && showPostsInput && (
                                    <div className="bg-muted/40 px-3 pb-3 pt-1">
                                        <div className="flex gap-2 w-full">
                                            <Input
                                                ref={postsXInputRef}
                                                type="number"
                                                placeholder="X posts"
                                                value={postsX}
                                                onChange={(e) => dispatch(setPostsX(e.target.value))}
                                                className="h-8 w-1/2 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                            />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild className="w-1/2">
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "h-8 justify-between px-3 text-sm",
                                                            !postsY && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {postsY || "Select duration"}
                                                        <ChevronDown className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="center" className="w-40.5">
                                                    {POST_INTERVAL_OPTIONS.map((option) => (
                                                        <DropdownMenuItem
                                                            key={option}
                                                            className="cursor-pointer"
                                                            onSelect={() => dispatch(setPostsY(option))}
                                                        >
                                                            {option}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CommandList>

                    {/* Shared Footer */}
                    {showFooter && (
                        <div className="flex gap-2 p-3">
                            <Button
                                variant="outline"
                                size="default"
                                className="flex-1 text-xs"
                                onClick={() => dispatch(clearEventOption())}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="default"
                                className="flex-1 text-xs bg-primary hover:bg-primary/90 text-white"
                                disabled={footerSaveDisabled}
                                onClick={() => dispatch(saveEventOption())}
                            >
                                Save
                            </Button>
                        </div>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}