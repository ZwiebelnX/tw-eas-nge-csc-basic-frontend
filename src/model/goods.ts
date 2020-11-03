class Goods {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  storeId: string;
  storeName: string;

  constructor(id: string, description: string, imageUrl: string, name: string, price: number,
              storeId: string, storeName: string) {
    this.id = id;
    this.description = description;
    this.imageUrl = imageUrl;
    this.name = name;
    this.price = price;
    this.storeId = storeId;
    this.storeName = storeName;
  }
}
