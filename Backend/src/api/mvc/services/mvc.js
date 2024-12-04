'use strict';

/**
 * mvc service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mvc.mvc');
