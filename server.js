#!/usr/bin/env node
/**
 * Beacon World App - Node.js Web服务器
 * 用于本地运行Web版应用
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 配置
const PORT = 8080;
const HOST = 'localhost';

// MIME类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

function openBrowser(url) {
    const start = (process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open');
    exec(`${start} ${url}`);
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    // 添加CORS头部
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // 解析请求路径
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 文件不存在，返回404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>404 - 文件未找到</title></head>
                    <body>
                        <h1>404 - 文件未找到</h1>
                        <p>请求的文件不存在: ${req.url}</p>
                        <a href="/">返回首页</a>
                    </body>
                </html>
            `);
            return;
        }
        
        // 读取并返回文件
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>500 - 服务器错误</title></head>
                        <body>
                            <h1>500 - 服务器错误</h1>
                            <p>读取文件时发生错误</p>
                        </body>
                    </html>
                `);
                return;
            }
            
            // 设置正确的MIME类型
            const mimeType = getMimeType(filePath);
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    });
});

// 启动服务器
server.listen(PORT, HOST, () => {
    console.log('='.repeat(50));
    console.log('    Beacon World App - Web服务器');
    console.log('='.repeat(50));
    console.log();
    console.log(`✅ 服务器启动成功!`);
    console.log(`📍 地址: http://${HOST}:${PORT}`);
    console.log(`📁 目录: ${__dirname}`);
    console.log();
    console.log('🌐 正在打开浏览器...');
    console.log();
    console.log('按 Ctrl+C 停止服务器');
    console.log('='.repeat(50));
    
    // 自动打开浏览器
    setTimeout(() => {
        openBrowser(`http://${HOST}:${PORT}`);
    }, 1000);
});

// 处理服务器错误
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ 错误: 端口 ${PORT} 已被占用`);
        console.log('请尝试:');
        console.log('1. 关闭其他Web服务器');
        console.log('2. 等待几秒后重试');
        console.log('3. 重启计算机');
    } else {
        console.log(`❌ 服务器启动失败: ${err.message}`);
    }
    process.exit(1);
});

// 处理Ctrl+C
process.on('SIGINT', () => {
    console.log();
    console.log('🛑 服务器已停止');
    console.log('感谢使用 Beacon World App!');
    process.exit(0);
});
