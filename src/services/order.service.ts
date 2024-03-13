import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/';

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
    const { data } = await axios.post('/cart.php', {
      type: 'getOrderInfo',
      saleUserId: localStorage.getItem('saleUserId'),
    });
    return data;
  },
};
