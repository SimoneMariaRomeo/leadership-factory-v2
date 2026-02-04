#!/usr/bin/env bash
# This script checks the repo and saves basic deploy settings.
set -e

STATE_FILE="/tmp/lf-deploy-state"

echo "== LOAD ENV =="
if [ ! -f secrets.env ]; then
  echo "ERROR: secrets.env missing"
  exit 1
fi

set -a
. ./secrets.env
set +a

APP_ENV="${APP_ENV:-production}"
APP_NAME="leadership-factory-${APP_ENV}"

if [ -z "${PORT:-}" ]; then
  echo "ERROR: PORT is missing in secrets.env"
  exit 1
fi

if [ "$APP_ENV" = "staging" ]; then
  HOST="staging.leadership-factory.cn"
else
  HOST="leadership-factory.cn"
fi

echo "== PRECHECK: repo + branch =="
git remote -v
git branch --show-current

BEFORE="$(git rev-parse HEAD)"
echo "Before: $BEFORE"

# This saves values so later steps can read them.
cat > "$STATE_FILE" <<STATE
APP_ENV=$APP_ENV
APP_NAME=$APP_NAME
PORT=$PORT
HOST=$HOST
BEFORE=$BEFORE
STATE

echo "Saved deploy state to $STATE_FILE"
