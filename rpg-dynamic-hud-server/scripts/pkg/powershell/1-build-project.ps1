$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectName = $args[0]
$projectRootPath = $args[1]
$projectBuildOutDirName = $args[2]

cd $projectRootPath
cd $projectName
if (Test-Path -Path $projectBuildOutDirName) {
  Remove-Item $projectBuildOutDirName -Recurse
}
yarn run build
if ($LASTEXITCODE -ne 0) {
  Write-Error 'build command failed.'
}
if (-not (Test-Path -Path $projectBuildOutDirName)) {
  Write-Error 'project build out dir not found.'
}