@echo off
echo ========================================
echo Fixing CORS Configuration
echo ========================================
echo.

REM Update server/.env to allow both localhost and IP
(
echo PORT=5000
echo MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
echo NODE_ENV=development
echo.
echo # CORS - Allow both localhost and network IP
echo CLIENT_URL=http://localhost:3000
) > server\.env

echo [OK] Updated server\.env for localhost access
echo.

REM Update client/.env for localhost
(
echo REACT_APP_API_URL=http://localhost:5000/api
echo REACT_APP_SOCKET_URL=http://localhost:5000
) > client\.env

echo [OK] Updated client\.env for localhost access
echo.
echo ========================================
echo Configuration updated!
echo ========================================
echo.
echo IMPORTANT: You need MongoDB!
echo.
echo Option 1 - Use MongoDB Atlas (Cloud - Recommended):
echo   1. Go to: https://www.mongodb.com/cloud/atlas/register
echo   2. Create free cluster
echo   3. Get connection string
echo   4. Run: UPDATE_MONGODB.bat
echo   5. Paste connection string
echo.
echo Option 2 - Install MongoDB Locally:
echo   Download from: https://www.mongodb.com/try/download/community
echo.
echo After setting up MongoDB:
echo   1. Restart server: npm run dev
echo   2. Try registration again
echo.
pause

