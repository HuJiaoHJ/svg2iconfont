const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const clean = require('gulp-clean');

const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} inDir  // 传入的路径
 * @param {string} outDir // 输出的路径
 * @param {string} fontName // font name
 * @param {string} styleType   // 样式类型 css
 */

function svg2iconfont(inDir, outDir, fontName = 'iconfont', styleType = 'css') {
  
  const cwd = process.cwd();
  inDir = path.join(cwd, inDir, '/');
  outDir = path.join(cwd, outDir, '/');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const icons = fs
    .readdirSync(inDir)
    .map(file => /\.svg$/.test(file) && file.replace(/\.\w+$/, ''))
    .filter(Boolean);
  iconfontClean(outDir);
  iconfontCreate(inDir, outDir, fontName, styleType);
}

function iconfontCreate(inDir, outDir, fontName, styleType) {
  let cssClass = 'icon-';
  if (fontName !== 'iconfont') {
    cssClass = `${fontName}-`
  }
  gulp.src(`${inDir}*.svg`)
    .pipe(iconfontCss({
      fontName,
      cssClass,
      path: path.join(__dirname, 'template', `icons.${styleType}`),
      targetPath: `${fontName}.${styleType}`,
      fontPath: '',
    }))
    .pipe(iconfont({
      fontName,
      formats: ['woff', 'eot', 'woff2', 'ttf', 'svg'],
      normalize: true,
      fontHeight: 1001,
    }))
    .pipe(gulp.dest(outDir));
}

function iconfontClean(outDir) {
  gulp.src(`${outDir}/*`, { read: false }).pipe(clean());
}

module.exports = svg2iconfont;