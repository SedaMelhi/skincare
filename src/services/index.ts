import axios from 'axios';
import { MainSliderArray } from '@/interfaces/mainSlider.inerface';
import { RunningLineArray } from '@/interfaces/runningLine.interface';
import { PromoBlockArray } from '@/interfaces/promoBlocks.interface';
import { NewProducts } from '@/interfaces/newProducts.interface';
import { CatalogArray } from '@/interfaces/catalog.interface';
import { IGift } from '@/interfaces/gift.interface';
import { formatText } from './journal.service';

export const API_URL = 'https://b.skincareagents.com/local/api/';
export const API_DOMAIN = 'https://b.skincareagents.com';

axios.defaults.baseURL = API_URL;

export const MainSliderService = {
  async getMainSlider(): Promise<MainSliderArray> {
    const { data } = await axios.post('/v1/main.php', { type: 'mainSlider' });
    return data;
  },
};

export const RunningLineService = {
  async getRunningLine(): Promise<RunningLineArray> {
    const { data } = await axios.post('/v1/main.php', { type: 'runningLine', code: 3 });
    return data;
  },
};

export const RunningVerticalLineService = {
  async getRunningLine(): Promise<RunningLineArray> {
    const { data } = await axios.post('/v1/main.php', { type: 'runningLine', code: 4 });
    return data;
  },
};

export const PromoBlockService = {
  async getPromoBlock(): Promise<PromoBlockArray> {
    const { data } = await axios.post('/v1/main.php', { type: 'mainPromo' });
    return data;
  },
};

export const NewProductsService = {
  async getProductsService(): Promise<NewProducts> {
    const { data } = await axios.post('v1/main.php', { type: 'getNewItems', count: 9 });
    return data;
  },
};
export const GiftsService = {
  async getGiftsService(): Promise<IGift[]> {
    const { data } = await axios.post('/v1/main.php', { type: 'getGifts' });
    return data;
  },
};

export const JournalService = {
  
  async getJournalService(): Promise<any> {
    const { data } = await axios.post('/v1/main.php', { type: 'getJournal' });

    const formattedData = data.map((entry: any) => ({
      ...entry,
      text: formatText(entry.text)
    }));

    return formattedData;
  },
};

export const HitsService = {
  async getHitsService(): Promise<any> {
    const { data } = await axios.post('/v1/main.php', { type: 'getHits', count: 100 });
    return data;
  },
};

export const SetsService = {
  async getSetsService(): Promise<any> {
    const { data } = await axios.post('/v1/main.php', { type: 'getSets' });
    return data;
  },
};

export const CatalogService = {
  async getCatalogService(): Promise<CatalogArray> {
    const { data } = await axios.post('/v1/main.php', { type: 'getCategoryList' });
    return data;
  },
};

//Для регистрации
//import { RegistrationUser } from '@/interfaces/registration.interface';
// export const UserApi = {
//   async register(dto: RegistrationUser) {
//     const { data } = await instance.post('/register.php', dto);
//     return data;
//   },
// };
