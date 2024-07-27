import { IOrderList } from '@/interfaces/profile.interface';
import axios from 'axios';
import { API_URL } from '.';

axios.defaults.baseURL = API_URL;
interface IUserData {
  birthday: string;
  email: string;
  lastName: string;
  loginPhone: string;
  name: string;
  secondName: string;
  userId: number;
}

export const userInfoService = {
  async getUserInfo(): Promise<any> {
    const { data } = await axios.post('/user.php', {
      type: 'userInfo',
      token: localStorage.getItem('token'),
    });
    return data;
  },
  async getPoints(): Promise<any> {
    const { data } = await axios.post('/v1/user.php', {
      type: 'getPoint',
      token: localStorage.getItem('token'),
    });
    return data;
  },
};

export const userUpdateService = {
  async userUpdate({
    birthday,
    email,
    lastName,
    loginPhone,
    name,
    secondName,
    userId,
  }: IUserData): Promise<IUserData> {
    const { data } = await axios.post('/user.php', {
      type: 'userUpdate',
      token: localStorage.getItem('token'),
      birthday: birthday,
      email: email,
      lastName: lastName,
      loginPhone: loginPhone,
      name: name,
      secondName: secondName,
    });
    return data;
  },
};

export const favoriteService = {
  async getFavorite(): Promise<any> {
    const { data } = await axios.post('/v1/user.php', {
      type: 'getFavorite',
      saleUserId: localStorage.getItem('saleUserId'),
    });
    return data;
  },
  async addFavorite(id: number): Promise<any> {
    const { data } = await axios.post('/v1/cart.php', {
      type: 'addDelay',
      SCUId: id,
      saleUserId: localStorage.getItem('saleUserId'),
    });
    return data;
  },
  async removeFavorite(id: number): Promise<any> {
    const { data } = await axios.post('/v1/cart.php', {
      type: 'removeDelay',
      SCUId: id,
      saleUserId: localStorage.getItem('saleUserId'),
    });
    return data;
  },
};

export const orderListService = {
  async getOrderList(old: boolean): Promise<any> {
    const { data } = await axios.post('/v1/user.php', {
      type: 'getOrderList',
      token: localStorage.getItem('token'),
      old,
    });
    return data;
  },
};

export const addCertificateService = {
  async addCertificate(): Promise<any> {
    const { data } = await axios.post('/v1/user.php', {
      type: 'addCertificate',
      token: localStorage.getItem('token'),
    });
    return data;
  },
  async getCertificates(): Promise<any> {
    const { data } = await axios.post('/v1/user.php', {
      type: 'getCertificates',
      token: localStorage.getItem('token'),
    });
    return data;
  },
};
