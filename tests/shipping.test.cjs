const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
    const {outputText} = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
        fileName: filename,
    });
    module._compile(outputText, filename);
};
const {availableShipping} = require('../src/utils/shipping.ts');
const post = {id: 1, name: 'پست', price: 85000};
const freight = {id: 2, name: 'باربری', price: 0};
const express = {id: 3, name: 'ارسال فوری', price: 120000};

test('missing postal quote defaults to an available method without user interaction', () => {
    assert.equal(availableShipping([freight, express], 0), freight);
    assert.equal(availableShipping([freight, express], post.id), freight);
});

test('a valid user selection survives a refresh and uses its updated price', () => {
    const updatedExpress = {...express, price: 150000};
    assert.equal(availableShipping([post, freight, updatedExpress], express.id), updatedExpress);
});

test('a selected method removed after an address or cart change cannot be submitted', () => {
    const selected = availableShipping([post, freight], post.id);
    const refreshed = availableShipping([freight, express], selected.id);
    assert.equal(refreshed.id, freight.id);
    assert.equal(refreshed.price, 0);
});

test('loading and an empty list do not invent a shipping method', () => {
    assert.equal(availableShipping(undefined, post.id), undefined);
    assert.equal(availableShipping([], post.id), undefined);
});
