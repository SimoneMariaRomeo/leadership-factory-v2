#!/usr/bin/env bash
# This script runs database updates only when needed.
set -e

STATE_FILE="/tmp/lf-deploy-state"
if [ ! -f "$STATE_FILE" ]; then
  echo "ERROR: deploy state missing, run deploy-01-set-up-environment.sh first"
  exit 1
fi

set -a
. "$STATE_FILE"
set +a

echo "== LOAD ENV =="
if [ ! -f secrets.env ]; then
  echo "ERROR: secrets.env missing"
  exit 1
fi

set -a
. ./secrets.env
set +a

if [ "${CHANGED_DB:-0}" -eq 1 ]; then
  pnpm exec prisma migrate deploy
  pnpm exec prisma generate
else
  echo "DB unchanged -> skipping prisma migrate/generate"
fi
