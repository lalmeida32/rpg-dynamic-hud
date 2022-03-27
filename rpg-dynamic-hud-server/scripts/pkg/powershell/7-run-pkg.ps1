$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectRootPath = $args[0]
$pkgBuildOutDirName = $args[1]
$projectName = 'rpg-dynamic-hud-server'

cd $projectRootPath
cd $pkgBuildOutDirName
cd $projectName
yarn run pkgbuild
if ($LASTEXITCODE -ne 0) {
  Write-Error 'pkg build command failed.'
}
