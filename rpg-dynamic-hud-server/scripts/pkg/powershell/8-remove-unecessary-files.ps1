$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectRootPath = $args[0]
$pkgBuildOutDirName = $args[1]
$projectName = 'rpg-dynamic-hud-server'

cd $projectRootPath
cd $pkgBuildOutDirName
Remove-Item $projectName -Recurse
