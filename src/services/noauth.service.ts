import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/';

axios.defaults.baseURL = API_URL;

export const saleUserIdService = {
  async getSaleUserId(token?: boolean): Promise<any> {
    const { data } = await axios.post(
      'v1/cart.php',
      token
        ? {
            type: 'getSaleUserId',
            token: localStorage.getItem('token'),
          }
        : {
            type: 'getSaleUserId',
          },
    );
    return data;
  },
};
