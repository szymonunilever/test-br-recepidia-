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
          result[`${name.split(prefix)[1].replace(/_/g, '.')}`] =
            process.env[name];
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

  // For a Deploy Preview dedicated ES indexes should be created with unique names
  if (process.env.CONTEXT && process.env.CONTEXT === 'deploy-preview') {
    ciVars.elasticSearch.recipeIndex = `${process.env.REVIEW_ID}--${
      ciVars.elasticSearch.recipeIndex
    }`;
    ciVars.elasticSearch.articleIndex = `${process.env.REVIEW_ID}--${
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
