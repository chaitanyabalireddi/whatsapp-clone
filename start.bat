@echo off
echo ========================================
echo Starting WhatsApp Clone (Windows)
echo ========================================
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo [ERROR] Dependencies not installed!
    echo Please run 'setup.bat' first
    pause
    exit /b 1
)

if not exist "server\node_modules" (
    echo [ERROR] Server dependencies not installed!
    echo Please run 'setup.bat' first
    pause
    exit /b 1
)

if not exist "client\node_modules" (
    echo [ERROR] Client dependencies not installed!
    echo Please run 'setup.bat' first
    pause
    exit /b 1
)

echo [OK] All dependencies found
echo.
echo Starting development servers...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers
call npm run dev

