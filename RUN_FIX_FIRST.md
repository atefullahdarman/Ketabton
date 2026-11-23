# Emerald Digital Library — Runtime Compatibility Repair

This edition adjusts the dependency combination and prevents implicit Effect callback returns.

Changes:
- Pin React and React DOM to 18.3.1 (a better-aligned version for Recharts 2).
- Make navigation and catalog effects explicitly void.
- Show React component stacks in the on-screen error fallback.

## Windows CMD / PowerShell (from the folder with package.json)

1. Stop the old Vite server (Ctrl+C).
2. In this NEW extracted directory, run:

```powershell
npm install
npm ls react react-dom recharts
npm run dev
```

3. Open EXACTLY the Local URL printed by Vite. Vite may choose 5174 rather than 5173.
4. Hard refresh with Ctrl+Shift+R.
5. Test home at `http://localhost:5173/#/` (change port to Vite's port).
6. If there's still an error, send BOTH error details and COMPONENT STACK from the page, plus the browser address incl. #/ route.

## Existing old project repair (alternative)

In the old project directory, use:

```powershell
npm install --save-exact react@18.3.1 react-dom@18.3.1
npm run dev
```

This changes the dependencies but does NOT apply the source Effect improvements. Prefer the ZIP for the complete repair.

## Scope of verification

Source and package files checked locally; complete browser runtime execution requires fetching npm dependencies.
Do not interpret a successful build as proof that all runtime issues are fixed.
