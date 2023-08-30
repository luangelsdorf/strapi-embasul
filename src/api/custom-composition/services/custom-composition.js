'use strict';

/**
 * custom-composition service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::custom-composition.custom-composition');
