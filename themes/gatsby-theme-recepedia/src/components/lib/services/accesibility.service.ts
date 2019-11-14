/**
 * Accessibility Service
 * The service should use for sharing accessibility labels collection from application into the library.
 * In library we should use only one instance of Accessibility Service.
 * */
class AccessibilityService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _dictionary: any;
  public constructor() {
    this.dictionary = null;
  }

  /**
   * get dictionary
   * The getter for take accessibility dictionary.
   * @public
   * @return: dictionary: Object | null
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get dictionary(): any {
    return this._dictionary;
  }
  /**
   * set dictionary
   * The setter for take accessibility dictionary.
   * @public
   * @param: dictionary: any
   */
  public set dictionary(dictionary) {
    this._dictionary = dictionary;
  }
}
const accessibilityService = new AccessibilityService();
export default accessibilityService;
