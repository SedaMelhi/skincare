export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  deliveryPrice: string;
  allPrice: string;
  status: string;
  address: null;
  items: { [key: string]: IProductOrder };
}
export interface IProductOrder {
  id: number;
  name: string;
  price: number;
  quantity: number;
  picture: string;
  value: string;
}
export interface IOrderList {
  [key: string]: IOrderItem;
}
