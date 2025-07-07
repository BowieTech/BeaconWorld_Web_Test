@echo off
chcp 65001 >nul
echo.
echo ========================================
echo 🚀 Beacon World App - GitHub Pages 快速修复
echo ========================================
echo.

echo 📋 检查当前目录...
if not exist "index.html" (
    echo ❌ 错误：未找到 index.html 文件
    echo    请确保在正确的项目目录中运行此脚本
    pause
    exit /b 1
)

echo ✅ 找到 index.html 文件

echo.
echo 📁 检查关键文件...
set "missing_files="

if not exist "flutter_bootstrap.js" (
    echo ❌ 缺少: flutter_bootstrap.js
    set "missing_files=1"
) else (
    echo ✅ 找到: flutter_bootstrap.js
)

if not exist "main.dart.js" (
    echo ❌ 缺少: main.dart.js
    set "missing_files=1"
) else (
    echo ✅ 找到: main.dart.js
)

if not exist "manifest.json" (
    echo ❌ 缺少: manifest.json
    set "missing_files=1"
) else (
    echo ✅ 找到: manifest.json
)

if not exist ".nojekyll" (
    echo ⚠️  创建 .nojekyll 文件...
    echo. > .nojekyll
    echo ✅ 已创建 .nojekyll 文件
) else (
    echo ✅ 找到: .nojekyll
)

if not exist "assets" (
    echo ❌ 缺少: assets 文件夹
    set "missing_files=1"
) else (
    echo ✅ 找到: assets 文件夹
)

if not exist "canvaskit" (
    echo ❌ 缺少: canvaskit 文件夹
    set "missing_files=1"
) else (
    echo ✅ 找到: canvaskit 文件夹
)

echo.
if defined missing_files (
    echo ❌ 发现缺少关键文件！
    echo.
    echo 🔧 解决方案：
    echo 1. 确保运行了 'flutter build web --release'
    echo 2. 从 build/web 目录复制所有文件到当前目录
    echo 3. 重新运行此脚本
    echo.
    pause
    exit /b 1
) else (
    echo ✅ 所有关键文件都存在
)

echo.
echo 🌐 检查网络连接...
ping -n 1 github.com >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 网络连接正常
) else (
    echo ⚠️  网络连接可能有问题
)

echo.
echo 📊 生成部署报告...
echo ========================================
echo 📋 部署检查报告
echo ========================================
echo 生成时间: %date% %time%
echo 项目目录: %cd%
echo.
echo 📁 文件状态:
if exist "index.html" echo ✅ index.html
if exist "flutter_bootstrap.js" echo ✅ flutter_bootstrap.js
if exist "main.dart.js" echo ✅ main.dart.js
if exist "manifest.json" echo ✅ manifest.json
if exist ".nojekyll" echo ✅ .nojekyll
if exist "assets" echo ✅ assets/
if exist "canvaskit" echo ✅ canvaskit/
if exist "icons" echo ✅ icons/
echo.
echo 🚀 GitHub Pages 部署步骤:
echo 1. 将所有文件上传到 GitHub 仓库
echo 2. 进入仓库 Settings ^> Pages
echo 3. 选择 main 分支，/ (root) 目录
echo 4. 等待 5-10 分钟部署完成
echo 5. 访问: https://你的用户名.github.io/仓库名/
echo.
echo 🔧 如果部署后有问题:
echo 1. 访问: https://你的用户名.github.io/仓库名/github-pages-check.html
echo 2. 使用诊断工具检查具体问题
echo 3. 清除浏览器缓存后重试
echo ========================================

echo.
echo 🎉 修复完成！
echo.
echo 📋 下一步操作：
echo 1. 上传所有文件到 GitHub 仓库
echo 2. 启用 GitHub Pages
echo 3. 等待部署完成
echo 4. 使用诊断工具验证
echo.

echo 💡 提示：
echo - 确保仓库是 Public（免费用户）
echo - 等待 Actions 显示绿色勾号
echo - 使用现代浏览器访问应用
echo.

echo 🔗 有用的链接：
echo - GitHub Pages 文档: https://docs.github.com/en/pages
echo - Flutter Web 部署: https://docs.flutter.dev/deployment/web
echo.

pause
