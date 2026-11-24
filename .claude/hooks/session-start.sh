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

# ffmpeg turns demo recordings into MP4s that play in the Claude mobile app.
if ! command -v ffmpeg >/dev/null; then
  (apt-get update && apt-get install -y ffmpeg) >/dev/null 2>&1 || echo "ffmpeg install failed; demos will be .webm"
fi

# Reinstall only when the dependency files change.
hashes=node_modules/.session-start.sha256
if ! sha256sum --check --status "$hashes" 2>/dev/null; then
  rm -f "$hashes"
  bun install
  sha256sum .claude/hooks/session-start.sh package.json bun.lock bunfig.toml > "$hashes" || rm -f "$hashes"
fi
