import axios from 'axios';

export const CatalogService = {
  async getCatalog({ type, sectionId, limit, itemId, offset }: any): Promise<any> {
    const params = sectionId
      ? {
          type: type,
          sectionId: sectionId,
          limit: limit,
          offset: offset,
        }
      : {
          type: type,
          itemId: itemId,
        };
    const { data } = await axios.post<any>('catalogue.php', params);
    return data;
  },
};
