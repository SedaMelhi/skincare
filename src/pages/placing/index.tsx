import { GetServerSideProps, GetStaticProps, NextPage } from 'next';

import PlacingPage from '@/components/screens/placing/placingPage';
import { getAddressesService, getCdekTokenService } from '@/services/cdek.service';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setMapData } from '@/redux/addressSlice/addressSlice';
import { getBasketService } from '@/services/order.service';
import { IbasketData } from '@/interfaces/basket.interface';
import { IOrder } from '@/interfaces/order.interface';

// {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},

interface IWorkTimeList {
  day: number;
  time: string;
}

interface IAddressObj {
  code: string;
  name: string;
  uuid: string;
  location: {
    country_code: string;
    region_code: number;
    region: string;
    city_code: number;
    city: string;
    postal_code: string;
    longitude: number;
    latitude: number;
    address: string;
    address_full: string;
  };
  address_comment: string;
  nearest_station: string;
  nearest_metro_station: string;
  work_time: string;
  phones: [
    {
      number: string;
    },
  ];
  email: string;
  note: string;
  type: string;
  owner_code: string;
  take_only: false;
  is_dressing_room: true;
  have_cashless: true;
  have_cash: true;
  allowed_cod: true;
  work_time_list: IWorkTimeList[];
  weight_min: number;
  weight_max: number;
}

const Placing: NextPage<{ data: IAddressObj[]; cdekToken: any; basket: IOrder }> = ({
  data,
  cdekToken,
  basket,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const yandexMapData: any = data
      ? data.map((item) => {
          return {
            type: 'Feature',
            id: item.uuid,
            geometry: {
              type: 'Point',
              coordinates: [item.location?.latitude, item.location?.longitude],
            },
            properties: {
              balloonContentHeader: item.name,
              balloonContentBody: item.location.address_full,
              balloonContentFooter: item.work_time,
            },
            work_time_list: item.work_time_list,
          };
        })
      : [];
    dispatch(setMapData(yandexMapData));
  }, []);

  return <PlacingPage basket={basket} />;
};

export const getServerSideProps: GetStaticProps = async (context) => {
  const cdekToken = await getCdekTokenService.getCdekToken();
  const data = await getAddressesService.getAddresses(cdekToken.access_token);
  const basket = await getBasketService.getBasket();
  return {
    props: { data, cdekToken, basket },
  };
};

export default Placing;
