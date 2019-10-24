import { userProfileKey, userProfileDefaultStructure } from './config';
import { ProfileKey } from './models';
import isBrowser from '../isBrowser';
import isLocalStorageAvailable from '../isLocalStorageAvailable';

const getUserProfileByKey = (sectionKey: ProfileKey) => {
  let profileData = userProfileDefaultStructure;

  if (isBrowser() && isLocalStorageAvailable()) {
    const storedData = window.localStorage.getItem(userProfileKey);
    storedData && (profileData = JSON.parse(storedData));
  }

  return profileData[sectionKey];
};

export default getUserProfileByKey;
