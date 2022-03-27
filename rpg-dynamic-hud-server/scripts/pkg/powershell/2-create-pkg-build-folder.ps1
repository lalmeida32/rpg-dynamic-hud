$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectName = $args[0]
$projectRootPath = $args[1]
$pkgBuildOutDirName = $args[2]


cd $projectRootPath
if (Test-Path -Path $pkgBuildOutDirName) {
  Remove-Item $pkgBuildOutDirName -Recurse
}
New-Item $pkgBuildOutDirName -ItemType 'directory' | % { Write-Host "$($pkgBuildOutDirName) directory created." }
cd $pkgBuildOutDirName
New-Item $projectName -ItemType 'directory' | % { Write-Host "$($projectName) directory created." }