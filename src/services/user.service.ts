import axios from 'axios';

const API_URL = 'https://b.skincareagents.com/local/api/';

axios.defaults.baseURL = API_URL;

export const getCityService = {
  async getCity(city: string): Promise<any> {
    const { data } = await axios.post('v1/user.php', {
      type: 'searchCity',
      typeId: '3',
      city: city,
    });
    return data;
  },
};
