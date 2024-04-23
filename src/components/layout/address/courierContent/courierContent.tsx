import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '@/redux/addressSlice/addressSlice';

import Input from '@/components/other/input/input';
import Select from '../select/Select';

import style from './courierContent.module.sass';

interface ICloseAside {
  closeAside: () => void;
}
interface IAddress {
  address: {
    address: {
      city: { id: false | number; name: string };
      street: { id: false | number; name: string };
      apartment: string;
      intercom: string;
      entrance: string;
      floor: string;
    };
  };
}
const CourierContent: FC<ICloseAside> = ({ closeAside }) => {
  const address = useSelector((state: IAddress) => state.address.address);
  const [city, setCity] = useState<{ id: false | number; name: string }>(address.city);
  const [street, setStreet] = useState<{ id: false | number; name: string }>(address.street);
  const [apartment, setApartment] = useState(address.apartment); //квартира
  const [intercom, setIntercom] = useState(address.intercom); //домофон
  const [entrance, setEntrance] = useState(address.entrance); //подъезд
  const [floor, setFloor] = useState(address.floor); //этаж
  const dispatch = useDispatch();
  const getCityData = (setValue: any) => {
    fetch('https://b.skincareagents.com/local/api/v1/user.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'searchCity',
        typeId: '3',
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
      fetch('https://b.skincareagents.com/local/api/v1/user.php', {
        method: 'POST',
        body: JSON.stringify({
          type: 'searchStreet',
          street: street.name,
          city: city.id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setValue(res);
        });
  };
  const sendData = (e: any) => {
    e.preventDefault();
    fetch('https://b.skincareagents.com/local/api/v1/user.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'addAddress',
        token: localStorage.getItem('token'),
        typeId: '3',
        address: {
          zip: '',
          country: 'Россия',
          city: city.name,
          street: street.name,
          apartment,
          entrance,
          intercom,
          floor,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
      });
  };
  useEffect(() => {
    setCity(address.city);
    setStreet(address.street);
    setApartment(address.apartment);
    setIntercom(address.intercom);
    setEntrance(address.entrance);
    setFloor(address.floor);
  }, [address]);
  useEffect(() => {
    if (city.id) {
      setStreet({
        id: false,
        name: '',
      });
    }
  }, [city]);
  useEffect(() => {
    dispatch(setAddress({ city, street, apartment, intercom, entrance, floor }));
  }, [city, street, apartment, intercom, entrance, floor]);

  return (
    <form className={style.form}>
      <div className={style.content}>
        <div className={style.margin}>
          <Select value={city} setValue={setCity} getData={getCityData} placeholder="Город" />
        </div>
        <div className={style.input + ' ' + (city.id ? '' : style.input_none)}>
          <Select
            value={street}
            setValue={setStreet}
            getData={getStreetData}
            placeholder="улица и дом"
          />
        </div>
        <div className={style.input__line}>
          <div className={style.input + ' ' + (street.id ? '' : style.input_none)}>
            <Input
              placeholder="кв./офис"
              value={apartment}
              type="text"
              isNecessary={true}
              onChange={(e) => setApartment(e.target.value)}
            />
          </div>
          <div className={style.input + ' ' + (street.id ? '' : style.input_none)}>
            <Input
              placeholder="домофон"
              value={intercom}
              type="number"
              isNecessary={false}
              onChange={(e) => setIntercom(e.target.value)}
            />
          </div>
        </div>
        <div className={style.input__line}>
          <div className={style.input + ' ' + (street.id ? '' : style.input_none)}>
            <Input
              placeholder="подъезд"
              value={entrance}
              type="number"
              isNecessary={false}
              onChange={(e) => setEntrance(e.target.value)}
            />
          </div>
          <div className={style.input + ' ' + (street.id ? '' : style.input_none)}>
            <Input
              placeholder="этаж"
              value={floor}
              type="number"
              isNecessary={false}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        className={style.btn + ' ' + (!(street && apartment && city) ? style.disabled : '')}
        onClick={(e) => {
          closeAside();
          sendData(e);
        }}>
        сохранить адрес
      </button>
    </form>
  );
};

export default CourierContent;
