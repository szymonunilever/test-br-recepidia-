// 1. Setup single queue for custom tracking
// 2. Poll for window.__satelliteLoaded
// 3. When window.__satelliteLoaded is false load event into singleton queue for later processing
// 4. When window.__satelliteLoaded is true load event into global digitalData object.

// eslint-disable-next-line lodash/import-scope

const queue = [];

const processQueue = () => {
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
