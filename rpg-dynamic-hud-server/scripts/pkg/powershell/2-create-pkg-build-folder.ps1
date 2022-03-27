$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

$projectRootPath = $args[0]
$pkgBuildOutDirName = $args[1]
$projectName = 'rpg-dynamic-hud-server'


cd $projectRootPath
if (Test-Path -Path $pkgBuildOutDirName) {
  Remove-Item $pkgBuildOutDirName -Recurse
}
New-Item $pkgBuildOutDirName -ItemType 'directory' | % { Write-Host "$($pkgBuildOutDirName) directory created." }
cd $pkgBuildOutDirName
New-Item $projectName -ItemType 'directory' | % { Write-Host "$($projectName) directory created." }