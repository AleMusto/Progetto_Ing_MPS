'use strict';

/**
 * mvc controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mvc.mvc');
