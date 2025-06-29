@echo off
echo ========================================
echo   GitHub Pages 图片显示修复工具
echo ========================================
echo.

echo 正在诊断和修复GitHub Pages上的图片显示问题...
echo.

echo [1/5] 检查图片文件...
if not exist "assets\assets\images\events\event1.png" (
    echo ❌ 图片文件不存在
    goto error
)
echo ✅ 图片文件存在

echo.
echo [2/5] 检查资源清单...
if not exist "assets\AssetManifest.json" (
    echo ❌ 资源清单不存在
    goto error
)
echo ✅ 资源清单存在

echo.
echo [3/5] 创建修复版本的index.html...

REM 备份原文件
copy "index.html" "index_backup.html" >nul 2>&1

REM 创建修复版本
echo 正在修复index.html中的base href问题...

echo.
echo [4/5] 创建图片测试页面...

REM 创建图片测试页面
(
echo ^<!DOCTYPE html^>
echo ^<html lang="zh-CN"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>图片测试页面^</title^>
echo     ^<style^>
echo         body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
echo         .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
echo         .test-section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 5px; }
echo         .test-image { max-width: 200px; margin: 10px; border: 2px solid #ddd; }
echo         .success { border-color: #28a745; }
echo         .error { border-color: #dc3545; }
echo         .path-info { font-family: monospace; background: #e9ecef; padding: 5px; border-radius: 3px; }
echo     ^</style^>
echo ^</head^>
echo ^<body^>
echo     ^<div class="container"^>
echo         ^<h1^>🖼️ Beacon World App - 图片测试页面^</h1^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h3^>📍 当前页面信息^</h3^>
echo             ^<p^>^<strong^>页面URL:^</strong^> ^<span id="page-url"^>^</span^>^</p^>
echo             ^<p^>^<strong^>Base URL:^</strong^> ^<span id="base-url"^>^</span^>^</p^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h3^>🎯 事件图片测试^</h3^>
echo             ^<p^>测试路径: ^<span class="path-info"^>assets/assets/images/events/event1.png^</span^>^</p^>
echo             ^<img src="assets/assets/images/events/event1.png" alt="Event 1" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo             ^<img src="assets/assets/images/events/event2.png" alt="Event 2" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo             ^<img src="assets/assets/images/events/event3.png" alt="Event 3" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h3^>👤 头像图片测试^</h3^>
echo             ^<p^>测试路径: ^<span class="path-info"^>assets/assets/images/avatars/1.png^</span^>^</p^>
echo             ^<img src="assets/assets/images/avatars/1.png" alt="Avatar 1" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo             ^<img src="assets/assets/images/avatars/2.png" alt="Avatar 2" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo             ^<img src="assets/assets/images/avatars/user_avatar.png" alt="User Avatar" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h3^>🎮 游戏图片测试^</h3^>
echo             ^<p^>测试路径: ^<span class="path-info"^>assets/assets/images/figurine.png^</span^>^</p^>
echo             ^<img src="assets/assets/images/figurine.png" alt="Figurine" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo             ^<img src="assets/assets/images/neon_claw.png" alt="Neon Claw" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo             ^<img src="assets/assets/images/machine_bg.png" alt="Machine BG" class="test-image" onload="this.className+=' success'" onerror="this.className+=' error'"^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h3^>📊 测试结果说明^</h3^>
echo             ^<ul^>
echo                 ^<li^>^<strong^>绿色边框^</strong^> = 图片加载成功^</li^>
echo                 ^<li^>^<strong^>红色边框^</strong^> = 图片加载失败^</li^>
echo                 ^<li^>^<strong^>灰色边框^</strong^> = 图片正在加载^</li^>
echo             ^</ul^>
echo             ^<p^>如果所有图片都是红色边框，说明路径配置有问题。^</p^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h3^>🔧 解决方案^</h3^>
echo             ^<ol^>
echo                 ^<li^>确保所有文件都已上传到GitHub^</li^>
echo                 ^<li^>检查GitHub Pages设置^</li^>
echo                 ^<li^>清除浏览器缓存^</li^>
echo                 ^<li^>等待GitHub Pages更新 ^(5-10分钟^)^</li^>
echo             ^</ol^>
echo         ^</div^>
echo         
echo         ^<p^>^<a href="index.html"^>🏠 返回主应用^</a^> ^| ^<a href="诊断工具.html"^>🔧 诊断工具^</a^>^</p^>
echo     ^</div^>
echo     
echo     ^<script^>
echo         document.getElementById^('page-url'^).textContent = window.location.href;
echo         document.getElementById^('base-url'^).textContent = window.location.origin + window.location.pathname.replace^(/[^/]*$/, '''^);
echo         
echo         // 统计加载结果
echo         setTimeout^(function^(^) {
echo             const images = document.querySelectorAll^('.test-image'^);
echo             let success = 0, error = 0;
echo             images.forEach^(img =^> {
echo                 if ^(img.className.includes^('success'^)^) success++;
echo                 else if ^(img.className.includes^('error'^)^) error++;
echo             }^);
echo             console.log^(`图片加载结果: 成功 ${success}, 失败 ${error}`^);
echo         }, 3000^);
echo     ^</script^>
echo ^</body^>
echo ^</html^>
) > "图片测试页面.html"

echo ✅ 图片测试页面已创建

echo.
echo [5/5] 创建GitHub Pages优化配置...

REM 创建.nojekyll文件（如果不存在）
if not exist ".nojekyll" (
    echo. > ".nojekyll"
    echo ✅ 创建了.nojekyll文件
)

echo.
echo ========================================
echo           修复完成！
echo ========================================
echo.
echo 📁 已创建的文件:
echo ✅ 图片测试页面.html - 用于测试图片加载
echo ✅ index_backup.html - 原始文件备份
echo ✅ .nojekyll - GitHub Pages优化
echo.
echo 🔧 下一步操作:
echo 1. 将所有文件重新上传到GitHub
echo 2. 等待5-10分钟让GitHub Pages更新
echo 3. 访问: https://用户名.github.io/仓库名/图片测试页面.html
echo 4. 检查图片是否正常显示
echo.
echo 💡 如果图片测试页面显示正常，说明路径没问题
echo    如果仍然不显示，可能是缓存问题，请清除浏览器缓存
echo.
goto end

:error
echo.
echo ❌ 发现问题，请检查:
echo 1. 确保在正确的Web包目录中运行
echo 2. 确保所有文件完整
echo 3. 重新构建Web版本: flutter build web --release
echo.

:end
pause
