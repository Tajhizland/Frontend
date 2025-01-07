const axios = require('axios');

module.exports = {
    siteUrl: "https://tajhizland.com",
    generateRobotsTxt: true,
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: [
        "/admin/*",
        "/api/*",
        "/account-address",
        "/account",
        "/account-billing",
        "/account-order",
        "/account-order-on-hold",
        "/account-password",
        "/account-savelists",
        "/cart",
        "/login",
        "/forgot-pass",
        "/signup",
        "/checkout/*",
        "/thank_you_page/*",
        "/403/",
        "/factor/*",
    ],

    additionalPaths: async (config) => {
        const result = [];

        result.push({
            loc: '/product/discounted',
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });
        result.push({
            loc: '/brand',
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });
        result.push({
            loc: '/news',
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });
        result.push({
            loc: '/special',
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });
        result.push({
            loc: '/vlog',
            changefreq: 'daily',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        });
        let guarantyResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/guaranty`);
        const guarantys = guarantyResponse?.data?.result?.data;
        if (guarantys && Array.isArray(guarantys)) {
            guarantys.forEach(guaranty => {
                result.push({
                    loc: `/guaranty/${guaranty.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }
        let landingResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/landing`);
        const landings = landingResponse?.data?.result?.data;
        if (landings && Array.isArray(landings)) {
            landings.forEach(landing => {
                result.push({
                    loc: `/landing/${landing.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }
        let productResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/product`);
        const products = productResponse?.data?.result?.data;
        if (products && Array.isArray(products)) {
            products.forEach(product => {
                result.push({
                    loc: `/product/${product.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }
        const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/category`);
        const categorys = categoryResponse?.data?.result?.data;
        if (categorys && Array.isArray(categorys)) {
            categorys.forEach(category => {
                result.push({
                    loc: `/category/${category.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }
        const brandResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/brand`);
        const brands = brandResponse?.data?.result?.data;
        if (brands && Array.isArray(brands)) {
            brands.forEach(brand => {
                result.push({
                    loc: `/brand/${brand.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }
        const blogResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/blog`);
        const blogs = blogResponse?.data?.result?.data;
        if (blogs && Array.isArray(blogs)) {
            blogs.forEach(blog => {
                result.push({
                    loc: `/blog/${blog.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }
 const vlogResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}sitemap/vlog`);
        const vlogs = vlogResponse?.data?.result?.data;
        if (vlogs && Array.isArray(vlogs)) {
            vlogs.forEach(vlog => {
                result.push({
                    loc: `/vlog/${vlog.url}`,
                    changefreq: 'daily',
                    priority: 0.8,
                    lastmod: new Date().toISOString(),
                });
            });
        }


        return result;
    },

    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        };
    },
};
