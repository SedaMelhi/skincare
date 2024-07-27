import withAuth from "@/components/withAuth";
import MapsPage from "./../../components/screens/maps/mapsPage";
import { GetStaticProps, NextPage } from "next";
import {
  getAddressesService,
  getCdekTokenService,
} from "@/services/cdek.service";
import {
  fetchAddresses,
  setCities,
  setMapData,
} from "@/redux/addressSlice/addressSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { IAddressObj, ICity } from "../placing";

const Maps: NextPage<{ data: IAddressObj[] }> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCityCode = useSelector(
    (state: RootState) => state.address.selectedCityCode
  );

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

    const cities = data.reduce<ICity[]>((acc, current) => {
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
  }, [selectedCityCode]);

  useEffect(() => {
    dispatch(fetchAddresses({ city: "Грозный", code: "" }));
  }, []);

  return <MapsPage />;
};

export default withAuth(Maps);

export const getServerSideProps: GetStaticProps = async (context) => {
  const cdekToken = await getCdekTokenService.getCdekToken();
  const data = await getAddressesService.getAddresses(cdekToken.access_token);

  return {
    props: {
      data,
      cdekToken,
    },
  };
};
