export const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem('ls', 'test');
    localStorage.removeItem('ls');

    return true;
  } catch (e) {
    return false;
  }
};
export default isLocalStorageAvailable;
