import { saveUserProfileByKey } from '../index';
import { ProfileKey } from '../models';

describe('saveUserProfileByKey', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should save initialQuiz data to localstorage', () => {
    saveUserProfileByKey('TestString', ProfileKey.initialQuiz);
    const localStorageValue: any = JSON.parse(localStorage.getItem(
      'userProfile'
    ) as string);
    expect(localStorageValue.initialQuiz).toBe('TestString');
  });
});
