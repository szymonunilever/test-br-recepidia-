const checkHash = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  different: function(prev: any, next: any) {
    return btoa(JSON.stringify(prev)) !== btoa(JSON.stringify(next));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  equal: function(prev: any, next: any) {
    return btoa(JSON.stringify(prev)) === btoa(JSON.stringify(next));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveToStorage: function(val: any, name: string) {
    sessionStorage.setItem(name, btoa(JSON.stringify(val)));
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  differentWithSaved: function(val: any, name: string) {
    const prev = sessionStorage.getItem(name);
    return btoa(JSON.stringify(val)) !== prev;
  },
};

export default checkHash;
