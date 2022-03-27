$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectRootPath = $args[0]
$projectBuildOutDirName = $args[1]
$projectName = 'rpg-dynamic-hud-server'

cd $projectRootPath
cd ".\$($projectName)\"
if (Test-Path -Path $projectBuildOutDirName) {
  Remove-Item $projectBuildOutDirName -Recurse
}
yarn run build
if (-not (Test-Path -Path $projectBuildOutDirName)) {
  Write-Error 'build project command failed.'
}