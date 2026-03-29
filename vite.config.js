/** @type {import('vite').UserConfig} */
export default {
    base: './',
    build: {
        outDir: 'template/public',
        emptyOutDir: true
    },
    server: {
        port: 3000,
        open: true
    }
}
