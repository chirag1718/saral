import type { EventKey, RewardKey } from "@/store/rewardSlice";

export const EVENT_OPTIONS: { key: EventKey; label: string }[] = [
    { key: "sales", label: "Cross $X in sales" },
    { key: "posts", label: "Posts X times every Y period" },
    { key: "onboard", label: "Is Onboarded" },
];

export const REWARD_OPTIONS: { key: RewardKey; label: string }[] = [
    { key: "bonus", label: "Flat $X bonus" },
    { key: "commission", label: "Upgrade to commission tier" },
];
    
export const TIER_OPTIONS = ["Bronze", "Silver", "Gold", "Platinum"];