import Strapi from 'strapi-sdk-js';

export const strapi = new Strapi({
    apiUrl: process.env.STRAPI_BASE_URL || 'https://r810983k-1337.euw.devtunnels.ms/api',
});