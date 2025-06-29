@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Beacon World App - GitHub部署助手
echo ========================================
echo.

echo 此脚本将帮助您将应用部署到GitHub Pages
echo.

REM 检查Git是否安装
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到Git
    echo.
    echo 请先安装Git:
    echo 1. 访问 https://git-scm.com/download/win
    echo 2. 下载并安装Git
    echo 3. 重新运行此脚本
    echo.
    pause
    exit /b 1
)

echo ✅ Git已安装
echo.

echo 请按照以下步骤操作:
echo.
echo [步骤1] 在GitHub上创建新仓库
echo 1. 访问 https://github.com/new
echo 2. 仓库名称建议: beacon-world-app
echo 3. 设置为Public
echo 4. 勾选 "Add a README file"
echo 5. 点击 "Create repository"
echo.

set /p repo_created=已创建GitHub仓库? (Y/N): 
if /i not "%repo_created%"=="Y" (
    echo 请先创建GitHub仓库，然后重新运行此脚本
    pause
    exit /b 1
)

echo.
echo [步骤2] 输入仓库信息
set /p github_username=请输入您的GitHub用户名: 
set /p repo_name=请输入仓库名称 (默认: beacon-world-app): 

if "%repo_name%"=="" set repo_name=beacon-world-app

echo.
echo 仓库信息:
echo 用户名: %github_username%
echo 仓库名: %repo_name%
echo 仓库URL: https://github.com/%github_username%/%repo_name%.git
echo 网站URL: https://%github_username%.github.io/%repo_name%/
echo.

set /p confirm=信息正确? (Y/N): 
if /i not "%confirm%"=="Y" (
    echo 请重新运行脚本并输入正确信息
    pause
    exit /b 1
)

echo.
echo [步骤3] 克隆仓库并部署
echo.

REM 创建临时目录
set TEMP_DIR=%TEMP%\beacon-world-deploy
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

echo 正在克隆仓库...
cd /d "%TEMP_DIR%"
git clone https://github.com/%github_username%/%repo_name%.git
if %errorlevel% neq 0 (
    echo ❌ 克隆失败，请检查:
    echo 1. 仓库URL是否正确
    echo 2. 网络连接是否正常
    echo 3. GitHub访问权限
    pause
    exit /b 1
)

echo ✅ 仓库克隆成功
echo.

echo 正在复制Web文件...
cd "%repo_name%"

REM 复制所有Web文件
xcopy "%~dp0*" "." /E /I /Y /Q >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 文件复制失败
    pause
    exit /b 1
)

REM 删除不需要的文件
del /q "一键部署到GitHub.bat" >nul 2>&1
del /q "启动*.bat" >nul 2>&1
del /q "server.py" >nul 2>&1
del /q "server.js" >nul 2>&1

echo ✅ 文件复制完成
echo.

echo 正在提交更改...
git add .
git commit -m "Deploy Beacon World App to GitHub Pages"
if %errorlevel% neq 0 (
    echo ❌ 提交失败
    pause
    exit /b 1
)

echo ✅ 更改已提交
echo.

echo 正在推送到GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ 推送失败，可能需要身份验证
    echo.
    echo 请尝试:
    echo 1. 配置Git凭据
    echo 2. 使用GitHub Desktop
    echo 3. 手动推送
    pause
    exit /b 1
)

echo ✅ 推送成功！
echo.

echo [步骤4] 启用GitHub Pages
echo.
echo 请手动完成以下步骤:
echo 1. 访问 https://github.com/%github_username%/%repo_name%/settings/pages
echo 2. 在 "Source" 选择 "Deploy from a branch"
echo 3. 选择 "main" 分支
echo 4. 选择 "/ (root)" 文件夹
echo 5. 点击 "Save"
echo.

echo ========================================
echo           部署完成！
echo ========================================
echo.
echo 🎉 您的应用将在以下地址可用:
echo 📍 https://%github_username%.github.io/%repo_name%/
echo.
echo ⏰ 通常需要5-10分钟生效
echo 🔄 GitHub会自动构建和部署
echo.
echo 📱 您可以将此链接分享给任何人！
echo.

REM 清理临时目录
cd /d "%~dp0"
rmdir /s /q "%TEMP_DIR%" >nul 2>&1

echo 是否现在打开GitHub仓库页面?
set /p open_github=打开GitHub? (Y/N): 
if /i "%open_github%"=="Y" (
    start "" https://github.com/%github_username%/%repo_name%
)

echo.
echo 是否现在尝试访问应用?
set /p open_app=打开应用? (Y/N): 
if /i "%open_app%"=="Y" (
    start "" https://%github_username%.github.io/%repo_name%/
    echo 注意: 如果页面显示404，请等待几分钟后刷新
)

echo.
echo 感谢使用Beacon World App部署助手！
pause
