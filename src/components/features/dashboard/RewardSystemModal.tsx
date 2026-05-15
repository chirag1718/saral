import { useEffect, useRef, useState } from "react";
import { Calendar1, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeModal, setTimeBound, setSelectedDate, } from "@/store/rewardSlice";
import { toast } from "sonner";
import { RewardEventSelect } from "@/components/features/dashboard/RewardeventSelect";
import { RewardWithSelect } from "@/components/features/dashboard/RewardwithSelect";
import { Label } from "@/components/ui/label";
import { TooltipWrapper } from "@/components/shared/TooltipWrapper";

export function RewardSystemModal() {
    const dispatch = useAppDispatch();
    const {
        isOpen,
        eventSaved,
        rewardSaved,
        timeBound,
        selectedDate,
    } = useAppSelector((s) => s.reward);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const createTimeoutRef = useRef<number | null>(null);

    const canCreate =
        eventSaved && rewardSaved && (!timeBound || !!selectedDate);

    const isEventMissing = !eventSaved;
    const isRewardMissing = !rewardSaved;
    const isEndDateMissing = timeBound && !selectedDate;

    const tooltipMessage = !canCreate
        ? isEventMissing && isRewardMissing
            ? "Choose a reward event and a reward to continue"
            : isEventMissing
                ? "Choose a reward event to continue"
                : isRewardMissing
                    ? "Choose a reward to continue"
                    : isEndDateMissing
                        ? "Choose reward end date to continue"
                        : "Complete all required fields to continue"
        : "Create reward";

    // Convert our SelectedDate shape to/from JS Date for shadcn Calendar
    const calendarDate: Date | undefined = selectedDate
        ? new Date(selectedDate.y, selectedDate.m, selectedDate.d)
        : undefined;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const today = new Date();
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    useEffect(() => {
        return () => {
            if (createTimeoutRef.current !== null) {
                window.clearTimeout(createTimeoutRef.current);
                createTimeoutRef.current = null;
            }
        };
    }, []);

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;
        dispatch(
            setSelectedDate({
                d: date.getDate(),
                m: date.getMonth(),
                y: date.getFullYear(),
            })
        );
    };

    const handleCreate = () => {
        if (!canCreate || isCreating) return;

        setIsCreating(true);
        createTimeoutRef.current = window.setTimeout(() => {
            dispatch(closeModal());
            toast.success("Reward created successfully", { position: "top-center" });
            setIsCreating(false);
            createTimeoutRef.current = null;
        }, 600);
    };

    const dialogTooltip = isCreating ? "Creating reward..." : tooltipMessage;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    dispatch(closeModal());
                    setIsCreating(false);
                    if (createTimeoutRef.current !== null) {
                        window.clearTimeout(createTimeoutRef.current);
                        createTimeoutRef.current = null;
                    }
                }
            }}
        >
            <DialogContent
                className="sm:max-w-100 gap-0 p-0 overflow-hidden"
                showCloseButton
            >
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between space-y-0">
                    <DialogTitle className="text-base font-medium text-black">
                        Create your reward system
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="px-6 pb-6 space-y-4">
                    {/* Reward event */}
                    <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                            Reward event <span className="text-red-500">*</span>
                        </Label>
                        <RewardEventSelect />
                    </div>

                    {/* Reward with - only shown after event is saved */}
                    <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                            Reward with <span className="text-red-500">*</span>
                        </Label>
                        <RewardWithSelect />
                    </div>

                    {/* Time bound toggle */}
                    <div className="space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="space-y-0.5 pr-4">
                                <p className="text-sm font-medium leading-none">
                                    Make the reward time bound
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Choose an end date to stop this reward automatically.
                                </p>
                            </div>
                            <Switch
                                checked={timeBound}
                                onCheckedChange={(checked) => {
                                    dispatch(setTimeBound(checked));
                                    if (!checked) setDatePickerOpen(false);
                                }}
                                className={cn(
                                    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300",
                                    "mt-0.5 shrink-0"
                                )}
                            />
                        </div>

                        {timeBound && (
                            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full flex items-center justify-start gap-2 px-3 py-2 text-sm rounded-md border transition-colors font-normal",
                                            "bg-background hover:bg-accent/30"
                                        )}
                                    >
                                        <Calendar1 className="size-4 " />
                                        <span className={cn("text-left", !calendarDate && "text-muted-foreground")}>
                                            {calendarDate
                                                ? calendarDate.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : "Select End Date"}
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={calendarDate}
                                        onSelect={(date) => {
                                            handleDateSelect(date);
                                            setDatePickerOpen(false);
                                        }}
                                        startMonth={startOfCurrentMonth}
                                        disabled={{ before: tomorrow }}
                                        className="rounded-md p-1.5 w-75 **:[[role=gridcell]]:w-full **:[[role=gridcell]]:h-full"
                                        classNames={{
                                            selected:
                                                "bg-primary text-white hover:bg-primary/90 focus:bg-primary/90",
                                            today: "text-primary font-semibold",
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-4 w-full">
                    <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => dispatch(closeModal())}
                    >
                        Cancel
                    </Button>
                    <TooltipWrapper
                        side="bottom"
                        className="w-full"
                        tooltip={dialogTooltip}
                    >
                        <Button
                            className="w-full"
                            disabled={!canCreate || isCreating}
                            onClick={handleCreate}
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Reward"
                            )}
                        </Button>
                    </TooltipWrapper>
                </div>
            </DialogContent>
        </Dialog>
    );
}