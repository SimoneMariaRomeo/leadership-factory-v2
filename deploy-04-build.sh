#!/usr/bin/env bash
# This script installs deps if needed and builds the app.
set -e

STATE_FILE="/tmp/lf-deploy-state"
if [ ! -f "$STATE_FILE" ]; then
  echo "ERROR: deploy state missing, run deploy-01-set-up-environment.sh first"
  exit 1
fi

set -a
. "$STATE_FILE"
set +a

if [ "${CHANGED_DEPS:-0}" -eq 1 ]; then
  echo "Deps changed -> installing"
  pnpm install --frozen-lockfile --registry https://registry.npmmirror.com
else
  echo "Deps unchanged -> skipping install"
fi

rm -rf .next
pnpm build
