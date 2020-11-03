const urls = {
  register: () => '/users',
  login: () => '/login',
  logout: () => '/logout',
  getGoodsList: (pageNum: number, pageSize?: number) => {
    let url = `/goods?pageNum=${pageNum}`;
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }
    return url;
  },
};

export interface Urls {
  register: Function;
  login: Function;
  logout: Function;
  getGoodsList: Function;
}

export default urls;
