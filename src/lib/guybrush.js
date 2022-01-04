const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
const isProduction = activeEnv !== 'development';

// if (!isProduction) {
// require('../../../ids-core/packages/bundle/dist/ifdesignsystem.min.css');
// } else {
require('@ids-core/bundle');
// }
