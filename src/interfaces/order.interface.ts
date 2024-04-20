export interface IOrderBasket {
  cartId: number;
  parentId: number;
  scuId: number;
  name: string;
  quantity: number;
  value: string;
  picture: string;
  price: {
    basePrice: number;
    discountPrice: number;
    discount: number | null;
    percent: number | null;
  };
}
export interface IDelivery {
  id: string;
  name: string;
  code: number | null;
}
export interface IPayment {
  id: string;
  name: string;
}
export interface IFullPrice {
  saleUserId: number;
  price: number;
  fullPrice: number;
  countProduct: number;
}
export interface IOrder {
  basket: IFullPrice;
  cartItems: {
    [key: string]: IOrderBasket;
  };
  delivery: IDelivery[];
  payment: IPayment[];
}
