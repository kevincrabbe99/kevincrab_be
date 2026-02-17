# AGENTS.md — Development Workflow

This document defines the development workflow and git strategy for this repository.

## Git Branching Strategy

### Core Rule: Protect Long-Lived Branches

**NEVER commit directly to:**
- `main` (primary production branch)
- `master` (if used)
- `develop` (if used)
- `staging` (if used)
- Any other protected branch

All changes MUST go through feature branches and pull requests.

### Workflow: Feature Branch → Pull Request → Merge

1. **Create a feature branch** — Always branch off the appropriate base (usually `main`)
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Do your work** — Commit normally to the feature branch
   ```bash
   git add .
   git commit -m "descriptive commit message"
   git push origin feature/your-feature-name
   ```

3. **Open a pull request** — Once your work is complete, open a PR on GitHub/GitLab
   - Target: the main branch (or appropriate base branch)
   - Include a clear description of changes
   - Request reviewers if required

4. **Check PR status** — Wait for automated checks to pass
   - Build pipelines must succeed
   - Linting/testing must pass
   - Deployments (if any) must complete
   - All status checks visible in the PR page

5. **Merge and report** — Once all checks pass:
   - Report the PR link: `https://github.com/<owner>/<repo>/pull/<number>`
   - Report any deployment links (if applicable)
   - Delete the feature branch after merge

## Naming Conventions

**Feature branches:** `feature/description-of-work`
```bash
git checkout -b feature/add-user-authentication
git checkout -b feature/fix-payment-button
```

**Bugfix branches:** `fix/description-of-bug`
```bash
git checkout -b fix/incorrect-date-calculation
git checkout -b fix/missing-validation
```

**Improvement branches:** `improve/description-of-improvement`
```bash
git checkout -b improve/refactor-database-queries
```

**Chore branches:** `chore/description-of-task`
```bash
git checkout -b chore/update-dependencies
```

## Commit Message Guidelines

- Keep messages clear and concise
- Use imperative mood: "Add feature" not "Added feature"
- Include context: "Fix login validation — reject empty passwords"
- Reference issues if applicable: "Closes #123"

Example:
```
Add user authentication flow

- Implement JWT token generation
- Add password hashing with bcrypt
- Add login endpoint
- Add middleware for protected routes

Closes #45
```

## Pull Request Checklist

Before requesting review or merging:
- [ ] Tests pass locally (`npm test`, `pytest`, etc.)
- [ ] Linting passes (`eslint`, `pylint`, `black`, etc.)
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] Changes are described in PR
- [ ] Reviewers are assigned (if required)

## CI/CD and Deployments

**Status checks must pass before merging:**
- All GitHub Actions / GitLab CI jobs must succeed
- Build pipelines must complete
- Any automated deployments must finish

**Deployment process:**
1. PR is opened and all checks run automatically
2. Once all checks pass, the PR can be merged
3. Merging to `main` may trigger automatic deployments (check .github/workflows or .gitlab-ci.yml)
4. Report deployment links in completion message

**Never force-push to main or other protected branches.**

## Getting Help

If you're unsure about the workflow, branching strategy, or deployment process:
- Check this file
- Review recent PRs in the repository for examples
- Ask the team or maintainers
- Refer to the repository's README or CONTRIBUTING.md

## Repository-Specific Notes

<!-- Add any repo-specific configurations, deployment URLs, or special instructions below -->

(None at this time)

---

**Last updated:** 2026-02-16
