import { NextPage } from "next";
import PlacingPage from "@/components/screens/placing/placingPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAddresses,
  setCities,
  setMapData,
} from "@/redux/addressSlice/addressSlice";
import { AppDispatch, RootState } from "@/redux/store";

// {"type": "Feature", "id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}, "properties": {"balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>", "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>", "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>", "clusterCaption": "<strong><s>Еще</s> одна</strong> метка", "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}},

interface IWorkTimeList {
  day: number;
  time: string;
}

export interface ICity {
  name: string;
  coordinates: number[];
  code: number;
}

export interface IAddressObj {
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

const Placing: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCityCode = useSelector(
    (state: RootState) => state.address.selectedCityCode
  );

  const [data, setData] = useState<IAddressObj[]>();

  const fetchData = async () => {
    const response = await fetch("/api/getAddresses");
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const yandexMapData: any = data
      ? data
          .map((item) => {
            return {
              type: "Feature",
              id: item.uuid,
              code: item.code,
              city_code: item.location.city_code,
              region_code: item.location.region_code,
              geometry: {
                type: "Point",
                coordinates: [
                  item.location?.latitude,
                  item.location?.longitude,
                ],
              },
              properties: {
                balloonContentHeader: `${item.location.city}, ${item.location.address}`,
                balloonContentBody: item.location.address_full,
                balloonContentFooter: item.work_time,
              },
              work_time_list: item.work_time_list,
              address: `${item.location.city}, ${item.location.address}`,
            };
          })
          .filter((item) => item.city_code === selectedCityCode)
      : [];

    const cities = data?.reduce<ICity[]>((acc, current) => {
      // Проверяем, есть ли город уже в массиве уникальных городов
      const cityExists = acc.find(
        (city) => city.code === current.location.city_code
      );

      if (!cityExists) {
        // Если город не найден, добавляем его в массив уникальных городов
        acc.push({
          name: `${current.location.region}, ${current.location.city}`,
          coordinates: [current.location.latitude, current.location.longitude], // Обратите внимание на широту и долготу
          code: current.location.city_code,
        });
      }

      return acc;
    }, []); // Изначально массив уникальных городов пуст

    dispatch(setMapData(yandexMapData));
    dispatch(setCities(cities));
  }, [selectedCityCode, data]);

  useEffect(() => {
    dispatch(fetchAddresses({ city: "Грозный", code: "" }));
  }, []);

  return <PlacingPage />;
};

export default Placing;
