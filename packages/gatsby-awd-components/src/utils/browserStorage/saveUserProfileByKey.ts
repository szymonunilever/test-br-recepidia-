import { userProfileKey } from './config';
import { userProfileDefaultStructure } from './config';
import getUserProfileByKey from './getUserProfileByKey';
import { ProfileKey } from './models';
import isLocalStorageAvailable from '../isLocalStorageAvailable';

const saveUserProfileByKey = (data: any, key: ProfileKey) => {
  const newProfile = Object.keys(userProfileDefaultStructure).reduce(
    (profileData, pk) => {
      // @ts-ignore
      profileData[pk] =
        pk === key ? data : getUserProfileByKey(pk as ProfileKey);
      return profileData;
    },
    {}
  );

  isLocalStorageAvailable() &&
    window.localStorage.setItem(userProfileKey, JSON.stringify(newProfile));
};

export default saveUserProfileByKey;
