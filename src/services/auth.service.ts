import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/';

axios.defaults.baseURL = API_URL;
export const userRegisterService = {
  async userRegister(phone: string, pass: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'userRegister',
      phone: phone,
      pass: pass,
    });
    return data;
  },
};

export const getTokenService = {
  async getToken(phone: string, pass: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'getToken',
      phone: phone,
      pass: pass,
    });
    return data;
  },
};
