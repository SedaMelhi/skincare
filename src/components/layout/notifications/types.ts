export enum NotificationTypesEnum {
  ExpirationPoints = "expirationPoints",
  AddPoints = "addPoints",
  Product = "product",
  Order = "order",
  Delivery = "delivery",
}

// Базовый тип уведомления
interface BaseNotification {
  type: string;
  dateTime: string;
}

// Уведомление типа "addPoints"
export interface AddPointsNotification extends BaseNotification {
  type: NotificationTypesEnum.AddPoints;
  addPoints: number;
}

// Уведомление типа "expirationPoints"
export interface ExpirationPointsNotification extends BaseNotification {
  type: NotificationTypesEnum.ExpirationPoints;
  expirationPoints: string;
}

// Уведомление типа "product"
export interface ProductNotification extends BaseNotification {
  type: NotificationTypesEnum.Product;
  id: string;
  name: string;
  price: string;
  picture: string;
}

export interface OrderNotification extends BaseNotification {
  id: string;
  type: NotificationTypesEnum.Order;
  address: string;
  count: number;
  dateDelivery: string;
  dateTime: string;
  delivery: string;
  picture: string;
}

export interface OrderNotification extends BaseNotification {
  id: string;
  type: NotificationTypesEnum.Order;
  address: string;
  count: number;
  dateDelivery: string;
  dateTime: string;
  delivery: string;
  picture: string;
}
export interface DeliveryNotification extends BaseNotification {
  id: string;
  type: NotificationTypesEnum.Delivery;
  address: string;
  count: number;
  dateDelivery: string;
  dateTime: string;
  delivery: string;
  picture: string;
}

// Объединение типов для всех возможных уведомлений
export type NotificationType =
  | AddPointsNotification
  | ExpirationPointsNotification
  | ProductNotification
  | OrderNotification
  | DeliveryNotification;
