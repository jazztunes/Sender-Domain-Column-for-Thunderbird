# Thunderbird Sender Domain Column — CLAUDE.md

## What this is
A Thunderbird MailExtension (WebExtension + Experiment API) that adds a "Sender Domain" column to the message list. It extracts the apex domain from the sender's email address, collapsing subdomains.

## File layout
```
src/
  manifest.json       — Extension entry point. manifest_version 2, targets TB 115+.
  background.js       — Calls browser.customColumns.add() once at startup.
  schema.json         — Defines the customColumns.add(id, name, field) Experiment API shape.
  implementation.js   — The actual column logic; runs in Thunderbird's parent process.
build.bat             — PowerShell one-liner that zips src/* into sender-domain-column.xpi.
```

## Architecture
Thunderbird doesn't expose a standard WebExtension API for custom thread-pane columns, so this uses an **Experiment API** — a thin privileged shim that bridges background.js (sandboxed) to `ThreadPaneColumns` (Thunderbird internals).

- `schema.json` declares the API surface visible to background.js
- `implementation.js` implements it, extending `ExtensionCommon.ExtensionAPI`
- `background.js` consumes it via `browser.customColumns.*`

## Key implementation detail: ThreadPaneColumns import
The module path changed in Thunderbird 128:
- TB 115–127: `chrome://messenger/content/thread-pane-columns.mjs`
- TB 128+:    `chrome://messenger/content/ThreadPaneColumns.mjs`

`implementation.js` tries the new path first and falls back to the old one.

## Domain extraction logic (implementation.js)
`normalizeAddress()` strips display-name wrappers (`"Name" <email>` → `email`).  
`getApexDomain()` splits on `.` and returns the last 2 parts, or last 3 parts when the second-to-last segment is a known ccSLD (`co`, `com`, `net`, `org`, `gov`, `edu`, `ac`, `me`, `ne`).

## Building
```bat
build.bat
```
Produces `sender-domain-column.xpi` in the project root. Requires PowerShell (built into Windows).

## Manifest version note
Uses manifest_version 2. Version 3 is supported since TB 128 but offers no benefit here and would require migrating background scripts to service workers. Stick with v2 unless there's a specific reason to upgrade.
