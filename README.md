# SSH Desktop

A Windows 11 desktop application for saved SSH connections and independent terminal sessions.

**Status: initial project scaffold.** The desktop window, application theme, typed preload bridge,
and development checks are working. SSH connections, terminal emulation, saved profiles, split
panes, detached tabs, and an installer will be implemented after this initial repository checkpoint.

## Run locally

Use Node.js 24 (24.13.0 or newer) and npm 11. The development environment and CI use the version
in [`.node-version`](.node-version). Run these commands from the repository root:

```powershell
npm ci
npm run dev
```

The app opens a native Electron window. Development uses `http://127.0.0.1:5173`; that port must be
available. Stop the development process with `Ctrl+C` in the terminal.

To preview a production build:

```powershell
npm run build
npm start
```

`out/` contains generated application files. This build is a local preview, not a Windows installer.
If PowerShell blocks the `npm.ps1` launcher, use `npm.cmd` in place of `npm`.

## Development commands

| Command                | Purpose                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| `npm run dev`          | Launch Electron with renderer hot reload.                                    |
| `npm run typecheck`    | Check Main/Preload, Renderer, and environment-independent Shared separately. |
| `npm run lint`         | Run ESLint, including renderer import restrictions.                          |
| `npm run format`       | Format project files; preserve the supplied architecture document.           |
| `npm run format:check` | Verify formatting without changing files.                                    |
| `npm run check`        | Run type checks, lint, and formatting checks.                                |
| `npm run build`        | Type-check and compile the desktop application.                              |
| `npm start`            | Launch the existing production build.                                        |

GitHub Actions runs a clean install, checks, and a build on Windows. Automated feature tests will be
added with session, storage, and IPC behavior; the initial scaffold has no feature test suite.

## Project structure

```text
src/
  main/             Application lifecycle, windows, and validated IPC handlers
  preload/          Implementation of the narrow window.desktop API
  renderer/         Plain TypeScript, HTML, CSS, and the Dark Modern app theme
  shared/           Serializable contracts and IPC channel names
.github/workflows/  Windows checks and build
```

Main will own SSH connections, persistent data, credentials, and window ownership. Renderer owns
the interface and accesses desktop capabilities through named preload operations. The starter API
exposes only `window.desktop.app.getInfo()`. Windows enable context isolation and sandboxing, disable
Node integration, deny permission requests and popups, and block navigation. IPC validates its sender
and arguments. New feature modules will be added alongside their implementation.

The build uses [electron-vite](https://electron-vite.org/guide/). Window and preload boundaries follow
the [Electron security guidance](https://www.electronjs.org/docs/latest/tutorial/security).
Direct dependency versions and the npm lockfile are committed for reproducible installs. Vite 7
matches electron-vite 5's peer dependency range, and TypeScript 5.9 matches the lint tooling.

## Specification and references

- [Architecture and implementation plan](ssh-desktop-architecture.md) — original Bulgarian specification.
- [Reference 1](image1.png) — connections sidebar and terminal tabs.
- [Reference 2](image2.png) — split terminal workspace.
- [Reference 3](image3.png) — detached windows.

The original document and images remain unchanged. The document defines behavior and colors;
the images guide layout. The future terminal uses Ubuntu Classic, independently of the Dark Modern
application theme, and will bundle Ubuntu Mono with its license.

## Implementation milestones

1. One real SSH session: xterm.js, `ssh2`, host-key approval, authentication, input/output, resize, cleanup.
2. Saved profiles, settings, independent tabs, and explicitly saved encrypted credentials.
3. Detach tabs while preserving live sessions and terminal state, including rollback on failure.
4. Split panes, workspace persistence, Windows installer, and DPI/installation verification.

These milestones follow section 15 of the architecture document. There are no simulated SSH sessions
or saved credentials in this scaffold.

## Initial GitHub commit

This folder is ready for the initial commit. Review the files, then run:

```powershell
git add .
git commit -m "chore: initialize SSH Desktop project"
```

Create an empty GitHub repository, add its URL as the `origin` remote, and push `main`. Dependencies,
build output, temporary files, environment files, and common credential files are excluded by
`.gitignore`. No remote or commit is created automatically.

The project is private and marked `UNLICENSED` until a distribution license is chosen.
