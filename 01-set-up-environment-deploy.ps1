# This file runs one deploy step on west from your local machine.
$ErrorActionPreference = "Stop"

ssh west "cd leadership-factory && bash ./01-set-up-environment-deploy.sh"
if ($LASTEXITCODE -ne 0) {
  throw "Remote deploy step failed: 01-set-up-environment-deploy.sh"
}
