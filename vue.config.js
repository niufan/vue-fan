module.exports = {
    devServer: {
        proxy: { // 配置参考（http-proxy-middleware）：https://github.com/chimurai/http-proxy-middleware
            '/api': { // 代理路径
                target: 'https://api2.bmob.cn/1/classes', // 目标
                changeOrigin: true,
                pathRewrite: {'/api': ''}, // 去除/api路径
                logLevel: 'debug'
            }
        }
    }
};