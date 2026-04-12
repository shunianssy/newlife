/**
 * Vite 配置文件
 * 支持 GitHub Pages 子路径部署
 * @type {import('vite').UserConfig}
 */
const isProduction = process.env.NODE_ENV === 'production';
const githubPagesBase = '/newlife/';

export default {
    // 生产环境使用 GitHub Pages 子路径，开发环境使用相对路径
    base: isProduction ? githubPagesBase : './',
    build: {
        outDir: 'template/public',
        emptyOutDir: true
    },
    server: {
        port: 3000,
        open: true
    }
}
