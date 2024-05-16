import axios from 'axios';

export const JournalService = {
  async getJournal({ categoryId, limit, offset }: any): Promise<any> {
    const params = {
      type: 'getItemsList',
      offset: offset,
      limit: limit,
      categoryId: categoryId,
    };

    const { data } = await axios.post<any>('journal.php', params);
    return data;
  },
  async getMainItem(): Promise<any> {
    const params = {
      type: 'getPrimary',
    };

    const { data } = await axios.post<any>('journal.php', params);
    return data;
  },
  async getDetail(id: any): Promise<any> {
    const params = {
      type: 'getDetail',
      id,
    };

    const { data } = await axios.post<any>('journal.php', params);
    return data;
  },
};
