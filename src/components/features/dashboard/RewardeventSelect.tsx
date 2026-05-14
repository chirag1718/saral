// import { useRef, useEffect } from "react";
// import { Check, ChevronDown, DollarSign } from "lucide-react";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Command, CommandList, CommandItem, CommandShortcut } from "@/components/ui/command";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import {
//     toggleEventDrop,
//     closeEventDrop,
//     selectEventOption,
//     setSalesVal,
//     setPostsX,
//     setPostsY,
//     saveEventOption,
//     clearEventOption,
//     type EventKey,
// } from "@/store/rewardSlice";

// const EVENT_OPTIONS: { key: EventKey; label: string }[] = [
//     { key: "sales", label: "Cross $X in sales" },
//     { key: "posts", label: "Posts X times every Y period" },
//     { key: "onboard", label: "Is Onboarded" },
// ];

// export function RewardEventSelect() {
//     const dispatch = useAppDispatch();
//     const {
//         eventKey,
//         eventLabel,
//         eventSaved,
//         eventDropOpen,
//         salesVal,
//         postsX,
//         postsY,
//     } = useAppSelector((s) => s.reward);

//     const salesInputRef = useRef<HTMLInputElement>(null);
//     const postsXInputRef = useRef<HTMLInputElement>(null);

//     // Auto-focus inline input when option is selected
//     useEffect(() => {
//         if (eventKey === "sales" && !eventSaved) {
//             setTimeout(() => salesInputRef.current?.focus(), 50);
//         }
//         if (eventKey === "posts" && !eventSaved) {
//             setTimeout(() => postsXInputRef.current?.focus(), 50);
//         }
//     }, [eventKey, eventSaved]);

//     const salesSaveDisabled = !salesVal || Number(salesVal) <= 0;
//     const postsSaveDisabled = !postsX || !postsY || Number(postsX) <= 0;

//     return (
//         <Popover
//             open={eventDropOpen}
//             onOpenChange={(open) => {
//                 if (!open) dispatch(closeEventDrop());
//             }}
//         >
//             <PopoverTrigger asChild>
//                 <Button
//                     onClick={() => dispatch(toggleEventDrop())}
//                     className={cn(
//                         "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border transition-colors",
//                         "bg-background hover:bg-accent/30",
//                         eventDropOpen
//                             ? "border-primary"
//                             : "border-border",
//                         eventSaved ? "text-foreground" : "text-muted-foreground"
//                     )}
//                 >
//                     <span>{eventSaved ? eventLabel : "Select an event"}</span>
//                     <ChevronDown
//                         className={cn(
//                             "w-4 h-4 transition-transform",
//                             eventDropOpen && "rotate-180"
//                         )}
//                     />
//                 </Button>
//             </PopoverTrigger>

//             <PopoverContent
//                 className="w-89.5 p-0 border-primary mt-0 shadow-md"
//                 align="center"
//                 sideOffset={0}
//             >
//                 <Command>
//                     <CommandList className="max-h-none">
//                         {EVENT_OPTIONS.map((opt) => (
//                             <div key={opt.key} >
//                                 <CommandItem
//                                     value={opt.key ?? ""}
//                                     onSelect={() => dispatch(selectEventOption(opt.key))}
//                                     className={cn(
//                                         "px-3 py-2 cursor-pointer text-sm mb-1 data-selected:bg-accent data-selected:text-primary",
//                                     )}
//                                 >
//                                     <p className="">{opt.label}</p>
//                                     <CommandShortcut>
//                                         {eventKey === opt.key && (
//                                             <Check className="size-4" />
//                                         )}
//                                     </CommandShortcut>
//                                 </CommandItem>

//                                 {/* Inline input for "sales" */}
//                                 {opt.key === "sales" &&
//                                     eventKey === "sales" &&
//                                     !eventSaved && (
//                                         <div className="bg-muted/40 px-3 pb-3 pt-1 space-y-2">
//                                             <div className="relative">
//                                                 <DollarSign className="-translate-y-1/2 absolute top-1/2 left-3 size-3.5 mt-px text-muted-foreground" />
//                                                 <Input
//                                                     ref={salesInputRef}
//                                                     type="number"
//                                                     placeholder="e.g. 100"
//                                                     value={salesVal}
//                                                     onChange={(e) =>
//                                                         dispatch(setSalesVal(e.target.value))
//                                                     }
//                                                     className="h-8 pl-7 text-sm focus-visible:ring-1 focus-visible:ring-primary"
//                                                 />
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <Button
//                                                     variant="outline"
//                                                     size="sm"
//                                                     className="flex-1 h-7 text-xs"
//                                                     onClick={() => dispatch(clearEventOption())}
//                                                 >
//                                                     Cancel
//                                                 </Button>
//                                                 <Button
//                                                     size="sm"
//                                                     className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90 text-white"
//                                                     disabled={salesSaveDisabled}
//                                                     onClick={() => dispatch(saveEventOption())}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     )}

//                                 {/* Inline inputs for "posts" */}
//                                 {opt.key === "posts" &&
//                                     eventKey === "posts" &&
//                                     !eventSaved && (
//                                         <div className="bg-muted/40 px-3 pb-3 pt-1 space-y-2">
//                                             <div className="flex gap-2">
//                                                 <Input
//                                                     ref={postsXInputRef}
//                                                     type="number"
//                                                     placeholder="X posts"
//                                                     value={postsX}
//                                                     onChange={(e) =>
//                                                         dispatch(setPostsX(e.target.value))
//                                                     }
//                                                     className="h-8 text-sm focus-visible:ring-primary"
//                                                 />
//                                                 <Input
//                                                     type="text"
//                                                     placeholder="period (e.g. week)"
//                                                     value={postsY}
//                                                     onChange={(e) =>
//                                                         dispatch(setPostsY(e.target.value))
//                                                     }
//                                                     className="h-8 text-sm focus-visible:ring-primary"
//                                                 />
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <Button
//                                                     variant="outline"
//                                                     size="sm"
//                                                     className="flex-1 h-7 text-xs"
//                                                     onClick={() => dispatch(clearEventOption())}
//                                                 >
//                                                     Cancel
//                                                 </Button>
//                                                 <Button
//                                                     size="sm"
//                                                     className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90 text-white"
//                                                     disabled={postsSaveDisabled}
//                                                     onClick={() => dispatch(saveEventOption())}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     )}
//                             </div>
//                         ))}
//                     </CommandList>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     );
// }

import { useRef, useEffect } from "react";
import { Check, ChevronDown, DollarSign } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandList, CommandItem, CommandShortcut } from "@/components/ui/command";
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

const EVENT_OPTIONS: { key: EventKey; label: string }[] = [
    { key: "sales", label: "Cross $X in sales" },
    { key: "posts", label: "Posts X times every Y period" },
    { key: "onboard", label: "Is Onboarded" },
];

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

    const salesSaveDisabled = !salesVal || Number(salesVal) <= 0;
    const postsSaveDisabled = !postsX || !postsY || Number(postsX) <= 0;

    // Trigger label logic:
    // - Nothing selected yet: placeholder
    // - Option selected but not saved: show the option's raw label (e.g. "Cross $X in sales")
    // - Saved: show the resolved label (e.g. "Cross $100 in sales")
    const triggerLabel = !eventKey
        ? null
        : eventSaved
            ? eventLabel
            : EVENT_OPTIONS.find((o) => o.key === eventKey)?.label ?? null;

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
                    {/* Suppress default CommandInput filtering - we don't need a search bar */}
                    <CommandList className="max-h-none">
                        {EVENT_OPTIONS.map((opt) => (
                            <div key={opt.key}>
                                <CommandItem
                                    value={opt.key ?? ""}
                                    // preventDefault stops Command from closing the Popover on select
                                    onSelect={(e) => {
                                        // If already saved with this key, just close
                                        if (eventSaved && eventKey === opt.key) {
                                            dispatch(closeEventDrop());
                                            return;
                                        }
                                        dispatch(selectEventOption(opt.key));
                                    }}
                                    className={cn(
                                        "px-3 py-2 cursor-pointer text-sm mb-1",
                                        "data-[selected=true]:bg-accent",
                                        eventKey === opt.key && "text-primary"
                                    )}
                                >
                                    <p>{opt.label}</p>
                                    <CommandShortcut>
                                        {eventKey === opt.key && (
                                            <Check className="size-4 text-primary" />
                                        )}
                                    </CommandShortcut>
                                </CommandItem>

                                {/* Inline input for "sales" - shown when selected but not yet saved */}
                                {opt.key === "sales" &&
                                    eventKey === "sales" &&
                                    !eventSaved && (
                                        <div className="bg-muted/40 px-3 pb-3 pt-1 space-y-2">
                                            <div className="relative">
                                                <DollarSign className="-translate-y-1/2 absolute top-1/2 left-3 size-3.5 mt-px text-muted-foreground" />
                                                <Input
                                                    ref={salesInputRef}
                                                    type="number"
                                                    placeholder="e.g. 100"
                                                    value={salesVal}
                                                    onChange={(e) =>
                                                        dispatch(setSalesVal(e.target.value))
                                                    }
                                                    className="h-8 pl-7 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                                />
                                            </div>
                                            <div className="flex gap-2">
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
                                                    disabled={salesSaveDisabled}
                                                    onClick={() => dispatch(saveEventOption())}
                                                >
                                                    Save
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                {/* Inline inputs for "posts" */}
                                {opt.key === "posts" &&
                                    eventKey === "posts" &&
                                    !eventSaved && (
                                        <div className="bg-muted/40 px-3 pb-3 pt-1 space-y-2">
                                            <div className="flex gap-2">
                                                <Input
                                                    ref={postsXInputRef}
                                                    type="number"
                                                    placeholder="X posts"
                                                    value={postsX}
                                                    onChange={(e) =>
                                                        dispatch(setPostsX(e.target.value))
                                                    }
                                                    className="h-8 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="period (e.g. week)"
                                                    value={postsY}
                                                    onChange={(e) =>
                                                        dispatch(setPostsY(e.target.value))
                                                    }
                                                    className="h-8 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 h-7 text-xs"
                                                    onClick={() => dispatch(clearEventOption())}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="flex-1 h-7 text-xs bg-primary hover:bg-primary/90 text-white"
                                                    disabled={postsSaveDisabled}
                                                    onClick={() => dispatch(saveEventOption())}
                                                >
                                                    Save
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}