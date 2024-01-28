'use strict';

/**
 * flexo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flexo.flexo');
