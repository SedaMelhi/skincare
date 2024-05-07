import axios from 'axios';
import { API_URL } from '.';

axios.defaults.baseURL = API_URL;
export const certificateService = {
  async createCertificate(dataSend: {
    phone: string;
    name: string;
    surname: string;
    date: string;
    design: number | null;
    price: number | null;
    whoIs: string;
    wishes: string;
    pay: string;
  }): Promise<any> {
    const { data } = await axios.post('v1/certificate.php', {
      type: 'createCertificate',
      ...dataSend,
    });
    return data;
  },
};
