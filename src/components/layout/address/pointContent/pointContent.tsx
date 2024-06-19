import { FC, useEffect, useState } from "react";

import Input from "@/components/other/input/input";

import style from "./pointContent.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { IMapData } from "../yandexMap/yandexMap";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  setAddress,
  setMapData,
  setSelectedCityCode,
} from "@/redux/addressSlice/addressSlice";

interface IWorkTimeList {
  day: number;
  time: string;
}

interface IAddressObj {
  geometry: { coordinates: number[]; type: string };
  id: string;
  properties: {
    balloonContentBody: string;
    balloonContentFooter: string;
    balloonContentHeader: string;
  };
  type: "Feature";
  work_time_list: IWorkTimeList[];
}

interface ICloseAside {
  closeAside: () => void;
  activeAddress: IAddressObj | null;
  setActiveAddress: (address: IAddressObj) => void;
  setMapCenter: (coordinates: number[], zoom: number) => void;
}

const PointContent: FC<ICloseAside> = ({
  closeAside,
  activeAddress,
  setActiveAddress,
  setMapCenter,
}) => {
  const [city, setCity] = useState("");
  // const [street, setStreet] = useState("S");
  // const [apartment, setApartment] = useState("A"); //квартира
  // const [intercom, setIntercom] = useState(""); //домофон
  // const [entrance, setEntrance] = useState(""); //подъезд
  // const [floor, setFloor] = useState(""); //этаж
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const dispatch = useDispatch();

  const [expandedAddress, setExpandedAddress] = useState<string | false>(false);
  const [filteredCities, setFilteredCities] = useState<
    { city: string; code: number }[]
  >([]);
  const cities = useSelector((state: any) => state.address.cities);
  const [debouncedCity, setDebouncedCity] = useState(city);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAccordionChange =
    (address: IAddressObj) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setActiveAddress(address);
        setMapCenter(address.geometry.coordinates, 20);
      }
    };

  const mapData: IMapData[] = useSelector(
    (state: any) => state.address.mapData
  );

  console.log("mapData", filteredCities);
  useEffect(() => {
    if (activeAddress) {
      setExpandedAddress(
        `panel${mapData.findIndex((item) => item.id === activeAddress.id)}`
      );
    }
  }, [activeAddress, mapData]);

  const handleSaveAddress = (
    e: React.MouseEvent<HTMLButtonElement>,
    address: IAddressObj
  ) => {
    e.preventDefault();
    dispatch(setAddress(address));
    closeAside();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    if (debouncedCity) {
      setFilteredCities(
        cities.filter((c: any) =>
          c.city.toLowerCase().includes(debouncedCity.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  }, [debouncedCity, cities]);

  const handleCitySelect = (
    city: string,
    code: number,
    coordinates: number[]
  ) => {
    setCity(city);
    dispatch(setSelectedCityCode(code));
    setMapCenter(coordinates, 13);
    setShowSuggestions(false);
  };

  return (
    <form className={style.form}>
      <div className={style.content}>
        <div className={style.margin}>
          <Input
            placeholder="Город"
            value={city}
            type="text"
            isNecessary={true}
            onChange={(e) => setCity(e.target.value)}
          />
          {showSuggestions && filteredCities.length > 0 && (
            <Paper className={style.suggestions}>
              <List>
                {filteredCities.map((c: any) => (
                  <ListItem
                    style={{ cursor: "pointer" }}
                    key={c.code}
                    onClick={() =>
                      handleCitySelect(c.city, c.code, [
                        c.latitude,
                        c.longitude,
                      ])
                    }
                  >
                    <ListItemText primary={c.city} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>
      </div>
      {mapData.map((item, index) => (
        <Accordion
          key={item.id}
          expanded={expandedAddress === `panel${index}`}
          onChange={handleAccordionChange(item)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography>{item.address}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {activeAddress && activeAddress.id === item.id && (
              <div className={style.middle}>
                <div className={style.title}>СДЭК</div>
                <div className={style.address}>
                  {activeAddress.properties.balloonContentHeader}
                </div>
                <div className={style.subtitle}>Режим работы</div>
                <ul className={style.times}>
                  {activeAddress.work_time_list.map((item, i) => (
                    <li key={i}>
                      <span>{days[i] + ":"}</span> {item.time}
                    </li>
                  ))}
                </ul>
                <button
                  className={style.btn}
                  onClick={(e) => handleSaveAddress(e, item)}
                >
                  выбрать
                </button>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </form>
  );
};

export default PointContent;
