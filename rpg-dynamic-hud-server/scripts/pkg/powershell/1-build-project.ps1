$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

cd $args[0]
cd '.\rpg-dynamic-hud-server\'
if (Test-Path -Path $args[1]) {
  Remove-Item $args[1] -Recurse
}
yarn run build
if (-not (Test-Path -Path $args[1])) {
  Write-Error 'build project command failed.'
}