@echo off
echo ================================
echo WildScape Europe - Dev Server
echo ================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo Server will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ================================
echo.
call npm run dev

