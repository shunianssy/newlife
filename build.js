const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 定义路径
const projectRoot = __dirname;
const outDir = path.join(projectRoot, 'template', 'public');
const srcDir = path.join(projectRoot, 'src');
const libsDir = path.join(projectRoot, 'libs');
const imagesDir = path.join(projectRoot, 'images');
const fontsDir = path.join(projectRoot, 'fonts');
const dataDir = path.join(projectRoot, 'data');
const particleDir = path.join(projectRoot, 'particle');
const viewDir = path.join(projectRoot, 'view');

// 清空输出目录
console.log('Clearing output directory...');
if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 复制必要的文件
console.log('Copying necessary files...');

// 复制 libs 目录
if (fs.existsSync(libsDir)) {
    const destLibsDir = path.join(outDir, 'libs');
    fs.mkdirSync(destLibsDir, { recursive: true });
    copyDirectory(libsDir, destLibsDir);
}

// 复制 images 目录
if (fs.existsSync(imagesDir)) {
    const destImagesDir = path.join(outDir, 'images');
    fs.mkdirSync(destImagesDir, { recursive: true });
    copyDirectory(imagesDir, destImagesDir);
}

// 复制 fonts 目录
if (fs.existsSync(fontsDir)) {
    const destFontsDir = path.join(outDir, 'fonts');
    fs.mkdirSync(destFontsDir, { recursive: true });
    copyDirectory(fontsDir, destFontsDir);
}

// 复制 particle 目录
if (fs.existsSync(particleDir)) {
    const destParticleDir = path.join(outDir, 'particle');
    fs.mkdirSync(destParticleDir, { recursive: true });
    copyDirectory(particleDir, destParticleDir);
}

// 复制 view 目录
if (fs.existsSync(viewDir)) {
    const destViewDir = path.join(outDir, 'view');
    fs.mkdirSync(destViewDir, { recursive: true });
    copyDirectory(viewDir, destViewDir);
}

// 运行 xlsx2json 命令
console.log('Converting Excel to JSON...');
execSync('pnpm xlsx2json', { stdio: 'inherit' });

// 复制 data 目录（转换后的 JSON 文件）
const publicDataDir = path.join(projectRoot, 'public', 'data');
if (fs.existsSync(publicDataDir)) {
    const destDataDir = path.join(outDir, 'data');
    fs.mkdirSync(destDataDir, { recursive: true });
    copyDirectory(publicDataDir, destDataDir);
}

// 运行 Vite 构建
console.log('Building with Vite...');
execSync('pnpm run build:vite', { stdio: 'inherit' });

// 修复构建后的 index.html 文件
console.log('Fixing script tag in index.html...');
const htmlPath = path.join(outDir, 'index.html');
if (fs.existsSync(htmlPath)) {
    let content = fs.readFileSync(htmlPath, 'utf8');
    // 将 type="module" 从脚本标签中移除
    content = content.replace(/<script type="module" crossorigin/g, '<script crossorigin');
    fs.writeFileSync(htmlPath, content);
    console.log('Fixed script tag in index.html');
} else {
    console.log('index.html not found, skipping fix');
}

console.log('Build completed successfully!');

// 辅助函数：复制目录
function copyDirectory(src, dest) {
    const files = fs.readdirSync(src);
    for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}