#!/bin/bash
# Installs dependencies at the start of every Claude Code cloud session,
# so the dev server, tests, lint and build work without any setup.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

if ! command -v bun >/dev/null; then
  npm install -g bun
fi

# Reinstall only when the dependency files change.
hashes=node_modules/.session-start.sha256
if ! sha256sum --check --status "$hashes" 2>/dev/null; then
  rm -f "$hashes"
  bun install
  sha256sum .claude/hooks/session-start.sh package.json bun.lock bunfig.toml > "$hashes" || rm -f "$hashes"
fi
