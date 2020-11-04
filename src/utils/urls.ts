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
  addGoodsToCart: () => '/carts',
  deleteGoodsFromCart: () => '/carts',
  getCartList: (pageNum: number, pageSize?: number) => {
    let url = `/carts?pageNum=${pageNum}`;
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }
    return url;
  },
  getCouponList: (pageNum: number, pageSize?: number) => {
    let url = `/coupons?pageNum=${pageNum}`;
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }
    return url;
  },
  getStoreInfo: (storeId: number) => `/stores/${storeId}`,
  getStoreGoods: (storeId: number, pageNum: number, pageSize?: number) => {
    let url = `/stores/${storeId}/goods?pageNum=${pageNum}`;
    if (pageSize) {
      url += `&pageSize=${pageSize}`;
    }
    return url;
  },
  addCouponToUser: () => 'users/coupons',
};

export interface Urls {
  register: Function;
  login: Function;
  logout: Function;
  getGoodsList: Function;
  addGoodsToCart: Function;
  getCartList: Function;
  deleteGoodsFromCart: Function;
  getCouponList: Function;
  getStoreInfo: Function;
  getStoreGoods: Function;
  addCouponToUser: Function;
}

export default urls;
