'use strict';

/**
 * owasp router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::owasp.owasp');
