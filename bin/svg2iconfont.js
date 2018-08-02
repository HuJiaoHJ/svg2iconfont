#!/usr/bin/env node
const svg2iconfont = require('../index');

const argv = require('yargs')
  .option('i', {
    alias: 'inDir',
    describe: 'svg input directory',
    default: '',
    type: 'string',
  })
  .option('o', {
    alias: 'outDir',
    describe: 'iconfont output directory',
    default: '',
    type: 'string',
  })
  .option('f', {
    alias: 'fontName',
    describe: 'font name',
    default: 'iconfont',
    type: 'string',
  })
  .option('t', {
    alias: 'type',
    describe: 'css type: [css, less, scss]',
    default: 'css',
    type: 'string',
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const inDir = argv.inDir;
const outDir = argv.outDir;
const fontName = argv.fontName;
const type = argv.type;

if (!inDir || !outDir) {
  throw new Error('options -i and -o can not empty');
}

svg2iconfont(inDir, outDir, fontName, type);
