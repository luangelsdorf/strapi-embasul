'use strict';

/**
 * innovation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::innovation.innovation');
