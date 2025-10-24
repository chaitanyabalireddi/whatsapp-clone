@echo off
echo Creating .env files...
echo.

REM Create server/.env
(
echo PORT=5000
echo MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
echo NODE_ENV=development
echo.
echo # CORS
echo CLIENT_URL=http://localhost:3000
) > server\.env

echo [OK] Created server\.env

REM Create client/.env
(
echo REACT_APP_API_URL=http://localhost:5000/api
echo REACT_APP_SOCKET_URL=http://localhost:5000
) > client\.env

echo [OK] Created client\.env
echo.
echo ========================================
echo .env files created successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Run 'ipconfig' to find your IP address
echo 2. Update CLIENT_URL in server\.env with your IP
echo 3. Update both URLs in client\.env with your IP
echo 4. Run 'npm run dev' to start the servers
echo.
pause

