import { useRef, useEffect } from "react";
import { Check, ChevronDown, DollarSign, Edit } from "lucide-react";
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
  } = useAppSelector((s) => s.reward);

  const bonusInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rewardKey === "bonus" && !rewardSaved) {
      setTimeout(() => bonusInputRef.current?.focus(), 50);
    }
  }, [rewardKey, rewardSaved]);

  const bonusSaveDisabled = !bonusVal || Number(bonusVal) <= 0;

  // Same three-state label logic as RewardEventSelect:
  // no selection -> placeholder
  // selected, not saved -> raw option label e.g. "Flat $X bonus"
  // saved -> resolved label e.g. "Flat $50 bonus"
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
                const optionLabel =
                  opt.key === "commission" && rewardSaved && rewardKey === "commission"
                    ? rewardLabel
                    : opt.label;

                return (
                  <div key={opt.key}>
                    <CommandItem
                      value={opt.key ?? ""}
                      onSelect={() => {
                        if (opt.key === "commission") {
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
                        "px-3 py-2 cursor-pointer text-sm mb-1 relative group",
                        "data-[selected=true]:bg-accent",
                        rewardKey === opt.key && "text-primary"
                      )}
                    >
                      <p>{optionLabel}</p>
                      <CommandShortcut>
                        {rewardKey === opt.key && (
                          <Check className="size-4 text-primary" />
                        )}
                        {opt.key === "commission" && rewardSaved && rewardKey === "commission" && (
                          <Edit className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </CommandShortcut>
                    </CommandItem>

                    {/* Inline input for "bonus" */}
                    {opt.key === "bonus" &&
                      rewardKey === "bonus" &&
                      !rewardSaved && (
                        <div className="bg-muted/40 px-3 pb-3 pt-1 space-y-2">
                          <div className="relative">
                            <DollarSign className="-translate-y-1/2 absolute top-1/2 left-3 size-3.5 mt-px text-muted-foreground" />
                            <Input
                              ref={bonusInputRef}
                              type="number"
                              placeholder="e.g. 50"
                              value={bonusVal}
                              onChange={(e) =>
                                dispatch(setBonusVal(e.target.value))
                              }
                              className="h-8 pl-7 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="default"
                              className="flex-1 text-xs"
                              onClick={() => dispatch(clearRewardOption())}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="default"
                              className="flex-1 text-xs bg-primary hover:bg-primary/90 text-white"
                              disabled={bonusSaveDisabled}
                              onClick={() => dispatch(saveRewardOption())}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CommissionTierDialog />
    </div>
  );
}