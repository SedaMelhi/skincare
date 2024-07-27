export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  dateDelivery: string;
  deliveryPrice: string;
  allPrice: string;
  status: string;
  address: string;
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
