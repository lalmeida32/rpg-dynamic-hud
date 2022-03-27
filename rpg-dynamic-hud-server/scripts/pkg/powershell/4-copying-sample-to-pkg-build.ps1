$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectRootPath = $args[0]
$pkgRootPath = $args[1]
$pkgBuildOutDirName = $args[2]
$projectName = 'rpg-dynamic-hud-server'

cd $projectRootPath
Copy-Item -Path "$($pkgRootPath)\sample\*" -Destination ".\$($pkgBuildOutDirName)" -Recurse