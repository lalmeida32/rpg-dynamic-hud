$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectRootPath = $args[0]
$projectBuildOutDirName = $args[1]
$pkgBuildOutDirName = $args[2]
$projectName = 'rpg-dynamic-hud-server'

cd $projectRootPath
Copy-Item -Path ".\$($projectName)\$($projectBuildOutDirName)" -Destination ".\$($pkgBuildOutDirName)\$($projectName)" -Recurse