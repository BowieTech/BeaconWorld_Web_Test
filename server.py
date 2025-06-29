#!/usr/bin/env python3
"""
Beacon World App - 简单Web服务器
用于本地运行Web版应用
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# 配置
PORT = 8080
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义HTTP请求处理器，添加CORS支持"""
    
    def end_headers(self):
        # 添加CORS头部，允许跨域请求
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_OPTIONS(self):
        # 处理预检请求
        self.send_response(200)
        self.end_headers()

def main():
    """启动Web服务器"""
    
    # 确保在正确的目录中
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    print("=" * 50)
    print("    Beacon World App - Web服务器")
    print("=" * 50)
    print()
    
    # 检查index.html是否存在
    if not Path('index.html').exists():
        print("❌ 错误: 未找到 index.html 文件")
        print("请确保在正确的目录中运行此脚本")
        input("按回车键退出...")
        return
    
    try:
        # 创建服务器
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ 服务器启动成功!")
            print(f"📍 地址: http://{HOST}:{PORT}")
            print(f"📁 目录: {script_dir}")
            print()
            print("🌐 正在打开浏览器...")
            print()
            print("按 Ctrl+C 停止服务器")
            print("=" * 50)
            
            # 自动打开浏览器
            try:
                webbrowser.open(f'http://{HOST}:{PORT}')
            except Exception as e:
                print(f"⚠️  无法自动打开浏览器: {e}")
                print(f"请手动访问: http://{HOST}:{PORT}")
            
            # 启动服务器
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 10048:  # 端口被占用
            print(f"❌ 错误: 端口 {PORT} 已被占用")
            print("请尝试:")
            print("1. 关闭其他Web服务器")
            print("2. 等待几秒后重试")
            print("3. 重启计算机")
        else:
            print(f"❌ 服务器启动失败: {e}")
        
        input("按回车键退出...")
        
    except KeyboardInterrupt:
        print()
        print("🛑 服务器已停止")
        print("感谢使用 Beacon World App!")

if __name__ == "__main__":
    main()
