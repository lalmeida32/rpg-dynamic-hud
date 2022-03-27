$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectName = $args[0]
$projectRootPath = $args[1]
$pkgBuildOutDirName = $args[2]

cd $projectRootPath
cd $pkgBuildOutDirName
Remove-Item $projectName -Recurse
