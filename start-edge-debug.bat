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

start "" "%EDGE_EXE%" --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\EdgeDebugProfile" https://padlet.com

echo Edge launched! Verifying CDP port at http://127.0.0.1:9222/json
pause
