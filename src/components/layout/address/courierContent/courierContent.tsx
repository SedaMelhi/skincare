import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "@/redux/addressSlice/addressSlice";

import Input from "@/components/other/input/input";
import Select from "../select/Select";

import style from "./courierContent.module.sass";
import { getUserAddressService } from "@/services/profile.service";

interface ICloseAside {
  closeAside: () => void;
}
export interface IAddress {
  address: {
    address: {
      city: { id: false | number; name: string };
      street: { id: false | number; name: string };
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
  const [city, setCity] = useState<{ id: false | number; name: string }>(
    address.city
  );
  const [street, setStreet] = useState<{ id: false | number; name: string }>(
    address.street
  );
  const [house, setHouse] = useState(address.house);
  const [apartment, setApartment] = useState(address.apartment); //квартира
  const [intercom, setIntercom] = useState(address.intercom); //домофон
  const [entrance, setEntrance] = useState(address.entrance); //подъезд
  const [floor, setFloor] = useState(address.floor); //этаж
  const [error, setError] = useState<string>("");
  
  const dispatch = useDispatch();

  const getCityData = (setValue: any) => {
    fetch("https://b.skincareagents.com/local/api/v1/user.php", {
      method: "POST",
      body: JSON.stringify({
        type: "searchCity",
        typeId: "3",
        city: city.name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {

        setValue(res);
      });
  };

  const getStreetData = (setValue: any) => {
    city.id &&
      fetch("https://b.skincareagents.com/local/api/v1/user.php", {
        method: "POST",
        body: JSON.stringify({
          type: "searchStreet",
          street: street.name,
          city: city.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setValue(res);
        });
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
          street: street.name,
          house: house,
          apartment,
          entrance,
          intercom,
          floor,
        },
      }),
    })
      .then((res) => res.json())
  };
  useEffect(() => {
    setCity(address.city);
    setStreet(address.street);
    setHouse(address.house);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const data = getUserAddressService.getAddress();

      data.then((res: { "3": { [key: string]: { addressDetail: any } } }) => {
        const addressDetail = Object.values(res["3"])[
          Object.values(res["3"]).length - 1
        ].addressDetail;

        setAddress((prev: any) => {
          return {
            city: { id: true, name: addressDetail.city },
            street: { id: true, name: addressDetail.street },
            house: addressDetail.house,
            apartment: addressDetail.apartment,
            intercom: addressDetail.intercom,
            entrance: addressDetail.entrance,
            floor: addressDetail.floor,
            full_address: `${addressDetail.city}, ул. ${street}${
              house && ", дом " + house
            }  ${entrance && ", подъезд " + entrance}${
              apartment && ", кв./офис " + apartment
            }${floor && ", этаж " + floor}${
              intercom && ", домофон  " + intercom
            }`,
          };
        });
      });
    }
  }, []);

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
            placeholder="Город"
            error={error}
            setError={setError}
          />
        </div>
        <div className={style.input__line}>
          <div className={style.input}>
            <Select
              value={street}
              disabled={![city.id].every((item) => item)}
              setValue={setStreet}
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
              type="number"
              isNecessary={false}
              disabled={
                ![city.id, street.id, house, apartment].every((item) => item)
              }
              onChange={(e) => setIntercom(e.target.value)}
            />
          </div>
        </div>
        <div className={style.input__line}>
          <div className={style.input}>
            <Input
              placeholder="подъезд"
              value={entrance}
              type="number"
              isNecessary={false}
              disabled={
                ![city.id, street.id, house, apartment].every((item) => item)
              }
              onChange={(e) => setEntrance(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <Input
              placeholder="этаж"
              value={floor}
              type="number"
              isNecessary={false}
              disabled={
                ![city.id, street.id, house, apartment].every((item) => item)
              }
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
