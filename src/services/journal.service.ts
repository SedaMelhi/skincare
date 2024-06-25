import axios from 'axios';

export function formatText(text: string) {
  if (!text) return '';
  
  // Заменяем <br> и <br /> на символы новой строки
  return text.replace(/<br\s*\/?>/gi, '\n').replace(/&(#40|#41);/g, match => {
    if (match === '&#40;') return '(';
    if (match === '&#41;') return ')';
    return match;
  });
}

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
