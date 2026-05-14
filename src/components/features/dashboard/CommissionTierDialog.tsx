import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { closeCommissionTierDialog, setSelectedTier, saveCommissionTier } from "@/store/rewardSlice";

const TIER_OPTIONS = ["Bronze", "Silver", "Gold", "Platinum"];

export function CommissionTierDialog() {
    const dispatch = useAppDispatch();
    const { commissionTierDialogOpen, selectedTier } = useAppSelector((s) => s.reward);

    const [tempTier, setTempTier] = useState(selectedTier);

    useEffect(() => {
        if (commissionTierDialogOpen) {
            setTempTier(selectedTier);
        }
    }, [commissionTierDialogOpen, selectedTier]);

    const handleSave = () => {
        if (tempTier) {
            dispatch(setSelectedTier(tempTier));
            dispatch(saveCommissionTier());
        }
    };

    const handleCancel = () => {
        dispatch(closeCommissionTierDialog());
    };

    return (
        <Dialog open={commissionTierDialogOpen} onOpenChange={(open) => !open && handleCancel()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-black">Select Commission Tier</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 w-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="">
                            <Button variant="outline" className="w-full justify-between">
                                {tempTier || "Select a tier"}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-94">
                            <DropdownMenuRadioGroup value={tempTier} onValueChange={setTempTier}>
                                {TIER_OPTIONS.map((tier) => (
                                    <DropdownMenuRadioItem key={tier} value={tier}>
                                        {tier}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel} className="flex-1">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={!tempTier} className="flex-1">
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}