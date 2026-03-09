/**
 * 抖音视频解析 API 服务
 * 支持：抖音、小红书、快手
 * 
 * 使用方法：
 * 1. 安装依赖：npm install
 * 2. 运行：node simple_api_server.js
 * 3. 访问：http://localhost:3000
 * 
 * 部署到 Vercel 后，自动获得公网 URL
 */

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 允许跨域访问
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// ==================== 工具函数 ====================

/**
 * 发送 HTTP 请求
 * @param {string} url - 请求的 URL
 * @param {object} headers - 请求头
 * @returns {Promise<string>} 响应内容
 */
async function fetchUrl(url, headers = null) {
    if (headers === null) {
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        };
    }
    
    try {
        const response = await axios.get(url, {
            headers: headers,
            timeout: 30000,
            maxRedirects: 5,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`请求失败：${error.message}`);
    }
}

// ==================== 抖音解析 ====================

/**
 * 解析抖音视频
 * @param {string} url - 抖音视频链接
 * @returns {object} 解析结果
 */
function parseDouyinVideo(url) {
    // TODO: 这里需要实现真实的抖音解析逻辑
    // 目前返回示例数据用于测试
    
    // 你可以参考以下开源项目实现真实解析：
    // https://github.com/yuncaiji/API
    // https://github.com/Johnserf-Seed/f2
    
    return {
        code: 0,
        message: 'success',
        data: {
            title: '抖音视频标题 - 示例数据',
            author: {
                nickname: '作者昵称',
                avatar: 'https://example.com/avatar.jpg',
                pageUrl: ''
            },
            cover: 'https://example.com/cover.jpg',
            videoUrl: 'https://example.com/video_watermark.mp4',
            nwm_video_url: 'https://example.com/video_no_watermark.mp4',
            duration: 30000
        }
    };
}

// ==================== 小红书解析 ====================

/**
 * 解析小红书视频
 * @param {string} url - 小红书视频链接
 * @returns {object} 解析结果
 */
function parseXiaohongshuVideo(url) {
    // TODO: 这里需要实现真实的小红书解析逻辑
    // 目前返回示例数据用于测试
    
    return {
        code: 0,
        message: 'success',
        data: {
            title: '小红书笔记标题 - 示例数据',
            author: {
                nickname: '作者昵称'
            },
            cover: 'https://example.com/cover.jpg',
            videoUrl: 'https://example.com/video.mp4',
            videoUrlNoWatermark: 'https://example.com/video_no_watermark.mp4',
            duration: 30000
        }
    };
}

// ==================== 快手解析 ====================

/**
 * 解析快手视频
 * @param {string} url - 快手视频链接
 * @returns {object} 解析结果
 */
function parseKuaishouVideo(url) {
    // TODO: 这里需要实现真实的快手解析逻辑
    // 目前返回示例数据用于测试
    
    return {
        code: 0,
        message: 'success',
        data: {
            title: '快手视频标题 - 示例数据',
            author: {
                nickname: '作者昵称'
            },
            cover: 'https://example.com/cover.jpg',
            videoUrl: 'https://example.com/video.mp4',
            videoUrlNoWatermark: 'https://example.com/video_no_watermark.mp4',
            duration: 30000
        }
    };
}

// ==================== API 路由 ====================

/**
 * 根路径
 */
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>抖音视频解析 API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 { color: #333; }
                h2 { color: #666; margin-top: 30px; }
                .endpoint {
                    background: #f8f9fa;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 5px;
                    border-left: 4px solid #007bff;
                }
                code {
                    background: #f4f4f4;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Courier New', monospace;
                    color: #e83e8c;
                }
                .note {
                    background: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    margin: 20px 0;
                }
                a { color: #007bff; text-decoration: none; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎬 抖音视频解析 API 服务</h1>
                <p>支持抖音、小红书、快手等平台的视频解析</p>
                
                <h2>📋 接口列表</h2>
                
                <div class="endpoint">
                    <strong>抖音解析</strong><br>
                    <code>GET /douyin?url=视频链接</code><br>
                    示例：<a href="/douyin?url=https://www.douyin.com/video/123" target="_blank">/douyin?url=https://www.douyin.com/video/123</a>
                </div>
                
                <div class="endpoint">
                    <strong>小红书解析</strong><br>
                    <code>GET /xiaohongshu?url=视频链接</code><br>
                    示例：<a href="/xiaohongshu?url=https://www.xiaohongshu.com/explore/123" target="_blank">/xiaohongshu?url=https://www.xiaohongshu.com/explore/123</a>
                </div>
                
                <div class="endpoint">
                    <strong>快手解析</strong><br>
                    <code>GET /kuaishou?url=视频链接</code><br>
                    示例：<a href="/kuaishou?url=https://www.kuaishou.com/fw/123" target="_blank">/kuaishou?url=https://www.kuaishou.com/fw/123</a>
                </div>
                
                <div class="endpoint">
                    <strong>健康检查</strong><br>
                    <code>GET /health</code><br>
                    示例：<a href="/health" target="_blank">/health</a>
                </div>
                
                <div class="note">
                    <strong>⚠️ 注意：</strong><br>
                    当前返回的是示例数据，需要实现真实的解析逻辑才能使用。<br>
                    参考开源项目：<a href="https://github.com/yuncaiji/API" target="_blank">https://github.com/yuncaiji/API</a>
                </div>
                
                <h2>📚 文档</h2>
                <p>查看详细教程：<a href="https://github.com/your-repo" target="_blank">GitHub</a></p>
            </div>
        </body>
        </html>
    `);
});

/**
 * 健康检查接口
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API 服务运行正常',
        timestamp: new Date().toISOString()
    });
});

/**
 * 抖音解析接口
 */
app.get('/douyin', (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({
            code: 400,
            message: '缺少 URL 参数',
            data: null
        });
    }
    
    try {
        const result = parseDouyinVideo(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `解析失败：${error.message}`,
            data: null
        });
    }
});

/**
 * 小红书解析接口
 */
app.get('/xiaohongshu', (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({
            code: 400,
            message: '缺少 URL 参数',
            data: null
        });
    }
    
    try {
        const result = parseXiaohongshuVideo(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `解析失败：${error.message}`,
            data: null
        });
    }
});

/**
 * 快手解析接口
 */
app.get('/kuaishou', (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({
            code: 400,
            message: '缺少 URL 参数',
            data: null
        });
    }
    
    try {
        const result = parseKuaishouVideo(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `解析失败：${error.message}`,
            data: null
        });
    }
});

/**
 * 404 处理
 */
app.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: '接口不存在',
        data: null
    });
});

// ==================== 启动服务器 ====================

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('='.repeat(60));
    console.log('🎬 抖音视频解析 API 服务');
    console.log('='.repeat(60));
    console.log(`📍 服务地址：http://localhost:${PORT}`);
    console.log(`📱 抖音接口：http://localhost:${PORT}/douyin?url=xxx`);
    console.log(`📕 小红书接口：http://localhost:${PORT}/xiaohongshu?url=xxx`);
    console.log(`📹 快手接口：http://localhost:${PORT}/kuaishou?url=xxx`);
    console.log(`❤️ 健康检查：http://localhost:${PORT}/health`);
    console.log('='.repeat(60));
    console.log('⚠️  注意：当前返回的是示例数据');
    console.log('📚 参考：https://github.com/yuncaiji/API');
    console.log('='.repeat(60));
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('\n收到 SIGTERM 信号，正在关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n收到 SIGINT 信号，正在关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});

// 错误处理
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 拒绝:', reason);
    process.exit(1);
});
