@echo off
echo ========================================
echo     Beacon World App - Web版启动器
echo ========================================
echo.

echo 选择启动方式:
echo.
echo [1] 启动本地Web服务器 (推荐)
echo [2] 直接在浏览器中打开
echo [3] 查看使用说明
echo.
set /p choice=请选择 (1-3): 

if "%choice%"=="1" goto webserver
if "%choice%"=="2" goto direct
if "%choice%"=="3" goto help
goto webserver

:webserver
echo.
echo 正在启动Web服务器...
call "启动Web服务器.bat"
goto end

:direct
echo.
echo 正在直接打开应用...
echo 注意: 某些功能可能受限于浏览器安全策略
echo.
start "" index.html
goto end

:help
echo.
echo ========================================
echo           使用说明
echo ========================================
echo.
echo Web版特点:
echo ✅ 无需安装任何软件
echo ✅ 跨平台兼容 (Windows/Mac/Linux)
echo ✅ 自动更新
echo ✅ 轻量级部署
echo.
echo 推荐浏览器:
echo - Chrome (推荐)
echo - Edge
echo - Firefox
echo - Safari
echo.
echo 系统要求:
echo - 现代浏览器
echo - 网络连接 (首次加载)
echo - 1GB+ RAM
echo.
echo 功能说明:
echo - 完整的应用功能
echo - 响应式设计
echo - 触摸屏支持
echo.
pause
goto end

:end
