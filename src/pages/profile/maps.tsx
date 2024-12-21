import withAuth from "@/components/withAuth";
import MapsPage from "./../../components/screens/maps/mapsPage";
import { NextPage } from "next";

import {
  fetchAddresses,
  setCities,
  setMapData,
} from "@/redux/addressSlice/addressSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { IAddressObj, ICity } from "../placing";

const Maps: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCityCode = useSelector(
    (state: RootState) => state.address.selectedCityCode
  );

  const [data, setData] = useState<IAddressObj[]>();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getAddresses");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
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

  return <MapsPage />;
};

export default withAuth(Maps);
