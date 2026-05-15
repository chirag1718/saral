# Saral Frontend Assignment

This repository contains the Saral reward system frontend built with React, TypeScript, and Vite.

## Live Deployment

- Vercel: https://saral-dnvi.vercel.app/

## What’s Included

- Reward creation modal with event and reward selection
- Time-bound reward support with a date picker
- Commission tier selection dialog and bonus reward validation
- Redux Toolkit state management and Tailwind CSS with shadcn/ui primitives
- Shared validation logic extracted for future maintainability

## Getting Started

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

## Notes

- `RewardSystemModal` uses shared validation helpers from `src/lib/rewardValidation.ts`.
- Onboard event selection is auto-saved; sales/posts and bonus flows require explicit saving.
- Past dates are disabled and the time-bound option clears the date when toggled off.

## ESLint / TypeScript

The repo supports TypeScript and ESLint. For stricter linting, enable type-aware rules in `eslint.config.js`.
