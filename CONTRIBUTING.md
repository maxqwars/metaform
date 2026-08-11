# Thank you for your interest in the project

Thanks for wanting to make Metaform better! This document describes the rules and process for contributing to the project. It will help you navigate the contribution process, from your very first steps to opening a pull request.

# Branch organization

> **⚠️ Important:** until version `2.0` is released, the `main` branch **does not reflect the version currently published on npm**. This is a temporary exception related to preparing the `2.0` release. Once `2.0` ships, this notice will be removed, and `main` and `develop` will follow the rules described below.

⚠️ All changes go into the `develop` branch. This branch is intended for ongoing development and may contain both new features and changes that haven't been released yet.

⚠️ Changes from `develop` are merged into `main` only when preparing a new release. Therefore, `main` must not contain changes that break backward compatibility with the current `latest` version.

⚠️ The final version is published automatically from the `main` branch — the **maintainer** is responsible for this. Changes to CHANGELOG.md and build tooling configuration are made only by the **maintainer**, except in pre-agreed cases.

**In short**

- These rules take full effect after the `v2.0.0` release.
- `develop` — all ongoing development and new changes.
- `main` — the latest stable version published on npm.
- `main` must remain backward compatible with the current `latest`.
- The final version is published automatically from the `main` branch; the **maintainer** is responsible for this, and only the **maintainer** changes the CHANGELOG.md and build tooling configuration, except in pre-agreed cases.
- Breaking changes require a version bump before landing in `main`.

# Semantic versioning

Metaform follows the principles of [semantic versioning](https://semver.org/). We release patch versions (`patch`) for bug fixes, minor versions (`minor`) for new features, and major versions (`major`) for changes that break backward compatibility.

# Getting the Metaform source and setting up your environment

## Platform requirements

- Node.js (version 24.0.0 or later)
- Package manager: `pnpm (11.20.0 or later)`

## Cloning the project and installing dependencies

```bash

# Clone the repository
git clone https://github.com/maxqwars/metaform.git
cd metaform/

# Fetch updates
git fetch origin

# Switch to the develop branch
git checkout develop

# Install dependencies
pnpm install
```

## Available scripts

- `pnpm dev` — run the bundler in watch mode.
- `pnpm test` — run unit tests with Vitest.
- `pnpm test:coverage` — check test coverage.
- `pnpm typecheck` — run TypeScript type checking.
- `pnpm lint` — run the linter.
- `pnpm format` — automatically format code with Prettier.

> 💡 **Architecture and code structure:** Before writing code or adding new endpoints, make sure to read the [Architecture Guide (ARCHITECTURE.md)](ARCHITECTURE.md). It describes the file structure, DTO/Guards patterns, and a checklist for adding a new API in detail.

# Code standards and commit rules

We use Husky and lint-staged to check formatting before each commit, and we follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

`<type>(<scope>): <short description>`

**Common types:**

- `feat:` — a new feature
- `fix:` — a bug fix
- `docs:` — documentation changes
- `refactor:` — code restructuring without changing the public API
- `test:` — adding or fixing tests

_Example:_ `fix(core): resolve null pointer in user parsing`

# Opening a Pull Request

1. Make sure your PR targets the `develop` branch.
2. In the PR description, describe which problem the PR solves (link to the issue: `Fixes #123`).
3. **Do not update** the version in `package.json` and `CHANGELOG.md` — this is handled centrally when a release is made.
4. Before submitting, make sure all checks (`pnpm typecheck`, `pnpm test`, `pnpm lint`) pass successfully.

## Looking for where to start?

If you'd like to make your first contribution to Metaform but aren't sure which task to pick:

1. **Find a suitable issue:** Go to the [Issues](https://github.com/maxqwars/metaform/issues) tab and filter tasks by label:
   - `good first issue` — small, self-contained tasks, ideal for getting familiar with the codebase.
   - `help wanted` — tasks where the project especially needs community help.
2. **Claim the task:** Leave a comment on the chosen issue (e.g., _"I'd like to work on this!"_) so we can assign it to you. This helps avoid multiple people working on the same thing at once.
3. **Link the PR to the task:** When creating a pull request, include a reference to the issue in the description (`Fixes #123` or `Closes #123`) so the issue closes automatically on merge.

## Suggestions and non-code contributions

You don't have to write code to help the project! We value ideas, feedback, and documentation improvements just as much.

### Proposing a new feature (Feature Request)

If you have an idea for a new feature or improvements to the Metaform API:

1. Check the existing [Issues](https://github.com/maxqwars/metaform/issues) to make sure the idea isn't already being discussed.
2. Create a new issue of type **Feature Request**.
3. In the description, try to include:
   - **Problem / use case:** Why is this feature needed? What real problem does it solve?
   - **Proposed solution:** What should the API or library behavior look like, in your opinion?
   - **Alternatives:** Have you considered other ways to solve this problem?

### Improving documentation

Found a typo, an inaccuracy in a type description, or a broken code example in the README/docs?

- For small fixes (typos, formatting), feel free to open a pull request directly against `develop`.
- For larger changes, it's better to open an issue first and discuss the approach.

# Bugs: reporting and fixing

### How to report a new bug

Before opening a thread in [GitHub Issues](https://github.com/maxqwars/metaform/issues):

1. **Check for duplicates:** Search to make sure the bug hasn't already been reported. If a similar issue exists, add your details to it instead.
2. **Check the version:** Make sure the problem reproduces on the latest version of Metaform.
3. **Prepare an MRE:** Provide a **Minimal Reproducible Example**.
4. **Include context:**
   - A short description of the problem;
   - Expected vs. actual behavior;
   - Minimal code or configuration;
   - Versions of Metaform, Node.js, and the runtime environment and its version (if you're not using Node.js)

### How to propose a fix for a reported bug

If you found an open bug issue and want to fix it:

1. **Claim the task:** Comment on the issue to say you're taking it on (_"I'd like to work on a fix for this!"_), to avoid duplicating work with other contributors.
2. **Link the PR to the issue:** In the pull request description, include a reference to the issue (`Fixes #123` or `Closes #123`) so it closes automatically on merge.
3. **Add a regression test:** A fix **must** be accompanied by a test in the `__tests__/` folder. It should fail without your fix and pass with it.
4. **Stay focused:** Don't include unrelated refactoring, formatting of other people's code, or new features in the PR.
5. **Preserve backward compatibility:** The fix must not break the public API or existing library behavior.

#### 💡 **What is a regression test and how do I write one?**

It's not a separate testing system — just a regular Vitest unit test. You simply add a new `it(...)` to an existing test file in the `__tests__/` folder next to the file you're fixing.

1. Write a test that reproduces the scenario from the issue (it should fail without your changes).
2. Make the fix in the source code so the test passes (`pnpm test`).
3. Submit the new test file and your bug fix in a single pull request.

> **Note:** You don't have to do everything in one commit. A good practice is to first commit the failing test (demonstrating the bug), then commit the fix that makes the test pass.

# Areas of responsibility

To clarify who prepares releases, who manages the environment, and who decides the library's development direction, we think it's important to explain the areas of responsibility.

### Maintainer

Responsible for maintaining the code, keeping branches stable, deciding on pull requests (merge/reject), and cutting releases. The maintainer controls the entire codebase — from tooling configuration and dependency versions to reviewing third-party code.

### Contributor

A volunteer developer helping to grow Metaform. You can submit code fixes, propose new features, find bugs, and improve documentation.

> ⚠️ **Architectural and infrastructure changes:**
> Third-party developers may propose improvements to the architecture, tooling, or major dependencies. However, any changes that significantly affect Metaform and its users **must be discussed in a separate issue beforehand**, to avoid unpleasant side effects and wasted effort on a PR.

# Security Policy

If you discover a potential security vulnerability in Metaform, please **do not open a public issue**.

Use the private [GitHub Security Advisories](https://github.com/maxqwars/metaform/security/advisories/new) mechanism, or contact the [maintainer](https://t.me/maxqwars) directly, so we can prepare a patch promptly before the issue is disclosed publicly.

# License & Recognition

- **MIT License:** Metaform is distributed under the [MIT](LICENSE) license.
- **License agreement:** By submitting a pull request, you confirm that your contribution will be published under the terms of the MIT license.
- **Contributor recognition:** Your name (or GitHub username) will be added to the `CONTRIBUTORS` file in gratitude for your help with the project.
