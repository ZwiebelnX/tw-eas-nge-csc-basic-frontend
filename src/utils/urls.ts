const urls = {
  register: () => '/users',
  login: () => '/login',
  logout: () => '/logout',
};

export interface Urls {
  register: Function;
  login: Function;
  logout: Function;
}

export default urls;
