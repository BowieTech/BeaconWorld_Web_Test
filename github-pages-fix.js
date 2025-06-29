/**
 * GitHub Pages 路径修复脚本
 * 自动检测并修复资源路径问题
 */

(function() {
    'use strict';
    
    console.log('🔧 GitHub Pages 路径修复脚本启动');
    
    // 获取当前页面信息
    const currentURL = window.location.href;
    const currentPath = window.location.pathname;
    const hostname = window.location.hostname;
    
    console.log('当前URL:', currentURL);
    console.log('当前路径:', currentPath);
    console.log('主机名:', hostname);
    
    // 检测是否为GitHub Pages
    const isGitHubPages = hostname.includes('github.io');
    const isCustomDomain = !isGitHubPages && hostname !== 'localhost' && hostname !== '127.0.0.1';
    
    console.log('是否为GitHub Pages:', isGitHubPages);
    console.log('是否为自定义域名:', isCustomDomain);
    
    // 确定正确的base路径
    function getCorrectBasePath() {
        if (isGitHubPages) {
            // GitHub Pages项目页面格式: username.github.io/repository-name/
            const pathParts = currentPath.split('/').filter(part => part.length > 0);
            if (pathParts.length > 0) {
                return '/' + pathParts[0] + '/';
            }
        }
        
        // 自定义域名或根域名
        return '/';
    }
    
    // 设置正确的base href
    function fixBaseHref() {
        const baseElement = document.querySelector('base');
        if (!baseElement) {
            console.warn('未找到base元素');
            return;
        }
        
        const correctBasePath = getCorrectBasePath();
        const currentBaseHref = baseElement.getAttribute('href');
        
        console.log('当前base href:', currentBaseHref);
        console.log('正确base href应为:', correctBasePath);
        
        if (currentBaseHref !== correctBasePath) {
            baseElement.setAttribute('href', correctBasePath);
            console.log('✅ Base href已修复为:', correctBasePath);
        } else {
            console.log('✅ Base href已正确');
        }
    }
    
    // 检查资源加载状态
    function checkResourceLoading() {
        const criticalResources = [
            'flutter_bootstrap.js',
            'flutter.js',
            'main.dart.js',
            'manifest.json'
        ];
        
        console.log('🔍 检查关键资源加载状态...');
        
        criticalResources.forEach(resource => {
            fetch(resource, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        console.log('✅', resource, '- 正常');
                    } else {
                        console.error('❌', resource, '- 状态码:', response.status);
                    }
                })
                .catch(error => {
                    console.error('❌', resource, '- 加载失败:', error.message);
                });
        });
    }
    
    // 监听资源加载错误
    function setupErrorHandling() {
        window.addEventListener('error', function(event) {
            if (event.target && event.target.tagName) {
                const tagName = event.target.tagName.toLowerCase();
                const src = event.target.src || event.target.href;
                
                if (tagName === 'script' || tagName === 'link') {
                    console.error('❌ 资源加载失败:', src);
                    
                    // 如果是关键资源失败，尝试修复
                    if (src && (src.includes('flutter') || src.includes('main.dart'))) {
                        console.log('🔧 检测到关键资源加载失败，尝试修复...');
                        setTimeout(() => {
                            fixBaseHref();
                            // 可以在这里添加重新加载逻辑
                        }, 1000);
                    }
                }
            }
        }, true);
        
        // 监听未捕获的Promise错误
        window.addEventListener('unhandledrejection', function(event) {
            console.error('❌ 未处理的Promise错误:', event.reason);
        });
    }
    
    // 创建诊断信息
    function createDiagnosticInfo() {
        const info = {
            timestamp: new Date().toISOString(),
            url: currentURL,
            path: currentPath,
            hostname: hostname,
            isGitHubPages: isGitHubPages,
            isCustomDomain: isCustomDomain,
            correctBasePath: getCorrectBasePath(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        console.log('📊 诊断信息:', info);
        
        // 将诊断信息存储到sessionStorage，供调试使用
        try {
            sessionStorage.setItem('github-pages-diagnostic', JSON.stringify(info));
        } catch (e) {
            console.warn('无法存储诊断信息到sessionStorage:', e);
        }
        
        return info;
    }
    
    // 主要修复流程
    function runFix() {
        console.log('🚀 开始执行修复流程...');
        
        // 1. 创建诊断信息
        createDiagnosticInfo();
        
        // 2. 修复base href
        fixBaseHref();
        
        // 3. 检查资源加载
        setTimeout(checkResourceLoading, 500);
        
        // 4. 设置错误处理
        setupErrorHandling();
        
        console.log('✅ 修复流程完成');
    }
    
    // 页面加载完成后执行修复
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFix);
    } else {
        runFix();
    }
    
    // 导出到全局作用域，供调试使用
    window.GitHubPagesFix = {
        runFix: runFix,
        fixBaseHref: fixBaseHref,
        checkResourceLoading: checkResourceLoading,
        getCorrectBasePath: getCorrectBasePath,
        getDiagnosticInfo: () => {
            try {
                return JSON.parse(sessionStorage.getItem('github-pages-diagnostic'));
            } catch (e) {
                return null;
            }
        }
    };
    
})();
