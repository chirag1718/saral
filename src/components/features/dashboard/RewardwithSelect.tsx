import { useRef, useEffect } from "react";
import { Check, ChevronDown, DollarSign, Pencil } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandList, CommandItem, CommandShortcut } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  toggleRewardDrop,
  closeRewardDrop,
  selectRewardOption,
  setBonusVal,
  saveRewardOption,
  clearRewardOption,
  openCommissionTierDialog,
  type RewardKey,
} from "@/store/rewardSlice";
import { CommissionTierDialog } from "./CommissionTierDialog";

const REWARD_OPTIONS: { key: RewardKey; label: string }[] = [
  { key: "bonus", label: "Flat $X bonus" },
  { key: "commission", label: "Upgrade to commission tier" },
];

export function RewardWithSelect() {
  const dispatch = useAppDispatch();
  const {
    rewardKey,
    rewardLabel,
    rewardSaved,
    rewardDropOpen,
    bonusVal,
    eventKey,
  } = useAppSelector((s) => s.reward);

  const bonusInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rewardKey === "bonus" && !rewardSaved) {
      setTimeout(() => bonusInputRef.current?.focus(), 50);
    }
  }, [rewardKey, rewardSaved]);

  const bonusSaveDisabled = !bonusVal || Number(bonusVal) <= 0;
  const isCommissionDisabled = eventKey === "onboard";

  const showBonusInput = rewardKey === "bonus" && !rewardSaved;

  const triggerLabel = !rewardKey
    ? null
    : rewardSaved
      ? rewardLabel
      : REWARD_OPTIONS.find((o) => o.key === rewardKey)?.label ?? null;

  return (
    <div>
      <Popover
        open={rewardDropOpen}
        onOpenChange={(open) => {
          if (!open) dispatch(closeRewardDrop());
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onClick={() => dispatch(toggleRewardDrop())}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border transition-colors font-normal",
              "bg-background hover:bg-accent/30",
              rewardDropOpen ? "border-primary" : "border-border",
              triggerLabel ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span>{triggerLabel ?? "Select a reward"}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform shrink-0",
                rewardDropOpen && "rotate-180"
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
              {REWARD_OPTIONS.map((opt) => {
                const listLabel =
                  opt.key === "commission" && rewardSaved && rewardKey === "commission"
                    ? rewardLabel
                    : opt.label;

                const isSelected =
                  rewardKey === opt.key &&
                  (opt.key === "commission" ? rewardSaved : true);

                return (
                  <div key={opt.key}>
                    <CommandItem
                      value={opt.key ?? ""}
                      onSelect={() => {
                        if (opt.key === "commission") {
                          if (isCommissionDisabled) return;
                          dispatch(closeRewardDrop());
                          dispatch(openCommissionTierDialog());
                          return;
                        }
                        if (rewardSaved && rewardKey === opt.key) {
                          dispatch(closeRewardDrop());
                          return;
                        }
                        dispatch(selectRewardOption(opt.key));
                      }}
                      className={cn(
                        "px-3 py-2 cursor-pointer text-sm mb-1 group",
                        "data-[selected=true]:bg-accent hover:text-primary",
                        isSelected && "text-primary bg-accent",
                        isCommissionDisabled && opt.key === "commission" && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center justify-normal gap-1">
                        <p>{listLabel}</p>
                        {opt.key === "commission" &&
                          rewardSaved &&
                          rewardKey === "commission" && (
                            <Pencil className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                          )}
                      </div>
                      <CommandShortcut className="flex items-center justify-end gap-2">
                        {isSelected && <Check className="size-4 text-primary" />}
                      </CommandShortcut>
                    </CommandItem>

                    {/* Bonus input only - no buttons */}
                    {opt.key === "bonus" && showBonusInput && (
                      <div className="bg-muted/40 px-3 pb-3 pt-1">
                        <div className="relative">
                          <div className="flex items-center justify-center h-7.5 w-fit -translate-y-1/2 absolute top-1/2 left-0 px-2 border-r rounded-l border-gray-200">
                            <DollarSign className="size-3.5 text-muted-foreground" />
                          </div>
                          <Input
                            ref={bonusInputRef}
                            type="number"
                            placeholder="e.g. 50"
                            value={bonusVal}
                            onChange={(e) => dispatch(setBonusVal(e.target.value))}
                            className="h-8 pl-10 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CommandList>

            {/* Cancel / Save always at the bottom of the list */}
            {showBonusInput && (
              <div className="flex gap-4 p-3">
                <Button
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={() => dispatch(clearRewardOption())}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 text-xs bg-primary hover:bg-primary/90 text-white"
                  disabled={bonusSaveDisabled}
                  onClick={() => dispatch(saveRewardOption())}
                >
                  Save
                </Button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      <CommissionTierDialog />
    </div>
  );
}