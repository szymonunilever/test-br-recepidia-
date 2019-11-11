// 1. Setup single queue for custom tracking
// 2. Poll for window.__satelliteLoaded
// 3. When window.__satelliteLoaded is false load event into singleton queue for later processing
// 4. When window.__satelliteLoaded is true load event into global digitalData object.

// eslint-disable-next-line lodash/import-scope
const merge = require('lodash.merge');

const queue = [];

const processQueue = () => {
  digitalData = merge(digitalData, analyticsConfig.appDigitalData);
  digitalData.component = [];
  digitalData.siteInfo.channel = analyticsConfig.channelVal;
  digitalData.page.category = {
    pageType: analyticsConfig.pageType,
    primaryCategory: analyticsConfig.channelVal,
  };
  digitalData.privacy = { accessCategories: [{ domains: [] }] };
  digitalData.page.pageInfo = {
    pageName: analyticsConfig.pageTitle,
    destinationURL: window.location.href,
  };
  digitalData.page.attributes.contentType = analyticsConfig.pageType;
  if (analyticsConfig.pageType === 'ArticleDetail') {
    digitalData.page.attributes.articleName = analyticsConfig.pageTitle;
  }

  if (queue.length === 0) return;
  let event = queue.pop();

  digitalData.event.push(event);

  if (queue.length > 0) processQueue();
};

export const loaded = () =>
  window.__satelliteLoaded === true && typeof digitalData !== 'undefined';

export const startTracking = () => {
  const pollingId = setInterval(() => {
    if (loaded()) {
      processQueue();

      clearInterval(pollingId);
    }
  }, 300);
};

export const pushEvent = event => {
  if (loaded()) {
    digitalData.event.push(event);
  } else {
    queue.push(event);
  }
};
