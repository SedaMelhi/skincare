import axios from 'axios';

export const CatalogService = {
  async getCatalog({ type, sectionId, count, itemId, numPage }: any): Promise<any> {
    const params = sectionId
      ? {
          type: type,
          sectionId: sectionId,
          count: count,
          numPage: numPage,
        }
      : {
          type: type,
          itemId: itemId,
        };
    const { data } = await axios.post<any>('catalogue.php', params);
    return data;
  },
};
