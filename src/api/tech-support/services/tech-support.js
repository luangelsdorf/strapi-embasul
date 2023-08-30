'use strict';

/**
 * tech-support service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tech-support.tech-support');
