import { FC, useEffect, useState } from 'react';

import Input from '@/components/other/input/input';
import style from './courierContent.module.sass';

interface ICloseAside {
  closeAside: () => void;
}

const CourierContent: FC<ICloseAside> = ({ closeAside }) => {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState(''); //квартира
  const [intercom, setIntercom] = useState(''); //домофон
  const [entrance, setEntrance] = useState(''); //подъезд
  const [floor, setFloor] = useState(''); //этаж

  useEffect(() => {
    fetch('https://b.skincareagents.com/local/api/v1/user.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'searchCity',
        typeId: '3',
        city: city,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [city]);
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
        </div>
        <div className={style.input}>
          <Input
            placeholder="улица и дом"
            value={street}
            type="text"
            isNecessary={true}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className={style.input__line}>
          <div className={style.input}>
            <Input
              placeholder="кв./офис"
              value={apartment}
              type="text"
              isNecessary={true}
              onChange={(e) => setApartment(e.target.value)}
            />
          </div>
          <div className={style.input}>
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
          <div className={style.input}>
            <Input
              placeholder="подъезд"
              value={entrance}
              type="number"
              isNecessary={false}
              onChange={(e) => setEntrance(e.target.value)}
            />
          </div>
          <div className={style.input}>
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
        onClick={closeAside}>
        сохранить адрес
      </button>
    </form>
  );
};

export default CourierContent;
