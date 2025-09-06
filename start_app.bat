@echo off
echo Starting Cattle Breed Recognition Application...
echo.

echo [1/2] Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0 && .venv\Scripts\python.exe backend/app.py"

echo [2/2] Starting Frontend Development Server...
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul
