$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectName = $args[0]
$projectRootPath = $args[1]
$projectBuildOutDirName = $args[2]
$pkgBuildOutDirName = $args[3]

cd $projectRootPath
Copy-Item -Path ".\$($projectName)\$($projectBuildOutDirName)" -Destination ".\$($pkgBuildOutDirName)\$($projectName)" -Recurse