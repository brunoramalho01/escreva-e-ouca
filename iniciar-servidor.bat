@echo off
echo.
echo ========================================
echo   Escreva e Ouca - Servidor Local
echo ========================================
echo.
echo Iniciando servidor... aguarde.
echo.
echo Quando abrir, acesse no Chrome:
echo   http://localhost:8080/escreva-e-ouca.html
echo.
echo Para fechar: pressione CTRL+C nesta janela.
echo.

:: Tenta Python 3 primeiro
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Usando Python...
    python -m http.server 8080
    goto fim
)

:: Tenta py launcher
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo Usando Python (py)...
    py -m http.server 8080
    goto fim
)

:: Tenta Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Usando Node.js...
    npx --yes serve -p 8080 .
    goto fim
)

:: Nenhum encontrado
echo.
echo ERRO: Python ou Node.js nao encontrado.
echo.
echo Instale Python em: https://python.org/downloads
echo (Marque a opcao "Add Python to PATH" durante a instalacao)
echo.
pause
:fim