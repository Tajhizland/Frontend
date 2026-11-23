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
const {productSelection} = require('../src/utils/productSelection.ts');
const ids = selection => Object.keys(selection).filter(id => selection[id]).map(Number);

test('Snappay activation followed by percentage update targets the same selected products', () => {
    const products = [{id: 1}, {id: 2}, {id: 3}];
    const selected = {1: true, 2: false, 3: true};
    const afterActivation = productSelection(products, selected, true);
    const afterPercentage = productSelection([...products].reverse(), afterActivation, true);
    assert.deepEqual(ids(afterActivation), [1, 3]);
    assert.deepEqual(ids(afterPercentage), [1, 3]);
    assert.deepEqual(selected, {1: true, 2: false, 3: true});
});

test('refresh drops removed products and never adds newly returned products to the next action', () => {
    assert.deepEqual(productSelection([{id: 2}, {id: 3}], {1: true, 2: false}, true), {2: false, 3: false});
    assert.deepEqual(productSelection([], {1: true}, true), {});
});

test('an explicit new search initializes all results while an empty selection stays empty on refresh', () => {
    const products = [{id: 1}, {id: 2}];
    assert.deepEqual(ids(productSelection(products, {}, false)), [1, 2]);
    assert.deepEqual(ids(productSelection(products, {}, true)), []);
});
