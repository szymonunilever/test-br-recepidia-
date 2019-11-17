import { ProfileKey } from './models';
import saveUserProfileByKey from './saveUserProfileByKey';

const updateFavorites = (favorites: number[]) => {
  saveUserProfileByKey(favorites, ProfileKey.favorites);
};

export default updateFavorites;
