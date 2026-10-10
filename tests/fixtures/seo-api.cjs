// Synthetic public API data for rendering SEO regressions without production writes.
const http = require('node:http');
const port = Number(process.env.SEO_API_PORT || 4137);
const counts = {};
const date = '2026-10-01T10:00:00.000Z';
const color = {id: 1, color_name: 'سفید', color_code: '#ffffff', price: 1000000, stock: 2, status: 1,
    statusLabel: '', discount: 20, discountItem: [{discount_price: 800000, discount_expire_time: '2099-01-01T00:00:00Z'}]};
const product = {id: 101, url: 'fixture-product', name: 'محصول آزمایشی', description: '<h1>توضیحات محصول</h1><p>تجهیزات آزمایشی</p>',
    review: '<h1>بررسی محصول</h1><p>کیفیت دستگاه</p>', meta_title: '', meta_description: '', type: 'product', status: 1,
    brand_name: 'برند آزمایشی', is_stock: 0, colors: [color], images: [{id: 1, url: 'fixture.jpg'}],
    comments: [{id: 1, rating: '5', user: 'مشتری', text: 'خوب', created_at: '1405/07/09'}],
    guaranties: [], productOptions: [], videos: [], favorite: false, min_price: 1000000, rating: 5, groupItems: [],
    category_id: 1, category_ids: [1], created_at: date, updated_at: date};
const category = {id: 1, name: 'دسته آزمایشی', url: 'fixture-category', description: '<h1>درباره دسته</h1> تجهیزات',
    filters: [], minPrice: 0, maxPrice: 2000000, image: 'fixture.jpg'};
const brand = {id: 1, name: 'برند آزمایشی', url: 'fixture-brand', description: '<h1>درباره برند</h1> تجهیزات', image: 'fixture.jpg', banner: null};
const article = {id: 1, title: 'مقاله آزمایشی', url: 'fixture-article', content: '<h1>بخش مقاله</h1><p>' + 'شرح مقاله '.repeat(100) + '</p>',
    img: 'fixture.jpg', created_at: '1405/07/09', published_at_iso: date, updated_at_iso: date, author: 'نویسنده'};
const vlog = {id: 1, title: 'ویدیوی آزمایشی', url: 'fixture-video', description: '<h1>توضیح ویدیو</h1>',
    video: 'fixture.mp4', hls: null, poster: 'fixture.jpg', created_at: '1405/07/09', published_at_iso: date, updated_at_iso: date, view: 1};
const cast = {id: 1, title: 'پادکست آزمایشی', url: 'fixture-cast', image: 'fixture.jpg', audio: 'fixture.mp3', vlog,
    description: '<h1>توضیح پادکست</h1>', created_at: date, updated_at: date};
const empty = {data: []};
const breadcrumb = {data: [{name: category.name, url: 'category/fixture-category'}]};
const paginated = (items, page) => ({data: page <= 3 ? items : [], meta: {current_page: page, last_page: 3, per_page: 1, total: 3}});
http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);
    const path = url.pathname.replace(/^\//, '');
    let body = ''; for await (const chunk of req) body += chunk;
    let input = {}; try { input = JSON.parse(body || '{}'); } catch {}
    const page = Number(url.searchParams.get('page') || 1);
    const key = `${path}:${input.url || ''}:${page}`;
    counts[key] = (counts[key] || 0) + 1;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') return res.end('{}');
    if (path === '__counts') return res.end(JSON.stringify(counts));
    if (path === '__product' && req.method === 'PATCH') {
        Object.assign(product.colors[0], input);
        return res.end(JSON.stringify({ok: true}));
    }
    if (input.url === 'old-product') {res.statusCode = 301; return res.end(JSON.stringify({success: false, result: {destination: '/product/fixture-product'}}));}
    if (input.url === 'encoded-redirect') {res.statusCode = 301; return res.end(JSON.stringify({success: false, result: {destination: '/product/%D8%AA%D8%B3%D8%AA'}}));}
    if (input.url === 'missing') {res.statusCode = 404; return res.end(JSON.stringify({success: false}));}
    const item = {...product, id: 100 + page, name: `محصول صفحه ${page}`, url: `fixture-product-${page}`};
    let data = [];
    if (path.startsWith('sitemap/')) data = [{url: 'fixture', updated_at: date}];
    else if (path === 'homepage') data = {campaign: null, pending_campaign: null, discount: null, hasStockProducts: false,
        ...Object.fromEntries(['desktopSliders', 'mobileSliders', 'banners', 'banners2', 'banners3', 'banners4', 'banners5',
            'bannersStock', 'bannersCast', 'topDiscountedProducts', 'specialProducts', 'randomProducts',
            'homepageCategories', 'concepts', 'brands', 'trustedBrands', 'posters', 'vlogs', 'news'].map(key => [key, []]))};
    else if (path === 'brand') data = {brand: {data: [brand]}, banner: empty};
    else if (path === 'leading') data = {poster: {image: 'fixture.jpg'}, vlog: [], blog: []};
    else if (path === 'sample') data = {info: {content: 'پروژه‌های تجهیزشده'}, poster: {image: 'fixture.jpg'}, image: empty, video: empty};
    else if (path === 'product/find') data = {product, relatedProduct: empty, options: empty, breadcrumb};
    else if (path === 'group/find') data = {product: {...product, url: 'fixture-group', groupItems: [{id: 1, product, value: [{groupField: {id: 1, title: 'نوع'}, id: 1, value: 'تست'}]}]}, relatedProduct: empty};
    else if (path === 'category/find') data = {category, products: paginated([item], page), groups: empty, children: empty, breadcrumb};
    else if (path === 'category/group') data = {category, groups: paginated([{...item, type: 'group'}], page), breadcrumb};
    else if (path === 'brand/find') data = {brand, products: paginated([item], page), categories: empty, banner: empty};
    else if (path === 'news/find') data = article;
    else if (path === 'vlog/find') data = {vlog, relatedVlogs: empty, relatedProducts: empty};
    else if (path === 'cast/find') data = cast;
    else if (path === 'page/find') data = {...article, title: 'درباره تجهیزلند', url: 'fixture-page', image: 'fixture.jpg'};
    else if (path === 'guaranty/find') data = {name: 'گارانتی آزمایشی', url: 'fixture-guaranty', description: '<h1>شرایط</h1> گارانتی', icon: 'fixture.jpg'};
    else if (path === 'landing/find') data = {title: 'صفحه فرود آزمایشی', url: 'fixture-landing', description: '<h1>معرفی</h1>'};
    else if (path === 'news') data = {listing: paginated([article], page), banner: empty, category: empty, lastPost: empty};
    else if (path === 'vlog' || path === 'vlog/category') data = {listing: paginated([vlog], page), mostViewed: empty, banner: empty,
        category: path === 'vlog/category' ? {name: 'آموزش', url: 'fixture-vlog-category'} : empty, categorys: empty};
    else if (path === 'cast') data = {listing: paginated([cast], page), mostViewed: empty, banner: empty, category: empty};
    else if (['product/stock', 'product/discount', 'special-product'].includes(path)) data = {data: paginated([item], page), banner: empty,
        category: empty, discounts: empty, topDiscountedProducts: empty};
    else if (path === 'faq') data = [{question: 'پرسش آزمایشی', answer: 'پاسخ آزمایشی'}];
    else if (path === 'menu') data = [];
    res.end(JSON.stringify({success: true, result: {data}}));
}).listen(port, '127.0.0.1', () => console.log(`SEO fixture API: ${port}`));
