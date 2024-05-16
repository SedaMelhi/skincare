import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { yandexData } from '@/pages/placing/data';

interface IWorkTimeList {
  day: number;
  time: string;
}

interface IMapData {
  geometry: { coordinates: number[]; type: string };
  id: string;
  properties: {
    balloonContentBody: string;
    balloonContentFooter: string;
    balloonContentHeader: string;
  };
  type: 'Feature';
  work_time_list: IWorkTimeList[];
}
interface IYandexMap {
  setActiveAddress: Dispatch<SetStateAction<IMapData | null>>;
}
const YandexMap: FC<IYandexMap> = ({ setActiveAddress }) => {
  const apiKey = 'aabbc81f-486d-4525-9b53-133c380eb5fe';
  const mapData: IMapData[] = yandexData;
  //useSelector((state: any) => state.address.mapData);
  const [mapState, setMapState] = useState({
    center: [43.33417, 45.68794],
    zoom: 15,
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
