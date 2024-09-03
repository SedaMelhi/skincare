import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "@/redux/addressSlice/addressSlice";
import { getCityService, getStreetService } from "@/services/address.service";

import Input from "@/components/other/input/input";
import Select from "../select/Select";

import style from "./courierContent.module.sass";

interface ICloseAside {
  closeAside: () => void;
}
export interface IAddress {
  address: {
    address: {
      city: { id: false | string; name: string };
      street: { id: false | string; name: string };
      house: string;
      apartment: string;
      intercom: string;
      entrance: string;
      floor: string;
      full_address: string;
    };
  };
}
const CourierContent: FC<ICloseAside> = ({ closeAside }) => {
  const address = useSelector((state: IAddress) => state.address.address);
  const [city, setCity] = useState<{ id: false | string; name: string }>(
    address.city
  );
  const [street, setStreet] = useState<{ id: false | string; name: string }>(
    address.street
  );
  const [house, setHouse] = useState(address.house);
  const [apartment, setApartment] = useState(address.apartment); //квартира
  const [intercom, setIntercom] = useState(address.intercom); //домофон
  const [entrance, setEntrance] = useState(address.entrance); //подъезд
  const [floor, setFloor] = useState(address.floor); //этаж
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const getCityData = (setValue: any) => {
    console.log(city);
    const data = getCityService.getCity(city.name);
    data.then((res) => {
      setValue(res);
    });
  };

  const getStreetData = (setValue: any) => {
    if (city.id && street.name.length > 0) {
      const data = getStreetService.getStreet(street.name, city.id);
      data.then((res) => {
        console.log(res);
        if (res) setValue(res);
      });
    }
  };
  const sendData = () => {
    fetch("https://b.skincareagents.com/local/api/v1/user.php", {
      method: "POST",
      body: JSON.stringify({
        type: "addAddress",
        token: localStorage.getItem("token"),
        typeId: "3",
        address: {
          zip: "",
          country: "Россия",
          city: city.name,
          street: street.name + ", д " + house,
          apartment,
          entrance,
          intercom,
          floor,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {});
  };

  useEffect(() => {
    setCity(address.city);
    setHouse(address.house);
    setStreet(address.street);
    setApartment(address.apartment);
    setIntercom(address.intercom);
    setEntrance(address.entrance);
    setFloor(address.floor);
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);
  useEffect(() => {
    if (city.id) {
      dispatch(
        setAddress({
          city,
          street: { id: false, name: "" },
          house: "",
          apartment: "",
          intercom: "",
          entrance: "",
          floor: "",
          full_address: "",
        })
      );
    }
  }, [city]);
  useEffect(() => {
    dispatch(
      setAddress({
        city,
        street,
        house,
        apartment,
        intercom,
        entrance,
        floor,
      })
    );
  }, [street, house, apartment, intercom, entrance, floor]);
  console.log(address);

  const saveAddress = () => {
    dispatch(
      setAddress({
        full_address: `${city.name}, ул. ${street.name + ", д " + house}${
          entrance && ", подъезд " + entrance
        }${apartment && ", кв./офис " + apartment}${
          floor && ", этаж " + floor
        }${intercom && ", домофон  " + intercom}`,
      })
    );
  };

  return (
    <form className={style.form}>
      <div className={style.content}>
        <div className={style.margin}>
          <Select
            value={city}
            setValue={setCity}
            getData={getCityData}
            error={error}
            setError={setError}
            placeholder="Город"
          />
        </div>
        <div className={style.input__line}>
          <div className={style.input}>
            <Select
              value={street}
              setValue={setStreet}
              disabled={![city.id].every((item) => item)}
              getData={getStreetData}
              placeholder="улица"
              error={error}
              setError={setError}
            />
          </div>
          <div className={style.input}>
            <Input
              placeholder="дом"
              value={house}
              disabled={![city.id, street.id].every((item) => item)}
              type="text"
              isNecessary={true}
              onChange={(e) => setHouse(e.target.value)}
            />
          </div>
        </div>
        <div className={style.input__line}>
          <div className={style.input}>
            <Input
              placeholder="кв./офис"
              value={apartment}
              type="text"
              isNecessary={true}
              disabled={![city.id, street.id, house].every((item) => item)}
              onChange={(e) => setApartment(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <Input
              placeholder="домофон"
              value={intercom}
              disabled={
                ![city.id, street.id, house, apartment].every((item) => item)
              }
              type="number"
              isNecessary={false}
              onChange={(e) => setIntercom(e.target.value)}
            />
          </div>
        </div>
        <div className={style.input__line}>
          <div className={style.input}>
            <Input
              placeholder="подъезд"
              value={entrance}
              disabled={
                ![city.id, street.id, house, apartment].every((item) => item)
              }
              type="number"
              isNecessary={false}
              onChange={(e) => setEntrance(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <Input
              placeholder="этаж"
              value={floor}
              disabled={
                ![city.id, street.id, house, apartment].every((item) => item)
              }
              type="number"
              isNecessary={false}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className={
          style.btn +
          " " +
          (!(street && apartment && city && house) ? style.disabled : "")
        }
        title={
          !(street && apartment && city && house)
            ? "заполните все обязательные поля"
            : ""
        }
        disabled={!(street && apartment && city && house)}
        onClick={(e) => {
          closeAside();
          e.preventDefault();
          if (localStorage.getItem("token")) {
            sendData();
          } else {
            saveAddress();
          }
        }}
      >
        сохранить адрес
      </button>
    </form>
  );
};

export default CourierContent;
