@echo off
echo ========================================
echo Setting up for Multi-Device Access
echo ========================================
echo.

REM Update server/.env with MongoDB Atlas and IP-based CORS
(
echo PORT=5000
echo MONGODB_URI=mongodb+srv://ballireddychaitanya_db_user:Chaitu999@cluster0.6upwi0v.mongodb.net/?appName=Cluster0
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
echo NODE_ENV=development
echo.
echo # CORS - Allow access from network IP
echo CLIENT_URL=http://10.60.21.25:3000
) > server\.env

echo [OK] Updated server\.env for network access

REM Update client/.env to use IP address
(
echo REACT_APP_API_URL=http://10.60.21.25:5000/api
echo REACT_APP_SOCKET_URL=http://10.60.21.25:5000
) > client\.env

echo [OK] Updated client\.env for network access
echo.
echo ========================================
echo Configuration Complete!
echo ========================================
echo.
echo Access URLs:
echo   Computer:      http://10.60.21.25:3000
echo   Mobile/Phone:  http://10.60.21.25:3000
echo.
echo Next steps:
echo 1. Make sure firewall allows ports 3000 and 5000
echo 2. Stop your server (Ctrl+C)
echo 3. Run: npm run dev
echo 4. On computer: http://10.60.21.25:3000
echo 5. On phone: http://10.60.21.25:3000
echo.
echo Both devices must be on the SAME WiFi network!
echo.
pause

