const axios = require('axios');

const privatePaths = [
    '/admin', '/api', '/account*', '/cart', '/checkout', '/search', '/compare',
    '/factor', '/login', '/signup', '/forgot-pass', '/thank_you_page', '/failed_payment', '/403',
];
const sources = [
    ['product', '/product'], ['category', '/category'], ['brand', '/brand'],
    ['blog', '/news/show'], ['vlog', '/vlog'], ['guaranty', '/guaranty'],
    ['landing', '/landing'], ['group', '/group'], ['category-group', '/category-group'],
    ['page', '/page'], ['vlog-category', '/vlog/category'], ['cast', '/tajhizcast'],
];

module.exports = {
    siteUrl: (process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://tajhizland.com').replace(/\/+$/, ''),
    generateRobotsTxt: true,
    autoLastmod: false,
    sitemapSize: 5000,
    exclude: privatePaths.flatMap(path => [path, `${path}/*`]),
    robotsTxtOptions: {
        policies: [{
            userAgent: '*', allow: '/',
            // Public search/login/compare pages must remain crawlable to expose noindex.
            // Tracking parameters are canonicalized, not blocked before crawlers see it.
            disallow: ['/admin', '/api', '/account', '/cart', '/checkout', '/factor', '/thank_you_page', '/failed_payment'],
        }],
        transformRobotsTxt: async (_, robots) => robots.replace(/^Host:.*\r?\n/gm, ''),
    },
    additionalPaths: async () => {
        const base = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        if (!base) throw new Error('NEXT_PUBLIC_BACKEND_API_URL is required to build the sitemap');
        const entries = new Map([
            '/', '/brand', '/news', '/special', '/vlog', '/tajhizcast', '/contact',
            '/branch', '/leading', '/faq', '/sample', '/instagram', '/product/stock', '/product/discounted',
        ].map(loc => [loc, {loc}]));
        const responses = await Promise.all(sources.map(async ([endpoint, prefix]) => {
            const response = await axios.get(`${base.replace(/\/+$/, '')}/sitemap/${endpoint}`, {timeout: 30000});
            const rows = response.data?.result?.data;
            // Do not silently publish a partial sitemap after a failed API deployment.
            if (!Array.isArray(rows)) throw new Error(`Invalid sitemap response: ${endpoint}`);
            return rows.filter(row => typeof row.url === 'string' && row.url.trim()).map(row => {
                // URL handles Persian text, reserved characters, and existing %-encoding.
                const loc = new URL(`${prefix}/${row.url.replace(/^\/+|\/+$/g, '')}`, 'https://tajhizland.com').pathname;
                const lastmod = typeof row.updated_at === 'string' && /^20\d{2}-\d{2}-\d{2}T/.test(row.updated_at)
                    ? new Date(row.updated_at) : null;
                return {loc, ...(lastmod && !Number.isNaN(lastmod.getTime()) && {lastmod: lastmod.toISOString()})};
            });
        }));
        for (const row of responses.flat()) entries.set(row.loc, row);
        return [...entries.values()];
    },
    transform: async (_, path) => ({loc: path}),
};
