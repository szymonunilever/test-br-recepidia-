/* global describe, it, expect */
import AccessibilityService from '../accesibility.service';

describe('AccessibilityService', () => {
  const externalDict = {
    favoriteButton: 'favorite',
  };
  it('before setting dictionary should return null.', () => {
    expect(AccessibilityService.dictionary).toEqual(null);
  });
  it('after setting dictionary should return right dictionary', () => {
    AccessibilityService.dictionary = externalDict;
    expect(AccessibilityService.dictionary).toEqual(externalDict);
  });
});
