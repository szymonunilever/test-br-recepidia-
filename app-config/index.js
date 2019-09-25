/* eslint-disable no-console */
const startsWith = require('lodash/startsWith');
const isEmpty = require('lodash/isEmpty');
const merge = require('lodash/merge');
const keys = require('lodash/keys');
const filter = require('lodash/filter');
const reduce = require('lodash/reduce');
const flow = require('lodash/flow');

require('dotenv').config();

// Prefix to identify local env variables described in .env file
const localVarPrefix = `app_local_`;

// Default branch to use env vars.
// To avoid adding env vars on CI for each new branch the variables for `develop` branch will be taken.
const defaultBranch = 'develop';
const ciDefaultVarPrefix = `app_${defaultBranch}_`;

// Reference to the current branch. `BRANCH` env variable will be set by Netlify automatically
const branch = process.env.BRANCH;
const ciVarPrefix = `app_${branch}_`;

function _getConfig() {
  // Function to read env variables by a certain prefix
  const getEnvVars = prefix => {
    return flow(
      keys,
      items => filter(items, name => startsWith(name, prefix)),
      items =>
        reduce(
          items,
          (result, name) => {
            result[`${name.split(prefix)[1]}`] = process.env[name];
            return result;
          },
          {}
        )
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
      //
      // The code below has hardcoded behavior and should be removed to keep the script reusable
      // Possibly, it should be passed as a callback function that defines behavior how env variables should be modified
      // depending on build context
      //

      let esIndexPrefix;

      // REVIEW_ID: the ID of a Deploy Preview and the pull/merge request that generated it
      if (process.env.CONTEXT === 'deploy-preview') {
        esIndexPrefix = process.env.REVIEW_ID;
      }

      // BRANCH: Reference to check out after fetching changes from the Git repository
      if (process.env.CONTEXT === 'branch-deploy') {
        esIndexPrefix = process.env.BRANCH;
      }

      ciVars['elasticSearch_recipeIndex'] = `${esIndexPrefix}--${
        ciVars['elasticSearch_recipeIndex']
      }`;

      ciVars['elasticSearch_articleIndex'] = `${esIndexPrefix}--${
        ciVars['elasticSearch_articleIndex']
      }`;
    }
  }

  // Merge local and branch-related env variables.
  // Branch variables have priority and will override local variables in case of name collision
  return merge(localVars, ciVars);
}

class ConfigManager {
  constructor() {
    if (!this._instance) {
      this._instance = _getConfig();

      // Update process.env with prefixless values
      Object.keys(this._instance).reduce((prev, next) => {
        prev[next] = this._instance[next];
        return prev;
      }, process.env);
    }
  }

  getConfig() {
    return this._instance;
  }

  // Works on server-side only
  getByKey(key) {
    let value = process.env[key];
    try {
      value = JSON.parse(value);
      // eslint-disable-next-line no-empty
    } catch {}
    return value;
  }
}

module.exports = new ConfigManager();
