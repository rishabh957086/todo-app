@echo off
echo ============================================
echo   TaskMaster - Full-Stack To-Do App
echo ============================================
echo.
echo Starting both servers...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop servers
echo ============================================
echo.

REM Start backend in a new window
start "TaskMaster Backend" cmd /k "cd backend && npm run dev"

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Start frontend in a new window
start "TaskMaster Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Check the new windows for status
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:5173
