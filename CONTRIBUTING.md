# Contributing Guide

Thank you for taking the time to contribute to Metaform! This document outlines the guidelines and workflow for contributing to the project.

# Branching Strategy

> **⚠️ Important:** Until version `2.0` is released, the `main` branch **does not reflect the current version published on npm**. This is a temporary exception for the `2.0` release preparation. Once `2.0` is released, this notice will be removed, and `main` and `develop` will follow the workflow described below.

### Development Branches

Submit all changes to the `develop` branch. This branch is meant for active development and may contain both new features and unreleased changes.

After version `2.0` is released, the `main` branch will always contain the **latest stable version of the library**, matching the most recent release on npm.

Changes move from `develop` to `main` only when preparing a new release. Therefore, `main` must never contain breaking changes relative to the current `latest` version.

**In short:**

- `develop` — all active development and new changes.
- `main` — the latest stable version published on npm.
- `main` must remain backward-compatible with the current `latest`.
- Breaking changes require a version bump before merging into `main`.

# Semantic Versioning

Metaform follows [Semantic Versioning](https://semver.org/). We issue `patch` releases for bug fixes, `minor` releases for new features and backward-compatible additions, and `major` releases for breaking changes.

# Local Development

### Prerequisites

- **Node.js** (`v24.19.0` or higher)
- **Package Manager:** `pnpm`

### Quick Start

1. Fork the repository and clone it locally:

```bash
git clone [https://github.com/maxqwars/metaform.git](https://github.com/maxqwars/metaform.git)
cd metaform/
```

2. Install dependencies:

```bash
pnpm install
```

3. Build the project:

```bash
pnpm build
```

### Useful Commands

- `pnpm dev` — run the bundler in watch mode.
- `pnpm test` — run unit tests using Vitest.
- `pnpm test:coverage` — run tests with coverage reporting.
- `pnpm typecheck` — run TypeScript type checking.
- `pnpm lint` — check code with ESLint.
- `pnpm format` — format code using Prettier.

> 💡 **Architecture & Codebase Overview:** Before writing code or adding new API endpoints, please review the [Architecture Guide (ARCHITECTURE.md WIP)](ARCHITECTURE.md). It details the directory layout, DTO/Guard patterns, and a step-by-step checklist for adding a new API.

# Code Standards and Commit Guidelines

We use Husky and lint-staged to enforce formatting checks before commits, and we follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

`<type>(<scope>): <short description>`

**Common types:**

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `refactor:` — code refactoring without changing the public API
- `test:` — adding or updating tests

_Example:_ `fix(core): resolve null pointer in user parsing`

# Submitting a Pull Request

1. Ensure your PR targets the `develop` branch.
2. State the issue your PR resolves in the description (e.g., `Fixes #123`).
3. **Do not update** the version in `package.json` or `CHANGELOG.md` — release versioning is handled centrally during releases.
4. Ensure all check scripts (`pnpm typecheck`, `pnpm test`, `pnpm lint`) pass successfully before submitting.

# Reporting Issues

We use [GitHub Issues](https://github.com/maxqwars/metaform/issues) to track bugs and feature requests.

Before creating a new issue, search existing issues to make sure it hasn't been reported yet. If you find a similar issue, add a comment with your additional context instead of creating a duplicate.

#### Submitting a Bug Report

Make sure the issue is reproducible on the latest version of Metaform.
When reporting a bug, please provide a **Minimal Reproducible Example**. The easier it is to reproduce the issue, the faster we can investigate and fix it.

A good bug report should include:

- A clear, concise description of the problem;
- Expected behavior;
- Actual behavior;
- A minimal code sample or configuration reproducing the issue;
- Metaform version;
- Node.js version and any relevant environment details.

If the bug depends on a specific environment, please also specify the OS and other relevant context.
