# This file runs one deploy step on staging or production from your local machine.
param(
  # Pick where to deploy: staging uses "west", production uses "aliyun".
  [ValidateSet("staging", "prod", "production")]
  [string]$Target = "staging"
)

$ErrorActionPreference = "Stop"

# This picks the ssh host name to use.
$Remote = if ($Target -eq "staging") { "west" } else { "aliyun" }
Write-Host "Deploy target: $Target ($Remote)"

ssh $Remote "cd leadership-factory && bash ./03-update-db-deploy.sh"
if ($LASTEXITCODE -ne 0) {
  throw "Remote deploy step failed on $Target: 03-update-db-deploy.sh"
}
