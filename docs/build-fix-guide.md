# VibeDeck Build Fix Guide

## Quick Summary

The TypeScript build error was caused by the `shared/` folder being outside the configured `rootDir`. We fixed it by implementing **TypeScript Project References**, the recommended pattern for monorepos.

## What Changed

Four files were modified/created:

1. **`shared/tsconfig.json`** (NEW) - Shared types now have their own TypeScript configuration
2. **`server/tsconfig.json`** (MODIFIED) - Added project reference to shared
3. **`server/package.json`** (MODIFIED) - Build script now uses `tsc --build`
4. **`server/src/index.ts`** (MODIFIED) - Fixed type error with `error.code`

## Installation Steps for Your System

### Step 1: Pull Latest Changes

```bash
cd /home/jan/dev/flivideo/vibedeck
git pull origin main
```

### Step 2: Clean Previous Build Artifacts (Optional but Recommended)

```bash
# Remove old compiled output
rm -rf server/dist/
rm -rf shared/dist/
rm -f shared/types.js  # Remove any stray compiled files

# Clean npm cache if needed
npm cache clean --force
```

### Step 3: Install Dependencies (if needed)

```bash
npm install
```

### Step 4: Build the Project

```bash
npm run build
```

**Expected output:**
```
> vibedeck@1.0.0 build
> npm run build --workspace=server

> @vibedeck/server@1.0.0 build
> tsc --build
```

No errors should appear!

### Step 5: Verify Build Output

```bash
# Check that both dist folders were created
ls -la server/dist/
ls -la shared/dist/

# You should see:
# server/dist/index.js (and other compiled server files)
# shared/dist/types.js and types.d.ts (shared type definitions)
```

## What This Solution Does

### TypeScript Project References Explained

Instead of treating `shared/` as loose files, we now have:

1. **`shared/`** - A standalone TypeScript project
   - Has its own `tsconfig.json`
   - Compiles to `shared/dist/`
   - Generates `.d.ts` type declaration files

2. **`server/`** - References the shared project
   - Imports types from compiled `shared/dist/`
   - TypeScript builds `shared/` first, then `server/`
   - Enables incremental builds (faster rebuilds)

### Benefits

- ✅ **Proper monorepo structure** - Each workspace is self-contained
- ✅ **Faster incremental builds** - Only rebuilds changed projects
- ✅ **Type safety** - Full type-checking across project boundaries
- ✅ **Better IDE support** - IntelliSense works perfectly
- ✅ **Clean output** - Organized `dist/` directories

## Running VibeDeck

After successful build:

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
# Build first (if not already done)
npm run build

# Start server
npm start
```

## Troubleshooting

### Build still fails with "not under rootDir" error

Make sure you have the latest changes:
```bash
git status
git diff server/tsconfig.json
```

If you see uncommitted local changes, you may need to stash them:
```bash
git stash
git pull origin main
git stash pop  # Only if you had important local changes
```

### "Cannot find module '../../shared/types'" at runtime

This shouldn't happen with project references, but if it does:
```bash
# Rebuild everything from scratch
npm run build
```

### Permission issues on WSL2

If you get permission errors:
```bash
# Fix permissions (if needed)
chmod -R u+w server/dist shared/dist
```

## File Changes Reference

### 1. `shared/tsconfig.json` (NEW FILE)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2. `server/tsconfig.json` (MODIFIED)

**Removed** from `"include"`: `"../shared/**/*"`

**Added** at root level:
```json
  "references": [
    { "path": "../shared" }
  ]
```

### 3. `server/package.json` (MODIFIED)

**Before:**
```json
"build": "tsc"
```

**After:**
```json
"build": "tsc --build"
```

### 4. `server/src/index.ts:214` (MODIFIED)

**Before:**
```typescript
if (err.code === 'ERR_SERVER_NOT_RUNNING') {
```

**After:**
```typescript
if ((err as NodeJS.ErrnoException).code === 'ERR_SERVER_NOT_RUNNING') {
```

## Questions?

If you encounter any issues:
1. Check that all four changes above are present
2. Run `npm run build` and share the full error output
3. Verify Node.js version: `node --version` (should be v18+)
4. Check TypeScript version: `npx tsc --version` (should be v5+)

## Success Checklist

- [ ] Git pull completed
- [ ] Build runs without errors
- [ ] `server/dist/index.js` exists
- [ ] `shared/dist/types.js` exists
- [ ] `shared/dist/types.d.ts` exists
- [ ] `npm run dev` or `npm start` works

---

**Fixed by:** David Cruwys & Claude Sonnet 4.5
**Date:** 2026-01-13
**Original Issue:** TypeScript TS6059 - File not under rootDir
**Solution:** TypeScript Project References for monorepo workspaces
