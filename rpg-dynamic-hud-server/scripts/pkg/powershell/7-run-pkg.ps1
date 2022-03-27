$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectName = $args[0]
$projectRootPath = $args[1]
$pkgBuildOutDirName = $args[2]

cd $projectRootPath
cd $pkgBuildOutDirName
cd $projectName
yarn run pkgbuild
if ($LASTEXITCODE -ne 0) {
  Write-Error 'pkg build command failed.'
}
