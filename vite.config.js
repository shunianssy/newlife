/**
 * Vite 配置文件
 * 支持自定义域名部署（根路径）
 * @type {import('vite').UserConfig}
 */
const isProduction = process.env.NODE_ENV === 'production';

export default {
    // 生产环境使用根路径（自定义域名），开发环境使用相对路径
    base: isProduction ? '/' : './',
    build: {
        outDir: 'template/public',
        emptyOutDir: true
    },
    server: {
        port: 3000,
        open: true
    }
}
