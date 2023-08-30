'use strict';

/**
 * digital-printing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::digital-printing.digital-printing');
