# This file runs one deploy step on west from your local machine.
$ErrorActionPreference = "Stop"

ssh west "cd leadership-factory && bash ./02-update-code-deploy.sh"
if ($LASTEXITCODE -ne 0) {
  throw "Remote deploy step failed: 02-update-code-deploy.sh"
}
