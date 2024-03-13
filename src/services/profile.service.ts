import axios from 'axios';
const API_URL = 'https://b.skincareagents.com/local/api/';

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
