'use strict';

/**
 * owasp controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::owasp.owasp');
