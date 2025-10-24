@echo off
echo ========================================
echo Updating .env files with IP: 10.60.21.25
echo ========================================
echo.

REM Update server/.env
(
echo PORT=5000
echo MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
echo NODE_ENV=development
echo.
echo # CORS
echo CLIENT_URL=http://10.60.21.25:3000
) > server\.env

echo [OK] Updated server\.env

REM Update client/.env
(
echo REACT_APP_API_URL=http://10.60.21.25:5000/api
echo REACT_APP_SOCKET_URL=http://10.60.21.25:5000
) > client\.env

echo [OK] Updated client\.env
echo.
echo ========================================
echo Configuration complete!
echo ========================================
echo.
echo Your access URLs:
echo   Computer:      http://localhost:3000
echo   Other devices: http://10.60.21.25:3000
echo.
echo Next steps:
echo 1. Make sure MongoDB is running (mongod)
echo 2. Run: npm run dev
echo 3. On computer, go to: http://localhost:3000
echo 4. On phone, go to: http://10.60.21.25:3000
echo.
pause

