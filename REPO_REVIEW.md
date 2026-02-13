# Junior Developer Hiring Review (CalorieMate)

## Major red flags

1. **Repository hygiene is severely broken**
   - `node_modules/` and `dist/` are committed to git, inflating repo size and making cross-platform behavior inconsistent.
   - `.gitignore` is currently empty.
   - macOS `.DS_Store` files are tracked.

2. **CI workflow path is incorrect**
   - GitHub Actions workflow is under `.github/workflow/deploy.yml` instead of `.github/workflows/...`, so automation likely never runs.

3. **Type safety / compile quality issues**
   - The app currently fails TypeScript check because `Navbar` expects `(section: string) => void` while `App` passes a narrower union-typed function.
   - `main.tsx` contains stray `+` characters in JSX, which looks like unresolved patch artifacts.

4. **Tooling setup is incomplete/broken**
   - `lint` script uses ESLint v9 but no flat config (`eslint.config.*`) is present.
   - `build` currently fails in this environment because the tracked `.bin/vite` executable is not runnable (`Permission denied`), consistent with committing platform-specific `node_modules` output.

5. **Runtime robustness issues in data layer**
   - `clearDatabase()` directly uses the module-level `db` without ensuring it has been opened first, which can fail if called before `getDatabase()`.
   - `getPersonalInfo()` is typed to return `Promise<PersonalInfo>` but can return undefined.

6. **Code quality signals**
   - Debug `console.log` calls remain in shared business logic.
   - README content appears partially copied from rendered Markdown UI and is out of sync with code examples.

## Overall hiring signal

The project demonstrates initiative and a complete feature flow, but these red flags are significant enough that I would consider this **not yet production-ready** and below expected baseline for a junior candidate submitting a portfolio repo. The strongest immediate improvements would be: clean repo hygiene, make CI run, fix TypeScript/lint pipelines, and tighten data-layer typing.
