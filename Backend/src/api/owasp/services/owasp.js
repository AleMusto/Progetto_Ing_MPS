'use strict';

/**
 * owasp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::owasp.owasp');
