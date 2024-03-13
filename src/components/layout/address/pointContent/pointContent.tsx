import { FC, useState } from 'react';

import Input from '@/components/other/input/input';

import style from './pointContent.module.sass';

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
  type: 'Feature';
  work_time_list: IWorkTimeList[];
}

interface ICloseAside {
  closeAside: () => void;
  activeAddress: IAddressObj | null;
}

const PointContent: FC<ICloseAside> = ({ closeAside, activeAddress }) => {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState(''); //квартира
  const [intercom, setIntercom] = useState(''); //домофон
  const [entrance, setEntrance] = useState(''); //подъезд
  const [floor, setFloor] = useState(''); //этаж
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
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
      </div>
      {activeAddress && (
        <div className={style.middle}>
          <div className={style.title}>СДЭК</div>
          <div className={style.address}>{activeAddress.properties.balloonContentHeader}</div>
          <div className={style.subtitle}>Режим работы</div>
          <ul className={style.times}>
            {activeAddress.work_time_list.map((item, i) => (
              <li>
                <span>{days[i] + ':'}</span> {item.time}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className={style.btn + ' ' + (!(street && apartment && city) ? style.disabled : '')}
        onClick={closeAside}>
        сохранить адрес
      </button>
    </form>
  );
};

export default PointContent;
