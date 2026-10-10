const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

// Exercise the shipped TypeScript helpers without adding a test runtime dependency.
require.extensions['.ts'] = (module, filename) => {
    const {outputText} = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
        fileName: filename,
    });
    module._compile(outputText, filename);
};
const {buildMetadata, metaDescription, pageNumber, paginatedPath, isoDate, serializeJsonLd, normalizeContentHeadings, breadcrumbSchema} = require('../src/utils/seo.ts');
const {productSchema, productComparisonMetadata} = require('../src/utils/productSeo.ts');
const product = {
    id: 12, name: 'فریزر تست', url: 'فریزر-تست', description: null, review: '<p>توضیح محصول</p>',
    is_stock: 0, brand_name: 'برند تست', images: [{url: 'freezer.jpg'}], guaranties: [],
    colors: [{id: 1, status: 1, stock: 2, price: 118000000, discountItem: []}],
    comments: [{rating: '4'}, {rating: '5'}],
};

test('metadata uses a self canonical for page 2 and strips tracking parameters by construction', () => {
    const m = buildMetadata({title: 'کافه', description: '<p>تجهیزات کافه</p>', path: '/category/cafe', page: 2});
    assert.equal(m.alternates.canonical, 'https://tajhizland.com/category/cafe?page=2');
    assert.equal(m.openGraph.url, m.alternates.canonical);
    assert.equal(m.twitter.card, 'summary_large_image');
    assert.match(m.title, /2/);
    assert.equal(paginatedPath('/category/cafe', 1), '/category/cafe');
});
test('invalid and repeated page input cannot reach a negative or NaN API page', () => {
    for (const input of ['0', '-1', '2foo', 'NaN', '1.5', '999999999999999999', undefined]) assert.equal(pageNumber(input), 1);
    assert.equal(pageNumber(['3', '4']), 3);
});
test('descriptions normalize whitespace/entities and truncate without empty fallbacks', () => {
    assert.equal(metaDescription(null), '');
    assert.equal(metaDescription('<p>یک</p><p>دو &amp; سه</p><script>bad()</script>'), 'یک دو & سه');
    const long = metaDescription('<p>' + 'تجهیزات آشپزخانه '.repeat(100) + '</p>');
    assert.ok(long.length <= 155);
    assert.ok(long.endsWith('…'));
    assert.equal(buildMetadata({title: 'عنوان', description: '<p>&nbsp;</p>', path: '/page/test'}).description, 'عنوان');
    assert.equal(metaDescription('&lt;متن&gt;'), '<متن>');
});
test('product metadata leaves the native Open Graph product type to the server component', () => {
    const m = buildMetadata({title: 'محصول', path: '/product/test', type: 'product'});
    assert.ok(!('type' in m.openGraph));
    assert.equal(m.openGraph.siteName, 'تجهیزلند');
});
test('JSON-LD cannot break out of its script element', () => {
    const value = {name: '</script><script>alert(1)</script>'};
    const serialized = serializeJsonLd(value);
    assert.ok(!serialized.includes('<'));
    assert.deepEqual(JSON.parse(serialized), value);
});
test('rich text reserves h1 for the page title', () => {
    assert.equal(normalizeContentHeadings('<H1 class="x">عنوان</H1><h2>بعدی</h2>'), '<h2 class="x">عنوان</h2><h2>بعدی</h2>');
});
test('schema dates reject Jalali display dates', () => {
    assert.equal(isoDate('1405/07/18'), undefined);
    assert.equal(isoDate('1405-07-18'), undefined);
    assert.equal(isoDate('2026-10-10T08:00:00+03:30'), '2026-10-10T04:30:00.000Z');
});
test('product schema converts toman to IRR and uses absolute URLs, strings and approved ratings', () => {
    const schema = productSchema(product);
    assert.equal(schema.offers.price, 1180000000);
    assert.equal(schema.offers.priceCurrency, 'IRR');
    assert.match(schema.offers.url, /^https:\/\/tajhizland.com\/product\//);
    assert.equal(schema.sku, '12');
    assert.equal(schema.description, 'توضیح محصول');
    assert.equal(schema.aggregateRating.ratingCount, 2);
    assert.equal(schema.aggregateRating.ratingValue, 4.5);
    assert.ok(!('priceValidUntil' in schema.offers));
});
test('selected available color and discount match the sidebar and comparison metadata', () => {
    const p = {...product, colors: [{status: 0, stock: 1, price: 1},
        {status: 1, stock: 2, price: 1000, discountItem: [{discount_price: 800, discount_expire_time: '2099-01-01T00:00:00Z'}]}]};
    const schema = productSchema(p);
    assert.equal(schema.offers.price, 8000);
    assert.equal(schema.offers.priceValidUntil, '2099-01-01');
    assert.deepEqual([productComparisonMetadata(p).product_price, productComparisonMetadata(p).product_old_price], ['800', '1000']);
    p.colors[1].discountItem[0].discount_expire_time = '1405/07/18';
    p.colors[1].discountItem[0].discount_expire_time_iso = '2099-01-02T09:00:00Z';
    assert.equal(productSchema(p).offers.priceValidUntil, '2099-01-02');
});
test('unavailable, unpriced and used products never claim a new in-stock offer', () => {
    const schema = productSchema({...product, is_stock: 1, colors: [{price: 1000, stock: 0, status: 1}]});
    assert.equal(schema.offers.availability, 'https://schema.org/OutOfStock');
    assert.equal(schema.offers.itemCondition, 'https://schema.org/UsedCondition');
    assert.ok(!('offers' in productSchema({...product, colors: []})));
    assert.ok(!('aggregateRating' in productSchema({...product, comments: []})));
    assert.equal(productSchema({...product, description: '<p></p>'}).description, 'توضیح محصول');
});
test('breadcrumb links are absolute with consecutive positions', () => {
    const list = breadcrumbSchema([{name: 'کافه', url: 'category/cafe'}, {name: 'محصول', url: '/product/x'}]);
    assert.deepEqual(list.itemListElement.map(i => i.position), [1, 2, 3]);
    assert.equal(list.itemListElement[1].item, 'https://tajhizland.com/category/cafe');
});
test('sitemap includes all public families and real lastmod; fails on incomplete API responses', async () => {
    const axios = require('axios');
    const get = axios.get;
    process.env.NEXT_PUBLIC_BACKEND_API_URL = 'https://api.example.test/';
    axios.get = async url => ({data: {result: {data: [{url: 'تست', updated_at: '2026-10-01T12:00:00Z'}]}}});
    const config = require('../next-sitemap.config.js');
    try {
        const paths = await config.additionalPaths();
        assert.ok(paths.some(p => p.loc.startsWith('/news/show/')));
        assert.ok(!paths.some(p => p.loc.startsWith('/blog/')));
        for (const prefix of ['/group/', '/category-group/', '/page/', '/vlog/category/', '/tajhizcast/']) assert.ok(paths.some(p => p.loc.startsWith(prefix)));
        assert.equal(paths.find(p => p.loc.startsWith('/product/') && p.lastmod).lastmod, '2026-10-01T12:00:00.000Z');
        assert.equal(paths.find(p => p.loc === '/').lastmod, undefined);
        assert.deepEqual(await config.transform(config, '/contact'), {loc: '/contact'});
        assert.ok(!(await config.robotsTxtOptions.transformRobotsTxt(config, 'User-agent: *\nHost: test\n')).includes('Host:'));
        axios.get = async () => ({data: {result: {data: null}}});
        await assert.rejects(config.additionalPaths(), /Invalid sitemap response/);
    } finally { axios.get = get; }
});
