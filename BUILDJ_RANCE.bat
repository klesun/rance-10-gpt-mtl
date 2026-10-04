@echo off
cd /d "%~dp0"
node regenerate_aai_txt.cjs
if errorlevel 1 goto failed
if not exist build mkdir build
alice.exe ain edit -t regenerated.poprawione.ain.txt -o build\Rance10.ain Rance10.v1.04.ain
if errorlevel 1 goto failed
echo.
echo Gotowe: build\Rance10.ain
echo Zamknij gre i skopiuj ten plik do jej folderu.
pause
exit /b 0
:failed
echo.
echo Przerwano z powodu bledu. Pokaz komunikat z tego okna.
pause
exit /b 1
