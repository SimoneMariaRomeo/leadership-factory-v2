# This file runs one deploy step on west from your local machine.
$ErrorActionPreference = "Stop"

ssh west "cd leadership-factory && bash ./06-health-checks-deploy.sh"
if ($LASTEXITCODE -ne 0) {
  throw "Remote deploy step failed: 06-health-checks-deploy.sh"
}
