@echo off
echo ========================================
echo Setting up MongoDB Atlas Connection
echo ========================================
echo.

REM Update server/.env with MongoDB Atlas connection
(
echo PORT=5000
echo MONGODB_URI=mongodb+srv://ballireddychaitanya_db_user:Chaitu999@cluster0.6upwi0v.mongodb.net/?appName=Cluster0
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
echo NODE_ENV=development
echo.
echo # CORS
echo CLIENT_URL=http://localhost:3000
) > server\.env

echo [OK] Updated server\.env with MongoDB Atlas

REM Update client/.env
(
echo REACT_APP_API_URL=http://localhost:5000/api
echo REACT_APP_SOCKET_URL=http://localhost:5000
) > client\.env

echo [OK] Updated client\.env
echo.
echo ========================================
echo Configuration Complete!
echo ========================================
echo.
echo MongoDB Atlas: Connected to cluster0.6upwi0v.mongodb.net
echo Access URL: http://localhost:3000
echo.
echo Next steps:
echo 1. Stop your current server (Ctrl+C)
echo 2. Run: npm run dev
echo 3. Look for "MongoDB Connected" message
echo 4. Go to: http://localhost:3000
echo 5. Try registration again!
echo.
pause

