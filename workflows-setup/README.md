# Workflows setup — one manual step needed ⚡

These GitHub Actions workflows keep the profile fresh (3D skyline, snake animation,
recent activity). They could not be installed automatically because the token used
to push this redesign does not have the `workflow` permission.

## How to enable (≈ 1 minute)

For each `.yml` file in this folder:

1. Open this repo on github.com → **Add file → Create new file**
2. Name it `.github/workflows/<filename>.yml` (e.g. `.github/workflows/contrib-3d.yml`)
3. Paste the file's content and commit.

Or locally:

```bash
git mv workflows-setup/contrib-3d.yml workflows-setup/snake.yml workflows-setup/activity.yml .github/workflows/ 2>/dev/null || { mkdir -p .github/workflows && cp workflows-setup/*.yml .github/workflows/ && git add .github/workflows && git commit -m 'ci: enable profile workflows' && git push; }
```

## What each workflow does

| Workflow | What it does | Schedule |
| --- | --- | --- |
| `contrib-3d.yml` | Re-renders the isometric 3D contribution skyline + stat cards from fresh data (`scripts/gen-contrib-3d.mjs`) and commits them to `assets/` | daily |
| `snake.yml` | Generates the contribution snake animation (dark + light) on the `output` branch | every 12 h |
| `activity.yml` | Fills the **Recent transmissions** section of the README | every 6 h |

## After enabling

- Run each workflow once from the **Actions** tab (“Run workflow”) so you don't wait for the schedule.
- After `snake.yml` has run once, uncomment the snake `<picture>` block in `README.md` (it's marked with an HTML comment).
