@echo off
echo ========================================
echo   Beacon World App - Web服务器启动器
echo ========================================
echo.

echo 正在启动本地Web服务器...
echo.
echo 应用将在浏览器中自动打开
echo 如果没有自动打开，请手动访问: http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo.

REM 检查Python是否可用
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 使用Python启动服务器...
    echo.
    start "" http://localhost:8080
    python -m http.server 8080
    goto end
)

REM 检查Node.js是否可用
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 使用Node.js启动服务器...
    echo.
    start "" http://localhost:8080
    npx http-server -p 8080
    goto end
)

REM 如果都没有，提供手动方法
echo 未找到Python或Node.js
echo.
echo 请选择以下方法之一:
echo.
echo 方法1: 安装Python
echo   1. 访问 https://python.org
echo   2. 下载并安装Python
echo   3. 重新运行此脚本
echo.
echo 方法2: 使用浏览器直接打开
echo   1. 双击 index.html 文件
echo   2. 注意: 某些功能可能受限
echo.
echo 方法3: 使用其他Web服务器
echo   如 IIS、Apache、Nginx等
echo.

:end
pause
