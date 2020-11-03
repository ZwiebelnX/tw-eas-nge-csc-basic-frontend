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
  addGoodsToCart: () => '/carts'
};

export interface Urls {
  register: Function;
  login: Function;
  logout: Function;
  getGoodsList: Function;
  addGoodsToCart: Function;
}

export default urls;
