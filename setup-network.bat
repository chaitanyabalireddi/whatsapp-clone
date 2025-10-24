@echo off
echo ========================================
echo WhatsApp Clone - Network Setup (Windows)
echo ========================================
echo.
echo This script will help you set up the app for multiple devices
echo.

REM Get IP address
echo Finding your IP address...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    goto :found
)

:found
REM Remove leading space
set IP=%IP:~1%
echo [FOUND] Your IP Address: %IP%
echo.

echo ========================================
echo Configuration Instructions
echo ========================================
echo.
echo Please update the following files with your IP address:
echo.
echo 1. server\.env
echo    Change CLIENT_URL to: http://%IP%:3000
echo.
echo 2. client\.env
echo    Change REACT_APP_API_URL to: http://%IP%:5000/api
echo    Change REACT_APP_SOCKET_URL to: http://%IP%:5000
echo.
echo ========================================
echo Firewall Configuration
echo ========================================
echo.
echo Adding firewall rules for ports 3000 and 5000...
echo (You may need to run this script as Administrator)
echo.

REM Add firewall rules
netsh advfirewall firewall add rule name="WhatsApp Clone Frontend" dir=in action=allow protocol=TCP localport=3000 >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Could not add firewall rule for port 3000
    echo Please run this script as Administrator or add the rule manually
) else (
    echo [OK] Port 3000 allowed in firewall
)

netsh advfirewall firewall add rule name="WhatsApp Clone Backend" dir=in action=allow protocol=TCP localport=5000 >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Could not add firewall rule for port 5000
    echo Please run this script as Administrator or add the rule manually
) else (
    echo [OK] Port 5000 allowed in firewall
)

echo.
echo ========================================
echo Access URLs
echo ========================================
echo.
echo On this computer:
echo    http://localhost:3000
echo.
echo On other devices (same WiFi):
echo    http://%IP%:3000
echo.
echo ========================================
echo Next Steps
echo ========================================
echo.
echo 1. Update the .env files with the IP address shown above
echo 2. Restart the application (npm run dev)
echo 3. On your phone/other device, connect to the same WiFi
echo 4. Open browser and go to: http://%IP%:3000
echo 5. Register users on different devices and start chatting!
echo.
echo For detailed instructions, see: NETWORK_SETUP.md
echo.
pause

