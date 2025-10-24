@echo off
echo ========================================
echo Update MongoDB Connection String
echo ========================================
echo.
echo Please enter your MongoDB Atlas connection string:
echo (It looks like: mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/...)
echo.
set /p MONGO_URI="Paste connection string here: "
echo.

REM Update server/.env with new MongoDB URI
(
echo PORT=5000
echo MONGODB_URI=%MONGO_URI%
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
echo NODE_ENV=development
echo.
echo # CORS
echo CLIENT_URL=http://10.60.21.25:3000
) > server\.env

echo.
echo [OK] Updated server\.env with MongoDB Atlas connection
echo.
echo ========================================
echo Configuration complete!
echo ========================================
echo.
echo Next step: Restart your server
echo   1. Stop npm run dev (Ctrl+C)
echo   2. Run: npm run dev
echo   3. Look for "MongoDB Connected"
echo.
pause

