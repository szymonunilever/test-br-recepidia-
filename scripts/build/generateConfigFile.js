const startsWith = require('lodash/startsWith');
const isEmpty = require('lodash/isEmpty');
const merge = require('lodash/merge');
const keys = require('lodash/keys');
const filter = require('lodash/filter');
const reduce = require('lodash/reduce');
const flow = require('lodash/flow');
const unflatten = require('flat').unflatten;

require('dotenv').config();

// Path to output config file
// Can be configurable in future once the path to config file across the application will be replaced with alias
const pathToConfigFile = './integrations/keys.json';

// Prefix to identify local env variables described in .env file
const localVarPrefix = `app_local_`;

// Default branch to use env vars.
// To avoid adding env vars on CI for each new branch the variables for `develop` branch will be taken.
const defaultBranch = 'develop';
const ciDefaultVarPrefix = `app_${defaultBranch}_`;

// Reference to the current branch. `BRANCH` env variable will be set by Netlify automatically
const branch = process.env.BRANCH;
const ciVarPrefix = `app_${branch}_`;

// Function to read env variables by a certain prefix
const getEnvVars = prefix => {
  return flow(
    keys,
    items => filter(items, name => startsWith(name, prefix)),
    items =>
      reduce(
        items,
        (result, name) => {
          let value = process.env[name];

          // Try to convert string values to object, array, number to avoid errors using config values across the application
          try {
            value = JSON.parse(value);
            // eslint-disable-next-line no-empty
          } catch {}

          result[`${name.split(prefix)[1].replace(/_/g, '.')}`] = value;
          return result;
        },
        {}
      ),
    items => unflatten(items)
  )(process.env);
};

// Getting local env variables from .env file
const localVars = getEnvVars(localVarPrefix);

// Getting branch-related env variables that are set on CI
let ciVars = getEnvVars(ciVarPrefix);

// In case the current branch is a feature branch the develop env variables will be used instead
if (isEmpty(ciVars)) {
  ciVars = getEnvVars(ciDefaultVarPrefix);

  // Netlify automatically set CONTEXT env variable during build
  // For a Deploy Preview and Branch Deploy dedicated ES indexes should be created with unique names
  if (process.env.CONTEXT) {
    let esIndexPrefix;

    // REVIEW_ID: the ID of a Deploy Preview and the pull/merge request that generated it
    if (process.env.CONTEXT === 'deploy-preview') {
      esIndexPrefix = process.env.REVIEW_ID;
    }

    // BRANCH: Reference to check out after fetching changes from the Git repository
    if (process.env.CONTEXT === 'branch-deploy') {
      esIndexPrefix = process.env.BRANCH;
    }

    ciVars.elasticSearch.recipeIndex = `${esIndexPrefix}--${
      ciVars.elasticSearch.recipeIndex
    }`;
    ciVars.elasticSearch.articleIndex = `${esIndexPrefix}--${
      ciVars.elasticSearch.articleIndex
    }`;
  }
}

// Merge local and branch-related env variables.
// Branch variables have priority and will override local variables in case of name collision
const data = merge(localVars, ciVars);

require('fs').writeFile(pathToConfigFile, JSON.stringify(data), err => {
  if (err) throw err;
});
