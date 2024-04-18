import axios from 'axios';

export const CatalogService = {
  async getCatalog({ type, sectionId, limit, offset }: any): Promise<any> {
    const params = {
      type: type,
      sectionId: sectionId,
      limit: limit,
      offset: offset,
    };

    const { data } = await axios.post<any>('catalogue/index.php', params);
    return data;
  },
};

export const CardService = {
  async getCard({ type, itemId }: any): Promise<any> {
    const params = {
      type: type,
      itemId: itemId,
    };
    const { data } = await axios.post<any>('catalog.php', params);
    return data;
  },
};
