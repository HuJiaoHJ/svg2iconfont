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
    describe: 'css type: [css]',
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

if (type && type !== 'css') {
  throw new Error('options -t must be "css"');
}

svg2iconfont(inDir, outDir, fontName, type);
