import { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { setFooterData } from '@/redux/footerSlice/footerSlice';

import HomePage from '@/components/screens/home/HomePage';

import {
  MainSliderService,
  PromoBlockService,
  RunningLineService,
  NewProductsService,
  JournalService,
  HitsService,
  RunningVerticalLineService,
  SetsService,
} from '@/services';

import { ContactsService } from '@/services/contacts.service';

import { ContactsArray } from '@/interfaces/contact.interface';
import { MainSliderArray } from '@/interfaces/mainSlider.inerface';
import { RunningLineArray } from '@/interfaces/runningLine.interface';
import { NewProducts } from '@/interfaces/newProducts.interface';
import { CatalogArray } from '@/interfaces/catalog.interface';
import { setHits } from '@/redux/hitsSlice/hitsSlice';

const Home: NextPage<{
  data: ContactsArray;
  slider: MainSliderArray;
  runningLine: RunningLineArray;
  runningVerticalLine: RunningLineArray;
  newProducts: NewProducts;
  journal: any;
  hits: any;
  catalog: CatalogArray;
  sets: any;
}> = ({
  data,
  slider,
  runningLine,
  newProducts,
  journal,
  hits,
  runningVerticalLine,
  sets,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFooterData(data));
    dispatch(setHits(hits));
  }, [data]);

  return (
    <HomePage
      slider={slider}
      runningLine={
        runningLine.length < 6 ? [...runningLine, ...runningLine, ...runningLine] : runningLine
      }
      runningVerticalLine={
        runningVerticalLine.length < 6
          ? [...runningVerticalLine, ...runningVerticalLine, ...runningVerticalLine]
          : runningVerticalLine
      }
     
      newProducts={newProducts}
      journal={journal}
      hits={hits}
    />
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: ContactsArray;
  slider: MainSliderArray;
}> = async () => {
  const data = await ContactsService.getContacts(); // данные футера
  const slider = await MainSliderService.getMainSlider(); //данные главного слайдера
  const runningLine = await RunningLineService.getRunningLine(); //данные главного слайдера
  const runningVerticalLine = await RunningVerticalLineService.getRunningLine();
  const newProducts = await NewProductsService.getProductsService();
  const journal = await JournalService.getJournalService();
  const hits = await HitsService.getHitsService();
  const sets = await SetsService.getSetsService();

  return {
    props: {
      data,
      slider,
      runningLine,
      newProducts,
      journal,
      hits,
      sets,
      runningVerticalLine,
    },
  };
};

export default Home;
