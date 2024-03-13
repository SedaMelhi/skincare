import axios from 'axios';

import { ContactsArray } from '@/interfaces/contact.interface';

const API_URL = 'https://b.skincareagents.com/local/api/';

axios.defaults.baseURL = API_URL;

export const ContactsService = {
  async getContacts(): Promise<ContactsArray> {
    const { data } = await axios.post<ContactsArray>('/main.php', { type: 'siteInfo' });
    return data;
  },
};
