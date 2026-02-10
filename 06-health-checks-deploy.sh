#!/usr/bin/env bash
# This script checks that the app is up and routed by Nginx.
set -e

STATE_FILE="/tmp/lf-deploy-state"
if [ ! -f "$STATE_FILE" ]; then
  echo "ERROR: deploy state missing, run 01-set-up-environment-deploy.sh first"
  exit 1
fi

set -a
. "$STATE_FILE"
set +a

if [ -z "${APP_NAME:-}" ] || [ -z "${PORT:-}" ] || [ -z "${HOST:-}" ]; then
  echo "ERROR: APP_NAME, PORT, or HOST missing"
  exit 1
fi

echo "== HEALTH CHECKS =="
pm2 list
curl -sI "http://127.0.0.1:$PORT" | head -n 20
curl -sI -k -H "Host: $HOST" https://127.0.0.1 | head -n 30
pm2 logs "$APP_NAME" --lines 30 --nostream
