# Quick Fix Guide - For Jan

Hey Jan! 👋

Your build error is fixed. Here's what you need to do:

## TL;DR - 3 Commands

```bash
cd /home/jan/dev/flivideo/vibedeck
git pull origin main
npm run build
```

That's it! The build should now complete successfully.

## What Was Wrong?

TypeScript error TS6059: The `shared/types.ts` file was outside the configured `rootDir`, so TypeScript didn't know how to compile it properly.

## What We Fixed

We implemented **TypeScript Project References** - the proper way to handle shared code in monorepos:

1. Created `shared/tsconfig.json` - shared types now compile independently
2. Updated `server/tsconfig.json` - added reference to shared project
3. Updated build script to use `tsc --build`
4. Fixed a type error with `error.code` in index.ts

## Verify It Worked

After running the build, check:

```bash
ls -la server/dist/     # Should contain index.js
ls -la shared/dist/     # Should contain types.js and types.d.ts
```

## Running VibeDeck

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

## Need More Details?

See the full guide: `docs/build-fix-guide.md`

It includes:
- Detailed explanation of what changed
- All file modifications
- Troubleshooting steps
- Benefits of the solution

## Still Having Issues?

Share the exact error output from `npm run build` and we'll help you debug it.

---

The fix works on both macOS and Linux (verified on both platforms). Your WSL2 environment should build cleanly now! 🚀
