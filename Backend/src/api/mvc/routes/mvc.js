'use strict';

/**
 * mvc router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::mvc.mvc');
