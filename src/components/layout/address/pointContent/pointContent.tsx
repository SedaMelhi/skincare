import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Input from "@/components/other/input/input";

import style from "./pointContent.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { IMapData } from "../yandexMap/yandexMap";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  fetchAddresses,
  fetchAddressesList,
  setAddress,
  setSelectedCityCode,
} from "@/redux/addressSlice/addressSlice";
import { AppDispatch } from "@/redux/store";

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
  address: string;
}

interface ICloseAside {
  closeAside: () => void;
  activeAddress: IAddressObj | any;
  setActiveAddress: (address: IAddressObj) => void;
  setMapCenter: (coordinates: number[], zoom: number) => void;
  selectedService: number;
  setSelectedService: (selected: number) => void;
}

const PointContent: FC<ICloseAside> = ({
  closeAside,
  activeAddress,
  setActiveAddress,
  setMapCenter,
  selectedService,
  setSelectedService,
}) => {
  const [city, setCity] = useState("");
  // const [street, setStreet] = useState("S");
  // const [apartment, setApartment] = useState("A"); //квартира
  // const [intercom, setIntercom] = useState(""); //домофон
  // const [entrance, setEntrance] = useState(""); //подъезд
  // const [floor, setFloor] = useState(""); //этаж
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const dispatch = useDispatch<AppDispatch>();

  const [expandedAddress, setExpandedAddress] = useState<string | false>(false);
  const [filteredCities, setFilteredCities] = useState<
    { name: string; code: number; coordinates: number[] }[]
  >([]);
  const { cities, pochtaCities } = useSelector((state: any) => state.address);
  const [debouncedCity, setDebouncedCity] = useState(city);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserInput, setIsUserInput] = useState(false);

  const activeAccordionRef = useRef<HTMLDivElement | null>(null);

  const mapData: IMapData[] = useSelector(
    (state: any) => state.address.mapData
  );

  const pochtaMapData: IMapData[] = useSelector(
    (state: any) => state.address.pochtaMapData
  );

  const handleAccordionChange = useCallback(
    (address: IAddressObj) =>
      (event: React.SyntheticEvent, isExpanded: boolean) => {
        // setExpandedAddress(isExpanded ? `panel${address.id}` : false);

        if (isExpanded) {
          setActiveAddress(address);
          setMapCenter(address.geometry.coordinates, 20);
        }
      },
    [setActiveAddress, setMapCenter]
  );

  useEffect(() => {
    if (activeAddress) {
      if (selectedService === 0) {
        setExpandedAddress(
          `panel${mapData.findIndex((item) => item.id === activeAddress.id)}`
        );
      } else {
        setExpandedAddress(
          `panel${pochtaMapData.findIndex(
            (item) => item.id === activeAddress.id
          )}`
        );
      }
    }
  }, [activeAddress, mapData, pochtaMapData]);

  const handleSaveAddress = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, address: IAddressObj) => {
      e.preventDefault();
      dispatch(setAddress({ full_address: address.address }));
      closeAside();
    },
    [setActiveAddress, setMapCenter]
  );

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
          c.name.toLowerCase().includes(debouncedCity.toLowerCase())
        )
      );
      if (isUserInput) {
        setShowSuggestions(true);
      }
      if (selectedService === 1) {
        dispatch(fetchAddressesList(debouncedCity));
      }
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  }, [debouncedCity, cities, selectedService, dispatch]);

  const handleCitySelect = (
    city_select: string,
    code: number,
    coordinates: number[]
  ) => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 500);
    setIsUserInput(false);
    if (selectedService === 0) {
      setCity(city_select);
    }
    dispatch(setSelectedCityCode(code));
    setMapCenter(coordinates, 13);

    if (selectedService === 1) {
      dispatch(fetchAddresses({ city, code }));
    }
  };
  const handleTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      event.preventDefault();
      setCity("");
      setSelectedService(newValue);
    },

    [setSelectedService]
  );

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCity(e.target.value);
      setIsUserInput(true);
    },
    []
  );

  useEffect(() => {
    setTimeout(() => {
      if (activeAccordionRef.current) {
        activeAccordionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, 300);
  }, [activeAccordionRef.current, activeAddress]);

  const renderServicePoints = useCallback(() => {
    if (selectedService === 0) {
      // СДЭК
      return mapData.map((item, index) => (
        <Accordion
          ref={expandedAddress === `panel${index}` ? activeAccordionRef : null}
          className={`${style.accordion} ${
            activeAddress.id !== item.id ? style.accord_hover : ""
          }`}
          key={item.id}
          expanded={expandedAddress === `panel${index}`}
          onChange={handleAccordionChange(item)}
        >
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
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
                <div className={style.subtitle_price}>СТОИМОСТЬ</div>
                <div className={style.delivery_price}>350 ₽</div>
                <div className={style.subtitle}>Режим работы</div>
                <ul className={style.times}>
                  {activeAddress.work_time_list.map((item: any, i: number) => (
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
      ));
    } else if (selectedService === 1) {
      // Почта России
      return pochtaMapData.map((item, index) => (
        <Accordion
          ref={expandedAddress === `panel${index}` ? activeAccordionRef : null}
          className={`${style.accordion} ${
            activeAddress?.id !== item?.id ? style.accord_hover : ""
          }`}
          key={item.id}
          expanded={expandedAddress === `panel${index}`}
          onChange={handleAccordionChange(item)}
        >
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <div>{item.address}</div>
          </AccordionSummary>
          <AccordionDetails>
            {activeAddress && activeAddress.id === item.id && (
              <div className={style.middle}>
                <div className={style.title}>Почта России</div>
                <div className={style.address}>
                  {activeAddress.properties.balloonContentHeader}
                </div>
                <div className={style.subtitle_price}>СТОИМОСТЬ</div>
                <div className={style.delivery_price}>350 ₽</div>
                <div className={style.subtitle}>Режим работы</div>
                <ul className={style.times}>
                  {activeAddress.work_time_list.map((item: any, i: number) => (
                    <li key={i}>
                      <span>{days[i] + ":"}</span>{" "}
                      {item.time ? item.time : "выходной"}
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
      ));
    }
  }, [
    selectedService,
    mapData,
    pochtaMapData,
    expandedAddress,
    handleAccordionChange,
    activeAddress,
    days,
    handleSaveAddress,
  ]);

  return (
    <form className={style.form}>
      <div className={style.content}>
        <div className={style.margin}>
          <Input
            placeholder="Город"
            value={city}
            type="text"
            isNecessary={true}
            onChange={handleCityChange}
          />
          {showSuggestions &&
            (filteredCities.length > 0 || pochtaCities.length > 0) && (
              <Paper className={style.suggestions}>
                <List>
                  {(selectedService === 0 ? filteredCities : pochtaCities).map(
                    (c: any) => (
                      <ListItem
                        className={style.address_item}
                        key={selectedService === 0 ? c.code : c.id}
                        onClick={() =>
                          handleCitySelect(c.name, c.code, c.coordinates)
                        }
                      >
                        <ListItemText primary={c.name} />
                      </ListItem>
                    )
                  )}
                </List>
              </Paper>
            )}
        </div>
        <div className={style.toggleButtonGroup}>
          <button
            onClick={(e) => handleTabChange(e, 0)}
            value="СДЭК"
            className={`${style.toggleButton} ${
              selectedService === 0 ? style.selected : ""
            }`}
          >
            СДЭК
          </button>
          <button
            onClick={(e) => handleTabChange(e, 1)}
            value="Почта России"
            className={`${style.toggleButton} ${
              selectedService === 1 ? style.selected : ""
            }`}
          >
            ПОЧТА РОССИИ
          </button>
        </div>
      </div>
      <div className={style.addresses}>{renderServicePoints()}</div>
    </form>
  );
};

export default PointContent;
