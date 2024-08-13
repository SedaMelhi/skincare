import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/';

axios.defaults.baseURL = API_URL;

export const addSCUToCartService = {
  async addSCUToCart(SCUId: number, quantity: number): Promise<any> {
    const { data } = await axios.post('v1/cart.php', {
      type: 'addSCUToCart',
      saleUserId: localStorage.getItem('saleUserId'),
      SCUId: SCUId,
      quantity: quantity,
    });
   

    return data;
  },
};

export const removeSCUToCartService = {
  async removeSCUToCart(cartId: number): Promise<any> {
    const { data } = await axios.post('v1/cart.php', {
      type: 'deleteCartItem',
      saleUserId: localStorage.getItem('saleUserId'),
      cartId: cartId,
      //quantity: 2,
    });
    
    return data;
  },
};

export const getCartService = {
  async getCart(): Promise<any> {
    const { data } = await axios.post('v1/cart.php', {
      type: 'getCart',
      saleUserId: localStorage.getItem('saleUserId'),
    });
   
    return data;
  },
};
