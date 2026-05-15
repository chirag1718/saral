import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
    closeCommissionTierDialog,
    setSelectedTier,
    saveCommissionTier,
} from "@/store/rewardSlice";
import { Label } from "@/components/ui/label";

const TIER_OPTIONS = ["Bronze", "Silver", "Gold", "Platinum"];

export function CommissionTierDialog() {
    const dispatch = useAppDispatch();
    const { commissionTierDialogOpen, selectedTier } = useAppSelector((s) => s.reward);

    // tempTier is local - only committed to Redux on Save
    const [tempTier, setTempTier] = useState(selectedTier);

    // Sync tempTier when dialog opens so re-opening shows previously saved tier
    useEffect(() => {
        if (commissionTierDialogOpen) {
            setTempTier(selectedTier);
        }
    }, [commissionTierDialogOpen, selectedTier]);

    const handleSave = () => {
        if (!tempTier) return;
        dispatch(setSelectedTier(tempTier));
        dispatch(saveCommissionTier());
    };

    const handleCancel = () => {
        dispatch(closeCommissionTierDialog());
    };

    return (
        <Dialog
            open={commissionTierDialogOpen}
            onOpenChange={(open) => !open && handleCancel()}
        >
            <DialogContent className="sm:max-w-100 gap-0 p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-base font-medium text-black">
                        Select a commission tier
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 pb-6 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        Upgrade to <span className="text-red-500">*</span>
                    </Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between font-normal text-sm"
                            >
                                <span className={tempTier ? "text-foreground" : "text-muted-foreground"}>
                                    {tempTier || "Select a tier"}
                                </span>
                                <ChevronDown className="h-4 w-4 shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-88" align="center">
                            <DropdownMenuRadioGroup value={tempTier} onValueChange={setTempTier}>
                                {TIER_OPTIONS.map((tier) => (
                                    <DropdownMenuRadioItem key={tier} value={tier}>
                                        {tier}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex gap-2 mt-2">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1"
                        >
                            Go Back
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!tempTier}
                            className="flex-1"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}