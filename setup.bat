@echo off
echo ========================================
echo WhatsApp Clone - Setup Script (Windows)
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)
echo [OK] Node.js found: 
node --version
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)
echo [OK] npm found:
npm --version
echo.

echo Installing dependencies...
echo.

echo Installing root dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install root dependencies
    pause
    exit /b 1
)

echo Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install server dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

echo Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install client dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo [SUCCESS] Installation complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Check environment variables in server\.env and client\.env
echo 3. Run 'npm run dev' to start both servers
echo.
echo The app will be available at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo Happy coding!
echo.
pause

