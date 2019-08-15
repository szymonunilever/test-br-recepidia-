import { ProfileKey } from './models';
import saveUserProfileByKey from './saveUserProfileByKey';

const updateFavorites = (favorites: string[]) => {
  saveUserProfileByKey(favorites, ProfileKey.favorites);
};

export default updateFavorites;
