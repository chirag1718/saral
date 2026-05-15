import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EventKey = "sales" | "posts" | "onboard" | null;
export type RewardKey = "bonus" | "commission" | null;

export interface SelectedDate {
    d: number;
    m: number;
    y: number;
}

export interface RewardState {
    isOpen: boolean;

    eventKey: EventKey;
    eventLabel: string;
    eventSaved: boolean;
    eventDropOpen: boolean;
    salesVal: string;
    postsX: string;
    postsY: string;

    rewardKey: RewardKey;
    rewardLabel: string;
    rewardSaved: boolean;
    rewardDropOpen: boolean;
    bonusVal: string;
    commissionVal: string;
    commissionTierDialogOpen: boolean;
    selectedTier: string;

    timeBound: boolean;
    selectedDate: SelectedDate | null;
}

const initialState: RewardState = {
    isOpen: false,
    eventKey: null,
    eventLabel: "",
    eventSaved: false,
    eventDropOpen: false,
    salesVal: "",
    postsX: "",
    postsY: "",
    rewardKey: null,
    rewardLabel: "",
    rewardSaved: false,
    rewardDropOpen: false,
    bonusVal: "",
    commissionVal: "",
    commissionTierDialogOpen: false,
    selectedTier: "",
    timeBound: false,
    selectedDate: null,
};

const rewardSlice = createSlice({
    name: "reward",
    initialState,
    reducers: {
        openModal(state) {
            state.isOpen = true;
        },
        closeModal() {
            return { ...initialState, isOpen: false };
        },

        toggleEventDrop(state) {
            state.eventDropOpen = !state.eventDropOpen;
            state.rewardDropOpen = false;
        },
        closeEventDrop(state) {
            state.eventDropOpen = false;
        },
        toggleRewardDrop(state) {
            state.rewardDropOpen = !state.rewardDropOpen;
            state.eventDropOpen = false;
        },
        closeRewardDrop(state) {
            state.rewardDropOpen = false;
        },

        // ─── Event ────────────────────────────────────────────────────────────────

        selectEventOption(state, action: PayloadAction<EventKey>) {
            const key = action.payload;
            state.eventKey = key;
            state.eventSaved = false;
            state.salesVal = "";
            state.postsX = "";
            state.postsY = "";
            if (key === "onboard") {
                state.eventSaved = true;
                state.eventLabel = "Is Onboarded";
                state.eventDropOpen = false;
            }
        },
        setSalesVal(state, action: PayloadAction<string>) {
            state.salesVal = action.payload;
        },
        setPostsX(state, action: PayloadAction<string>) {
            state.postsX = action.payload;
        },
        setPostsY(state, action: PayloadAction<string>) {
            state.postsY = action.payload;
        },
        saveEventOption(state) {
            if (state.eventKey === "sales" && state.salesVal) {
                state.eventLabel = `Cross $${state.salesVal} in sales`;
                state.eventSaved = true;
                state.eventDropOpen = false;
            } else if (
                state.eventKey === "posts" &&
                state.postsX &&
                state.postsY
            ) {
                state.eventLabel = `Posts ${state.postsX} times every ${state.postsY}`;
                state.eventSaved = true;
                state.eventDropOpen = false;
            }
        },
        clearEventOption(state) {
            state.eventKey = null;
            state.eventLabel = "";
            state.eventSaved = false;
            state.salesVal = "";
            state.postsX = "";
            state.postsY = "";
            state.eventDropOpen = false;
        },

        // ─── Reward ───────────────────────────────────────────────────────────────

        // Only used for "bonus" now. Commission goes through openCommissionTierDialog directly.
        selectRewardOption(state, action: PayloadAction<RewardKey>) {
            state.rewardKey = action.payload;
            state.rewardSaved = false;
            state.bonusVal = "";
        },
        setBonusVal(state, action: PayloadAction<string>) {
            state.bonusVal = action.payload;
        },
        setCommissionVal(state, action: PayloadAction<string>) {
            state.commissionVal = action.payload;
        },

        // Opens the tier dialog. Sets rewardKey to "commission" immediately
        // so the trigger label updates to the raw option label while dialog is open.
        openCommissionTierDialog(state) {
            state.rewardKey = "commission";
            state.rewardSaved = false;
            state.commissionTierDialogOpen = true;
            state.rewardDropOpen = false;
        },

        // Cancel: if there was no previously saved commission, reset rewardKey so
        // the trigger goes back to placeholder. If it was already saved, keep it.
        closeCommissionTierDialog(state) {
            state.commissionTierDialogOpen = false;
            if (!state.rewardSaved) {
                state.rewardKey = null;
                state.selectedTier = "";
            }
        },

        setSelectedTier(state, action: PayloadAction<string>) {
            state.selectedTier = action.payload;
        },

        // Save: explicitly sets rewardKey = "commission" and rewardSaved = true.
        // This is the single source of truth - no ambiguity.
        saveCommissionTier(state) {
            if (state.selectedTier) {
                state.rewardKey = "commission";
                state.rewardLabel = `Upgrade to ${state.selectedTier} tier`;
                state.rewardSaved = true;
                state.rewardDropOpen = false;
                state.commissionTierDialogOpen = false;
            }
        },

        saveRewardOption(state) {
            if (state.rewardKey === "bonus" && state.bonusVal) {
                state.rewardLabel = `Flat $${state.bonusVal} bonus`;
                state.rewardSaved = true;
                state.rewardDropOpen = false;
            }
        },

        clearRewardOption(state) {
            state.rewardKey = null;
            state.rewardLabel = "";
            state.rewardSaved = false;
            state.bonusVal = "";
            state.commissionVal = "";
            state.commissionTierDialogOpen = false;
            state.selectedTier = "";
            state.rewardDropOpen = false;
        },

        // ─── Time bound ───────────────────────────────────────────────────────────

        setTimeBound(state, action: PayloadAction<boolean>) {
            state.timeBound = action.payload;
            if (!action.payload) state.selectedDate = null;
        },
        setSelectedDate(state, action: PayloadAction<SelectedDate>) {
            state.selectedDate = action.payload;
        },
    },
});

export const {
    openModal,
    closeModal,
    toggleEventDrop,
    closeEventDrop,
    toggleRewardDrop,
    closeRewardDrop,
    selectEventOption,
    setSalesVal,
    setPostsX,
    setPostsY,
    saveEventOption,
    clearEventOption,
    selectRewardOption,
    setBonusVal,
    setCommissionVal,
    openCommissionTierDialog,
    closeCommissionTierDialog,
    setSelectedTier,
    saveCommissionTier,
    saveRewardOption,
    clearRewardOption,
    setTimeBound,
    setSelectedDate,
} = rewardSlice.actions;

export default rewardSlice.reducer;
