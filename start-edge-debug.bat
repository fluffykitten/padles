@echo off
REM =========================================================================
REM Padles — Launch Microsoft Edge with Remote Debugging (Port 9222)
REM Enables REA & Antigravity to automate, inspect and compare live Padlet.
REM =========================================================================

echo Starting Microsoft Edge with Remote Debugging on port 9222...

set "EDGE_EXE="

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    set "EDGE_EXE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    set "EDGE_EXE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
) else (
    set "EDGE_EXE=msedge.exe"
)

REM Ensure debug profile directory exists
if not exist "%LOCALAPPDATA%\EdgeDebugProfile" (
    mkdir "%LOCALAPPDATA%\EdgeDebugProfile"
)

set "LOCAL_CLONE=%~dp0index.html"
set "REF_PADLET=https://padlet.com/ezzarscarlet/physics-audio-reflections-i-see-i-think-i-wonder-s0248vnouoewo8lw6wn6/wish/PVKBQOrEoXD5aj5x"

start "" "%EDGE_EXE%" --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\EdgeDebugProfile" --no-first-run --allow-file-access-from-files "%REF_PADLET%" "%LOCAL_CLONE%"

echo.
echo Edge launched with CDP port 9222!
echo - Reference Padlet: %REF_PADLET%
echo - Local Clone:      %LOCAL_CLONE%
echo.
echo Verifying CDP port...
timeout /t 2 /nobreak >nul
powershell -NoProfile -Command "try { $v = Invoke-RestMethod http://127.0.0.1:9222/json/version; Write-Host '[SUCCESS] CDP Port 9222 active:' $v.Browser } catch { Write-Host '[WARNING] Port 9222 not reachable yet. Please check if Edge is running.' }"
echo.
pause
