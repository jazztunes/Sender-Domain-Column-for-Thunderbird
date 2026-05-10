@echo off
cd /d "%~dp0"
powershell -NoProfile -Command "Remove-Item -ErrorAction Ignore sender-domain-column.xpi; Compress-Archive -Path src\* -DestinationPath sender-domain-column.zip; Rename-Item sender-domain-column.zip sender-domain-column.xpi"
echo Built sender-domain-column.xpi
