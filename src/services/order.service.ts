import axios from "axios";
const API_URL = "https://b.skincareagents.com/local/api/";

axios.defaults.baseURL = API_URL;

// interface IUserData {
//   birthday: string;
//   email: string;
//   lastName: string;
//   loginPhone: string;
//   name: string;
//   secondName: string;
//   userId: number;
// }

export const getOrderInfoService = {
  async getOrderInfo(): Promise<any> {
    const { data } = await axios.post("v1/cart.php", {
      type: "getOrderInfo",
      saleUserId: localStorage.getItem("saleUserId"),
    });
    return data;
  },
};

export const getBasketService = {
  async getBasket(id: any): Promise<any> {
    const { data } = await axios.post("/v1/sale.php", {
      type: "getOrderParams",
      saleUserId: id,
      token: "",
    });
    return data;
  },
};

export const getCertificate = {
  async createDiscount(number: string): Promise<any> {
    const { data } = await axios.post("/v1/sale.php", {
      type: "createDiscount",
      typeDiscount: "certificate",
      token: localStorage.getItem("saleUserId"),
      value: 1,
      number,
    });
    return data;
  },
};
