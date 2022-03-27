$ErrorActionPreference = "Stop"
Set-PSDebug -Trace 0

cd $args[0]
if (Test-Path -Path $args[1]) {
  Remove-Item $args[1] -Recurse
}
New-Item $args[1] -ItemType 'directory'
cd $args[1]
New-Item temp -ItemType 'directory'