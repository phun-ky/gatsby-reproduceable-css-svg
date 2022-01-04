var path = require('path');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';
const isProduction = activeEnv !== 'development';
const config = isProduction
  ? {
    ifDesignSystemPath: `${path.resolve(__dirname, 'node_modules')}/@ids-core`,
    ifDesignSystemPackagesGlob: `${path.resolve(__dirname, 'node_modules')}/@ids-core/*`,
    ifDesignSystemPackageDocPath: pkg => `${path.resolve(__dirname, 'node_modules')}/@ids-core/${pkg}/docs`,
    ifDesignSystemPackageChangelogPath: pkg =>
      `${path.resolve(__dirname, 'node_modules')}/@ids-core/${pkg}/CHANGELOG.md`,
    ifDesignSystemJavascriptChangelogPath: pkg =>
      `${path.resolve(__dirname, 'node_modules')}/@ids-js/${pkg}/CHANGELOG.md`,
    ifDesignComponentsJavascriptPath: `${path.resolve(__dirname, 'node_modules')}/@ids-js`,
    ifDesignComponentsJavascriptPackagesGlob: `${path.resolve(__dirname, 'node_modules')}/@ids-js/*`,
    ifDesignComponentsJavascriptPackageDocPath: pkg =>
      `${path.resolve(__dirname, 'node_modules')}/@ids-js/${pkg}/docs`,
    ifDesignSystemWebcomponentChangelogPath: pkg =>
      `${path.resolve(__dirname, 'node_modules')}/@ids-wc/${pkg}/CHANGELOG.md`,
    ifDesignComponentsWebcomponentPath: `${path.resolve(__dirname, 'node_modules')}/@ids-wc`,
    ifDesignComponentsWebcomponentPackagesGlob: `${path.resolve(__dirname, 'node_modules')}/@ids-wc/*`,
    ifDesignComponentsWebcomponentPackageDocPath: pkg =>
      `${path.resolve(__dirname, 'node_modules')}/@ids-wc/${pkg}/docs`,
    ifDesignSystemChangelogPath: './CHANGELOG.md'
  }
  : {
    ifDesignSystemPath: path.resolve(__dirname, '../ids-core/packages/'),
    ifDesignSystemPackagesGlob: path.resolve(__dirname, '../ids-core/packages/*'),
    ifDesignSystemPackageDocPath: pkg => path.resolve(__dirname, `../ids-core/packages/${pkg}/docs`),
    ifDesignSystemPackageChangelogPath: pkg => path.resolve(__dirname, `../ids-core/packages/${pkg}/CHANGELOG.md`),
    ifDesignSystemJavascriptChangelogPath: pkg => path.resolve(__dirname, `../ids-js/packages/${pkg}/CHANGELOG.md`),
    ifDesignComponentsJavascriptPath: path.resolve(__dirname, '../ids-js/packages/'),
    ifDesignComponentsJavascriptPackagesGlob: path.resolve(__dirname, '../ids-js/packages/*'),
    ifDesignComponentsJavascriptPackageDocPath: pkg => path.resolve(__dirname, `../ids-js/packages/${pkg}/docs`),
    ifDesignSystemWebcomponentChangelogPath: pkg => path.resolve(__dirname, `../ids-wc/packages/${pkg}/CHANGELOG.md`),
    ifDesignComponentsWebcomponentPath: path.resolve(__dirname, '../ids-wc/packages/'),
    ifDesignComponentsWebcomponentPackagesGlob: path.resolve(__dirname, '../ids-wc/packages/*'),
    ifDesignComponentsWebcomponentPackageDocPath: pkg => path.resolve(__dirname, `../ids-wc/packages/${pkg}/docs`),
    ifDesignSystemChangelogPath: path.resolve(__dirname, '../ids-core/CHANGELOG.md')
  };

module.exports = config;
