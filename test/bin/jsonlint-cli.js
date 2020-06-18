#!/usr/bin/env node

'use strict';

/* eslint-disable no-await-in-loop */

const util = require('util');
const fs = require('fs').promises;
const glob = util.promisify(require('glob'));
const parseJson = require('parse-json');

const patterns = process.argv.slice(2);

const main = async () => {
    for (const pattern of patterns) {
        const files = await glob(pattern, { dot: true });
        for (const file of files) {
            const contents = await fs.readFile(file, 'utf-8');
            parseJson(contents, file);
        }
    }
};

main().catch((err) => {
    console.error('Error', err);
    process.exitCode = 1;
});
