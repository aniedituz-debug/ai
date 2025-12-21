@echo off
title Alya AI Server
echo ==========================================
echo Alya AI Offlayn Serverni ishga tushirish
echo ==========================================
echo.

cd /d "%~dp0"

:: Kill any existing process on port 3000 to prevent errors
echo [TIZIM] Port 3000 tozalanmoqda...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

:: Check if node_modules exists
if not exist node_modules (
    echo [DASTLABKI SOZLASH] Kerakli kutubxonalar o'rnatilmoqda...
    echo Iltimos, kuting. Bu bir necha vaqt olishi mumkin...
    call npm install
    echo.
    echo O'rnatish yakunlandi!
    echo.
)

:: Start the server
echo [SERVER] Alya AI Server ishga tushirilmoqda...
echo Brauzerda http://localhost:3000 manzilini oching.
echo.
echo Model fayli holati:
if exist model.gguf (
    echo [OK] model.gguf topildi. Real AI ishlaydi.
) else (
    echo [OGOHLANTIRISH] model.gguf topilmadi. Mock Mode (Test rejim) ishlaydi.
)
echo.
call npm start

pause
