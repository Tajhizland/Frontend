const {before, test} = require('node:test');
const assert = require('node:assert/strict');

// Run against a local Next server configured with tests/fixtures/seo-api.cjs.
const base = process.env.SEO_SITE_URL;
const enabled = base && ['localhost', '127.0.0.1'].includes(new URL(base).hostname);
const api = process.env.SEO_FIXTURE_API_URL || 'http://127.0.0.1:4137';
const headers = {'User-Agent': 'Twitterbot/1.0'};
const read = async path => {
    const response = await fetch(`${base}${path}`, {headers, redirect: 'manual'});
    return {response, html: await response.text()};
};
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const check = (name, fn) => test(name, {skip: !enabled, timeout: 120000}, fn);

before(async () => {
    if (enabled && process.env.SHOP_REVALIDATE_SECRET) {
        const response = await fetch(`${base}/api/revalidate`, {method: 'POST', headers: {
            authorization: `Bearer ${process.env.SHOP_REVALIDATE_SECRET}`,
        }});
        assert.equal(response.status, 200);
    }
});

check('product HTML contains one h1, a canonical, native Open Graph and valid priced JSON-LD', async () => {
    const {response, html} = await read('/product/fixture-product?utm_source=test');
    assert.equal(response.status, 200);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.match(html, /rel="canonical" href="https:\/\/tajhizland.com\/product\/fixture-product"/);
    assert.equal((html.match(/property="og:type"/g) || []).length, 1);
    assert.match(html, /property="og:type" content="product"/);
    assert.match(html, /name="product_old_price" content="1000000"/);
    const data = schemas(html);
    const product = data.find(item => item['@type'] === 'Product');
    assert.equal(product.offers.price, 8000000);
    assert.equal(product.offers.priceCurrency, 'IRR');
    assert.equal(product.aggregateRating.ratingValue, 5);
    assert.ok(data.some(item => item['@type'] === 'BreadcrumbList'));
    assert.match(html, /alt="محصول آزمایشی"/);
});

for (const path of ['/category/fixture-category', '/brand/fixture-brand', '/category-group/fixture-category',
    '/news', '/vlog', '/vlog/category/fixture-vlog-category', '/tajhizcast', '/product/stock', '/product/discounted', '/special']) {
    check(`${path}: page 2 is rendered with crawlable pagination and a self canonical`, async () => {
        const {response, html} = await read(`${path}?page=2`);
        assert.equal(response.status, 200, path);
        assert.ok(html.includes(`rel="canonical" href="https://tajhizland.com${path}?page=2"`));
        assert.ok(html.includes(`href="${path}?page=3"`), 'next page is a real anchor');
        assert.match(html, /صفحه 2/);
        assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
        if (['/category/', '/brand/', '/category-group/', '/product/', '/special'].some(prefix => path.startsWith(prefix))) {
            assert.match(html, /محصول صفحه 2/);
            assert.ok(!html.includes('href="/product/fixture-product-1"'));
        }
    });
}

for (const [path, type] of [['/news/show/fixture-article', 'BlogPosting'], ['/vlog/fixture-video', 'VideoObject'],
    ['/tajhizcast/fixture-cast', 'PodcastEpisode'], ['/page/fixture-page', 'WebPage'], ['/group/fixture-group', 'CollectionPage']]) {
    check(`${path}: content metadata and schema are available without JavaScript`, async () => {
        const {response, html} = await read(path);
        assert.equal(response.status, 200);
        assert.ok(html.includes(`rel="canonical" href="https://tajhizland.com${path}"`));
        assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
        assert.ok(schemas(html).some(item => item['@type'] === type));
        const description = html.match(/name="description" content="([^"]*)"/)[1];
        assert.ok(description.length <= 155);
        if (type === 'BlogPosting') assert.match(html, /property="og:type" content="article"/);
        if (type === 'VideoObject') assert.match(html, /property="og:type" content="video.other"/);
        if (type === 'PodcastEpisode') assert.match(html, /\/cast\/image\/fixture.jpg/);
    });
}

for (const path of ['/search/test', '/compare/101', '/cart', '/login', '/account', '/admin', '/factor/1', '/403']) {
    check(`${path}: private and utility pages expose noindex in HTML`, async () => {
        const {html} = await read(path);
        assert.match(html, /<meta name="robots" content="[^"]*noindex/);
    });
}

for (const path of ['/contact', '/branch', '/leading', '/guaranty/fixture-guaranty', '/landing/fixture-landing']) {
    check(`${path}: public information has its own metadata`, async () => {
        const {response, html} = await read(path);
        assert.equal(response.status, 200);
        assert.ok(html.includes(`rel="canonical" href="https://tajhizland.com${path}"`));
        assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
        if (path === '/contact' || path === '/branch') {
            assert.ok(schemas(html).some(item => item['@type'] === 'Store' && item.address && item.telephone));
        }
    });
}

check('generated robots and sitemap exclude utility routes and include real public paths', async () => {
    const {html: robots} = await read('/robots.txt');
    assert.match(robots, /Disallow: \/admin/);
    assert.doesNotMatch(robots, /^Host:/m);
    assert.doesNotMatch(robots, /Disallow: \/search/);
    const {html: sitemap} = await read('/sitemap-0.xml');
    assert.match(sitemap, /\/news\/show\/fixture/);
    assert.match(sitemap, /\/tajhizcast\/fixture/);
    assert.doesNotMatch(sitemap, /<loc>[^<]*\/(admin|search|cart|blog|account)(\/|<)/);
    assert.doesNotMatch(sitemap, /\?page=/);
    assert.match(sitemap, /<lastmod>2026-10-01T10:00:00.000Z<\/lastmod>/);
});

check('missing pages and permanent redirects keep their HTTP semantics and Persian encoding', async () => {
    assert.equal((await read('/product/missing')).response.status, 404);
    for (const [slug, destination] of [['old-product', 'fixture-product'], ['encoded-redirect', '%D8%AA%D8%B3%D8%AA']]) {
        const {response} = await read(`/product/${slug}`);
        assert.equal(response.status, 308);
        assert.equal(new URL(response.headers.get('location'), base).pathname, `/product/${destination}`);
    }
    const {response, html} = await read('/category/fixture-category?page=4');
    // Streaming responses may already have sent 200, but must always expose noindex.
    assert.ok(response.status === 404 || html.includes('name="robots" content="noindex"'));
});

check('authorized invalidation refreshes cached stock and price; invalid credentials do not', async () => {
    const secret = process.env.SHOP_REVALIDATE_SECRET;
    const invalidate = authorization => fetch(`${base}/api/revalidate`, {method: 'POST', headers: {authorization}});
    const counts = async () => (await (await fetch(`${api}/__counts`)).json())['product/find:fixture-product:1'] || 0;
    if (!secret) {
        assert.equal((await invalidate('')).status, 503);
        const before = await counts();
        await read('/product/fixture-product');
        await read('/product/fixture-product');
        assert.equal(await counts(), before + 2, 'without an invalidation secret, each visit reads fresh data');
        return;
    }
    assert.equal((await invalidate('Bearer invalid')).status, 401);
    await invalidate(`Bearer ${secret}`);
    const before = await counts();
    await read('/product/fixture-product');
    await read('/product/fixture-product');
    assert.equal(await counts(), before + 1, 'metadata, page and next visit reuse one public read');
    try {
        await fetch(`${api}/__product`, {method: 'PATCH', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({price: 2000000, stock: 0, discountItem: []})});
        assert.equal((await invalidate(`Bearer ${secret}`)).status, 200);
        const {html} = await read('/product/fixture-product');
        const product = schemas(html).find(item => item['@type'] === 'Product');
        assert.equal(product.offers.price, 20000000);
        assert.equal(product.offers.availability, 'https://schema.org/OutOfStock');
    } finally {
        await fetch(`${api}/__product`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            price: 1000000, stock: 2, discountItem: [{discount_price: 800000, discount_expire_time: '2099-01-01T00:00:00Z'}],
        })});
        await invalidate(`Bearer ${secret}`);
    }
});
