import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/v1/';

axios.defaults.baseURL = API_URL;
export const userRegisterService = {
  async userRegister(name: string, phone: string, pass: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'userRegister',
      name: name,
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
  async userLogout(): Promise<any> {
    const { data } = await axios.post('v1/user.php', {
      type: 'userLogout',
      token: localStorage.getItem('token'),
    });
    return data;
  },
};

export const recoveryUserPassService = {
  async recoveryUserPassEmail(email: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'recoveryUserPass',
      typeRecovery: 'email',
      email: email,
    });
    return data;
  },

  async recoveryUserPassPhone(phone: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'recoveryUserPass',
      typeRecovery: 'phone',
      phone: phone,
    });
    return data;
  },
};

export const userCheckCodeService = {
  async userCheckCode(id: string, code: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'userCheckCode',
      id,
      code,
    });
    return data;
  },
};

export const updateUserPassService = {
  async updateUserPass(id: string, pass: string): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'updateUserPass',
      id,
      pass,
    });
    return data;
  },
};
