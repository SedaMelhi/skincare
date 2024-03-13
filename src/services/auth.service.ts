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

/** 
type: 'userRegister',
{
  type: 'userInfo',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoxOCwibmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsInNlY29uZF9uYW1lIjoiIiwiZW1haWwiOiIifSwidWlkIjoiMTgiLCJpYXQiOjE3MDIxMzAzNDYsImV4cCI6MTcwMjEzODk0Nn0.T10j9OxksTwz7_LyG7iojzrmtG9sxcPw0SPxfcILIDA',

    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiU2VkYSIsImxhc3RfbmFtZSI6Ikd1ZGlldmEiLCJzZWNvbmRfbmFtZSI6IlMiLCJlbWFpbCI6Im1haWxAbWFpbC5ydSJ9LCJ1aWQiOiIxIiwiaWF0IjoxNzAyMTMwNjE0LCJleHAiOjE3MDIxMzkyMTR9.sehH7y6q-j0dsBB-GKKg3P9SisG5q_yP-6b0SB8XvNs
}
{
  type: 'getToken',
  phone: '7777777',
  pass: '580890',


  phone: 'root',
  pass: 'x97_hwU!34',
}
  type: 'userUpdate',
  birthday: '14.08.96',
  email: 'g.seda.g1996@gmail.com',
  lastName: 'Gudieva',
  loginPhone: '555554',
  name: 'Seda',
  secondName: 'S',
 */
