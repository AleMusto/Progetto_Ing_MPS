'use strict';

/**
 * top25-cwe service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top25-cwe.top25-cwe');
