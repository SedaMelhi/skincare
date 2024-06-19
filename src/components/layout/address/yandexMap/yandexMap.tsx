import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  GeolocationControl,
} from "react-yandex-maps";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { IAddressObj } from "../address";

interface IWorkTimeList {
  day: number;
  time: string;
}

export interface IMapData {
  geometry: { coordinates: number[]; type: string };
  id: string;
  properties: {
    balloonContentBody: string;
    balloonContentFooter: string;
    balloonContentHeader: string;
  };
  type: "Feature";
  work_time_list: IWorkTimeList[];
  address: string;
}
interface IYandexMap {
  setActiveAddress: Dispatch<SetStateAction<IAddressObj | null>>;
  mapCenter: number[];
  mapZoom: number;
}

const YandexMap: FC<IYandexMap> = ({
  setActiveAddress,
  mapCenter,
  mapZoom,
}) => {
  const apiKey = "aabbc81f-486d-4525-9b53-133c380eb5fe";
  const mapData: IMapData[] = useSelector(
    (state: any) => state.address.mapData
  );
  const [mapState, setMapState] = useState({
    center: mapCenter,
    zoom: mapZoom,
  });

  const handleMarkerClick = (index: number) => {
    const clickedPlacemark = mapData[index];
    const newMapState = {
      center: clickedPlacemark.geometry.coordinates,
      zoom: mapState.zoom === 19 ? 20 : 19, // Установите желаемый масштаб
    };
    setActiveAddress(mapData[index]);

    setMapState(newMapState);
  };

  useEffect(() => {
    setMapState((prevState) => ({
      ...prevState,
      center: mapCenter,
      zoom: mapZoom,
    }));
  }, [mapCenter, mapZoom]);

  return (
    <YMaps query={{ apikey: apiKey }}>
      <Map state={mapState} width={100}>
        <ZoomControl />
        <GeolocationControl />
        {mapData.map(({ geometry, properties, id }, index) => (
          <Placemark
            key={id}
            geometry={geometry.coordinates}
            properties={properties}
            onClick={() => handleMarkerClick(index)}
            options={{ draggable: false }}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
