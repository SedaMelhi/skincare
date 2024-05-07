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

export const FilterService = {
  async getFilterItems(id: any): Promise<any> {
    const params = {
      type: 'getFilterParams',
      sectionId: id,
    };
    const { data } = await axios.post<any>('v1/catalog.php', params);
    return data;
  },
  async getData(id: any, discount: any, filterParams: any): Promise<any> {
    const params = {
      type: 'useFilter',
      sectionId: id,
      sort: 'popular',
      discount: discount,
      S10: ['8'],
    };
    const { data } = await axios.post<any>('v1/catalog.php', params);
    return data;
  },
};
