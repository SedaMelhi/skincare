import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/';

axios.defaults.baseURL = API_URL;

export const saleUserIdService = {
  async getSaleUserId(): Promise<any> {
    const { data } = await axios.post('/cart.php', {
      type: 'getSaleUserId',
    });
    return data;
  },
};
