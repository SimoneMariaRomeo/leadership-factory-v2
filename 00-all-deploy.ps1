# This file runs all deploy steps on west from your local machine.
$ErrorActionPreference = "Stop"

ssh west "cd leadership-factory && bash ./00-all-deploy.sh"
if ($LASTEXITCODE -ne 0) {
  throw "Remote deploy failed: 00-all-deploy.sh"
}
