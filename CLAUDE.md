# Development Workflow

Every piece of work follows this cycle — never deviate from it:

1. **New branch** — create a new feature branch for the work (`git checkout -b <branch>`).
2. **Develop** — make all changes on that branch, committing as needed.
3. **Push + PR** — when finished, push the branch and create a pull request. Do not push to main directly.
4. **User reviews** — the user checks the changes on GitHub and merges the PR, then deletes the branch on GitHub.
5. **Sync to main** — when the user reports that the PR has been merged, run `git checkout main && git pull origin main && git branch -d <branch>` to clean up the local branch and land on the updated main.
6. **Repeat** — the next piece of work starts a new branch from step 1.

**Critical rule:** Stay on the current open branch for ALL follow-up prompts in a session. Do NOT create a new branch for each prompt. Only move to a new branch after the user says something like "I merged the pull request to main and deleted your branch. Sync to main." Multiple prompts within the same work session should all land as commits on the same branch/PR.

## GitHub Issues Workflow

- Link commits to the issue using `fixes #N` or `refs #N` in the commit message.
- Do NOT close issues — the user closes them manually after verifying on Railway.
- Do NOT add test plans to pull requests. Instead, post the test plan as a comment on the issue so the user can work through it after deployment.
