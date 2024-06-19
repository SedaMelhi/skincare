import { GetServerSideProps, GetStaticProps, NextPage } from "next";

import PlacingPage from "@/components/screens/placing/placingPage";
import {
  getAddressesService,
  getAllAddressService,
  getCdekTokenService,
} from "@/services/cdek.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setCdekToken,
  setCities,
  setMapData,
} from "@/redux/addressSlice/addressSlice";
import { getBasketService } from "@/services/order.service";
import { IbasketData } from "@/interfaces/basket.interface";
import { IOrder } from "@/interfaces/order.interface";

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
    }
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

const Placing: NextPage<{
  data: IAddressObj[];
  cdekToken: any;
  cities: any;
}> = ({ data, cdekToken, cities }) => {
  const dispatch = useDispatch();
  const selectedCityCode = useSelector(
    (state: any) => state.address.selectedCityCode
  );

  useEffect(() => {
    const yandexMapData: any = data
      ? data
          .map((item) => {
            return {
              type: "Feature",
              id: item.uuid,
              city_code: item.location.city_code,
              geometry: {
                type: "Point",
                coordinates: [
                  item.location?.latitude,
                  item.location?.longitude,
                ],
              },
              properties: {
                balloonContentHeader: item.name,
                balloonContentBody: item.location.address_full,
                balloonContentFooter: item.work_time,
              },
              work_time_list: item.work_time_list,
              address: `${item.location.city}, ${item.location.address}`,
            };
          })
          .filter((item) => item.city_code === selectedCityCode)
      : [];
    dispatch(setMapData(yandexMapData));
    dispatch(setCities(cities));
  }, [selectedCityCode]);

  return <PlacingPage />;
};

export const getServerSideProps: GetStaticProps = async (context) => {
  const cdekToken = await getCdekTokenService.getCdekToken();
  const data = await getAddressesService.getAddresses(cdekToken.access_token);
  const cities = await getAllAddressService.getAddresses(
    cdekToken.access_token
  );

  return {
    props: {
      data,
      cdekToken,
      cities,
    },
  };
};

export default Placing;
