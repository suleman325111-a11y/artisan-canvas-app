@echo off
echo ========================================================
echo   Launching Artisan Canvas Gallery & Custom Art Studio
echo ========================================================
echo.
echo Starting local web server on http://localhost:8080 ...
echo Press Ctrl+C in this window to stop the server.
echo.
start http://localhost:8080
python -m http.server 8080
pause
