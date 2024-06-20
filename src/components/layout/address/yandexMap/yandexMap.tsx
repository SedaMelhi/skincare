import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

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
const yandexData: any = [
  {
    type: 'Feature',
    id: '0ddb084f-0cf4-47e0-856d-d44a6f77574e',
    geometry: { type: 'Point', coordinates: [55.80996, 37.323616] },
    properties: {
      balloonContentHeader: 'KRN75, Красногорск, ул. Заводская ',
      balloonContentBody: '143405, Россия, Московская область, Красногорск, ул. Заводская , 27',
      balloonContentFooter: 'Пн-Вс 09:00-21:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/21:00' },
      { day: 2, time: '09:00/21:00' },
      { day: 3, time: '09:00/21:00' },
      { day: 4, time: '09:00/21:00' },
      { day: 5, time: '09:00/21:00' },
      { day: 6, time: '09:00/21:00' },
      { day: 7, time: '09:00/21:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'ac3274aa-9fc4-4281-9f07-0e52f1f2ecdf',
    geometry: { type: 'Point', coordinates: [51.527237, 81.21582] },
    properties: {
      balloonContentHeader: 'RBC2, Рубцовск, ул. Октябрьская',
      balloonContentBody: '658201, Россия, Алтайский край, Рубцовск, ул. Октябрьская, 104',
      balloonContentFooter: 'Пн-Пт 09:00-20:00, Сб-Вс 09:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/20:00' },
      { day: 2, time: '09:00/20:00' },
      { day: 3, time: '09:00/20:00' },
      { day: 4, time: '09:00/20:00' },
      { day: 5, time: '09:00/20:00' },
      { day: 6, time: '09:00/20:00' },
      { day: 7, time: '09:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'ad4452ef-e82a-41dd-9a44-a5cc01228744',
    geometry: { type: 'Point', coordinates: [51.758953, 36.185146] },
    properties: {
      balloonContentHeader: 'KRS4, Курск, ул. Карла Маркса',
      balloonContentBody: '305029, Россия, Курская область, Курск, ул. Карла Маркса, 66Д',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '002ab4bb-edcf-40cd-aa54-30201f45708f',
    geometry: { type: 'Point', coordinates: [57.147316, 65.58469] },
    properties: {
      balloonContentHeader: 'TYUM143, Тюмень, ул. Мельникайте',
      balloonContentBody: '625027, Россия, Тюменская область, Тюмень, ул. Мельникайте, 58',
      balloonContentFooter: 'Пн-Вс 09:00-21:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/21:00' },
      { day: 2, time: '09:00/21:00' },
      { day: 3, time: '09:00/21:00' },
      { day: 4, time: '09:00/21:00' },
      { day: 5, time: '09:00/21:00' },
      { day: 6, time: '09:00/21:00' },
      { day: 7, time: '09:00/21:00' },
    ],
  },
  {
    type: 'Feature',
    id: '9cdfc967-a0cf-4788-8b7f-53e5d7cb29b2',
    geometry: { type: 'Point', coordinates: [55.84939, 37.169388] },
    properties: {
      balloonContentHeader: 'NKHB1, Нахабино, КРАСНОАРМЕЙСКАЯ УЛ',
      balloonContentBody: '143430, Россия, Московская область, Нахабино, КРАСНОАРМЕЙСКАЯ УЛ, 61, Б',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-16:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/16:00' },
      { day: 7, time: '10:00/16:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'ffdae774-b28a-46f2-a8d2-8ce3c200f838',
    geometry: { type: 'Point', coordinates: [54.588238, 73.64043] },
    properties: {
      balloonContentHeader: 'TRV3, Таврическое, ул. Кирова',
      balloonContentBody: '646800, Россия, Омская область, Таврическое, ул. Кирова, 97',
      balloonContentFooter: 'Пн-Сб 09:00-18:00, Вс 09:00-15:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/18:00' },
      { day: 2, time: '09:00/18:00' },
      { day: 3, time: '09:00/18:00' },
      { day: 4, time: '09:00/18:00' },
      { day: 5, time: '09:00/18:00' },
      { day: 6, time: '09:00/18:00' },
      { day: 7, time: '09:00/15:00' },
    ],
  },
  {
    type: 'Feature',
    id: '006f0384-bd11-44b1-9a28-a4d16eacbd62',
    geometry: { type: 'Point', coordinates: [55.33053, 86.13048] },
    properties: {
      balloonContentHeader: 'KEM69, Кемерово, ул. Тухачевского',
      balloonContentBody:
        '650070, Россия, Кемеровская область - Кузбасс, Кемерово, ул. Тухачевского, 41',
      balloonContentFooter: 'Пн-Вс 08:00-22:00',
    },
    work_time_list: [
      { day: 1, time: '08:00/22:00' },
      { day: 2, time: '08:00/22:00' },
      { day: 3, time: '08:00/22:00' },
      { day: 4, time: '08:00/22:00' },
      { day: 5, time: '08:00/22:00' },
      { day: 6, time: '08:00/22:00' },
      { day: 7, time: '08:00/22:00' },
    ],
  },
  {
    type: 'Feature',
    id: '889407aa-b25b-42d5-b3a1-6f06f0f583f6',
    geometry: { type: 'Point', coordinates: [51.275936, 37.51094] },
    properties: {
      balloonContentHeader: 'GBK3, Губкин, ул. Королёва',
      balloonContentBody: '309183, Россия, Белгородская область, Губкин, ул. Королёва, 5',
      balloonContentFooter: 'Пн-Пт 09:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/20:00' },
      { day: 2, time: '09:00/20:00' },
      { day: 3, time: '09:00/20:00' },
      { day: 4, time: '09:00/20:00' },
      { day: 5, time: '09:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '5a345fec-f2fc-4a73-b5bc-c32a3d4eccde',
    geometry: { type: 'Point', coordinates: [51.8407, 107.59134] },
    properties: {
      balloonContentHeader: 'UU37, Улан-Удэ, ул. Гагарина',
      balloonContentBody: '670034, Россия, Республика Бурятия, Улан-Удэ, ул. Гагарина, 33',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '47246eaf-cc7d-45ec-afa9-80373484937d',
    geometry: { type: 'Point', coordinates: [51.72277, 36.17396] },
    properties: {
      balloonContentHeader: 'KRS40, Курск, ул. Дзержинского',
      balloonContentBody: '305035, Россия, Курская область, Курск, ул. Дзержинского, 84А',
      balloonContentFooter: 'Пн-Вс 09:00-21:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/21:00' },
      { day: 2, time: '09:00/21:00' },
      { day: 3, time: '09:00/21:00' },
      { day: 4, time: '09:00/21:00' },
      { day: 5, time: '09:00/21:00' },
      { day: 6, time: '09:00/21:00' },
      { day: 7, time: '09:00/21:00' },
    ],
  },
  {
    type: 'Feature',
    id: '56798061-8205-41fb-88c5-3c637a9ff995',
    geometry: { type: 'Point', coordinates: [51.67201, 36.139584] },
    properties: {
      balloonContentHeader: 'KRS47, Курск, ул. Гагарина',
      balloonContentBody: '305018, Россия, Курская область, Курск, ул. Гагарина, 4',
      balloonContentFooter: 'Пн-Вс 08:00-22:00',
    },
    work_time_list: [
      { day: 1, time: '08:00/22:00' },
      { day: 2, time: '08:00/22:00' },
      { day: 3, time: '08:00/22:00' },
      { day: 4, time: '08:00/22:00' },
      { day: 5, time: '08:00/22:00' },
      { day: 6, time: '08:00/22:00' },
      { day: 7, time: '08:00/22:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'b2c089d8-a630-4ae6-aadb-b409d2dc274b',
    geometry: { type: 'Point', coordinates: [51.675014, 36.150146] },
    properties: {
      balloonContentHeader: 'KRS52, Курск, ул. Черняховского',
      balloonContentBody: '305018, Россия, Курская область, Курск, ул. Черняховского, 6',
      balloonContentFooter: 'Пн-Чт 13:00-22:00, Пт-Сб 12:00-23:00, Вс 13:00-22:00',
    },
    work_time_list: [
      { day: 1, time: '13:00/22:00' },
      { day: 2, time: '13:00/22:00' },
      { day: 3, time: '13:00/22:00' },
      { day: 4, time: '13:00/22:00' },
      { day: 5, time: '12:00/23:00' },
      { day: 6, time: '12:00/23:00' },
      { day: 7, time: '13:00/22:00' },
    ],
  },
  {
    type: 'Feature',
    id: '0167014e-e5d0-4c6d-a5b7-0058af70026a',
    geometry: { type: 'Point', coordinates: [55.804127, 37.71521] },
    properties: {
      balloonContentHeader: 'MSK1858, Москва, ул. Просторная',
      balloonContentBody: '107392, Россия, Москва, Москва, ул. Просторная, 4',
      balloonContentFooter: 'Пн-Вс 09:00-23:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/23:00' },
      { day: 2, time: '09:00/23:00' },
      { day: 3, time: '09:00/23:00' },
      { day: 4, time: '09:00/23:00' },
      { day: 5, time: '09:00/23:00' },
      { day: 6, time: '09:00/23:00' },
      { day: 7, time: '09:00/23:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'd6cf905a-6824-43bf-8930-b69c6f0d59d2',
    geometry: { type: 'Point', coordinates: [51.837296, 107.57764] },
    properties: {
      balloonContentHeader: 'UU13, Улан-Удэ, ул. Модогоева',
      balloonContentBody: '670000, Россия, Республика Бурятия, Улан-Удэ, ул. Модогоева, 2',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '01972569-a857-45b2-a472-5feb105e46c8',
    geometry: { type: 'Point', coordinates: [57.14651, 65.55417] },
    properties: {
      balloonContentHeader: 'TYUM18, Тюмень, ул. Республики',
      balloonContentBody: '625048, Россия, Тюменская область, Тюмень, ул. Республики, 83, 114',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'd595d9bc-b32d-46b0-980d-3f9f09f23d47',
    geometry: { type: 'Point', coordinates: [59.444546, 32.01467] },
    properties: {
      balloonContentHeader: 'KRSH7, Кириши, проспект Ленина',
      balloonContentBody: '187112, Россия, Ленинградская область, Кириши, проспект Ленина, 30',
      balloonContentFooter: 'Пн-Пт 10:00-19:00, Сб 10:00-17:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/19:00' },
      { day: 2, time: '10:00/19:00' },
      { day: 3, time: '10:00/19:00' },
      { day: 4, time: '10:00/19:00' },
      { day: 5, time: '10:00/19:00' },
      { day: 6, time: '10:00/17:00' },
    ],
  },
  {
    type: 'Feature',
    id: '0f0cba21-a1ce-4605-a8be-2b4587431abf',
    geometry: { type: 'Point', coordinates: [58.59716, 49.64475] },
    properties: {
      balloonContentHeader: 'KRV5, Киров, ул. Молодой Гвардии',
      balloonContentBody: '610035, Россия, Кировская область, Киров, ул. Молодой Гвардии, 100',
      balloonContentFooter: 'Пн-Пт 08:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '08:00/20:00' },
      { day: 2, time: '08:00/20:00' },
      { day: 3, time: '08:00/20:00' },
      { day: 4, time: '08:00/20:00' },
      { day: 5, time: '08:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '80bb9783-59db-4903-bfc5-28b39ce424f9',
    geometry: { type: 'Point', coordinates: [58.58352, 49.586483] },
    properties: {
      balloonContentHeader: 'KRV7, Киров, ул. Ульяновская',
      balloonContentBody: '610037, Россия, Кировская область, Киров, ул. Ульяновская, 30',
      balloonContentFooter: 'Пн-Вс 09:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/20:00' },
      { day: 2, time: '09:00/20:00' },
      { day: 3, time: '09:00/20:00' },
      { day: 4, time: '09:00/20:00' },
      { day: 5, time: '09:00/20:00' },
      { day: 6, time: '09:00/20:00' },
      { day: 7, time: '09:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: '06f1d74f-f9c9-48d8-99a5-362d1826f0f3',
    geometry: { type: 'Point', coordinates: [58.608715, 49.616844] },
    properties: {
      balloonContentHeader: 'KRV18, Киров, ул. Лепсе',
      balloonContentBody: '610033, Россия, Кировская область, Киров, ул. Лепсе, 58',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '2aa1eed5-1cb5-4733-8d44-f5e572e5777c',
    geometry: { type: 'Point', coordinates: [58.5876, 49.676666] },
    properties: {
      balloonContentHeader: 'KRV45, Киров, ул. Милицейская',
      balloonContentBody: '610002, Россия, Кировская область, Киров, ул. Милицейская, 29',
      balloonContentFooter: 'Пн-Вс 08:30-20:30',
    },
    work_time_list: [
      { day: 1, time: '08:30/20:30' },
      { day: 2, time: '08:30/20:30' },
      { day: 3, time: '08:30/20:30' },
      { day: 4, time: '08:30/20:30' },
      { day: 5, time: '08:30/20:30' },
      { day: 6, time: '08:30/20:30' },
      { day: 7, time: '08:30/20:30' },
    ],
  },
  {
    type: 'Feature',
    id: 'b17744dd-90bb-4495-8a05-efb878045652',
    geometry: { type: 'Point', coordinates: [56.1589, 38.86685] },
    properties: {
      balloonContentHeader: 'KRZH3, Киржач, ул.  Гагарина',
      balloonContentBody: '601010, Россия, Владимирская область, Киржач, ул.  Гагарина, 6А',
      balloonContentFooter: 'Пн-Пт 09:00-19:00, Сб 09:00-16:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/19:00' },
      { day: 2, time: '09:00/19:00' },
      { day: 3, time: '09:00/19:00' },
      { day: 4, time: '09:00/19:00' },
      { day: 5, time: '09:00/19:00' },
      { day: 6, time: '09:00/16:00' },
    ],
  },
  {
    type: 'Feature',
    id: '0367d7ed-6f56-4886-9f8a-a06c44b358b4',
    geometry: { type: 'Point', coordinates: [51.702457, 36.160164] },
    properties: {
      balloonContentHeader: 'KRS9, Курск, ул. Энгельса',
      balloonContentBody: '305004, Россия, Курская область, Курск, ул. Энгельса, 115/3',
      balloonContentFooter: 'Пн-Пт 10:00-20:00, Сб-Вс 10:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/20:00' },
      { day: 2, time: '10:00/20:00' },
      { day: 3, time: '10:00/20:00' },
      { day: 4, time: '10:00/20:00' },
      { day: 5, time: '10:00/20:00' },
      { day: 6, time: '10:00/18:00' },
      { day: 7, time: '10:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '02475de6-f40c-436d-a354-6c88cc8fccba',
    geometry: { type: 'Point', coordinates: [60.904575, 34.18746] },
    properties: {
      balloonContentHeader: 'POD5, Подпорожье, ул. Волховская',
      balloonContentBody: '187780, Россия, Ленинградская область, Подпорожье, ул. Волховская, 2',
      balloonContentFooter: 'Пн-Пт 10:00-19:00, Сб 10:00-16:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/19:00' },
      { day: 2, time: '10:00/19:00' },
      { day: 3, time: '10:00/19:00' },
      { day: 4, time: '10:00/19:00' },
      { day: 5, time: '10:00/19:00' },
      { day: 6, time: '10:00/16:00' },
    ],
  },
  {
    type: 'Feature',
    id: '053377d9-30a9-4dbc-9464-9c8d386b08ee',
    geometry: { type: 'Point', coordinates: [45.070827, 39.00667] },
    properties: {
      balloonContentHeader: 'KSD28, Краснодар, ул. Байбакова',
      balloonContentBody: '350072, Россия, Краснодарский край, Краснодар, ул. Байбакова, 21',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'bf8f05c9-c759-4b88-98db-225ea5fe2e30',
    geometry: { type: 'Point', coordinates: [45.039692, 38.99847] },
    properties: {
      balloonContentHeader: 'KSD52, Краснодар, ул. Березанская',
      balloonContentBody: '350002, Россия, Краснодарский край, Краснодар, ул. Березанская, 89',
      balloonContentFooter: 'Пн-Вс 09:00-21:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/21:00' },
      { day: 2, time: '09:00/21:00' },
      { day: 3, time: '09:00/21:00' },
      { day: 4, time: '09:00/21:00' },
      { day: 5, time: '09:00/21:00' },
      { day: 6, time: '09:00/21:00' },
      { day: 7, time: '09:00/21:00' },
    ],
  },
  {
    type: 'Feature',
    id: '17701b98-d95a-4d82-b99d-ea26f43a5ec8',
    geometry: { type: 'Point', coordinates: [45.062874, 38.919895] },
    properties: {
      balloonContentHeader: 'KSD72, Краснодар, ул. Красных Партизан',
      balloonContentBody:
        '350012, Россия, Краснодарский край, Краснодар, ул. Красных Партизан, 127, пом. 1',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: '4ed0fc2c-a1b6-4062-9d9e-5ab4ae5c06b8',
    geometry: { type: 'Point', coordinates: [45.054634, 39.0188] },
    properties: {
      balloonContentHeader: 'KSD81, Краснодар, ул. Российская',
      balloonContentBody: '350029, Россия, Краснодарский край, Краснодар, ул. Российская, 74/2',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: '70e19a94-5ca8-4225-bf99-872600be91f8',
    geometry: { type: 'Point', coordinates: [45.019405, 39.001434] },
    properties: {
      balloonContentHeader: 'KSD100, Краснодар, ул. Черноморская',
      balloonContentBody: '350001, Россия, Краснодарский край, Краснодар, ул. Черноморская, 57',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: '801a6681-02f6-4f82-a98c-f022ab71e913',
    geometry: { type: 'Point', coordinates: [45.024906, 39.036465] },
    properties: {
      balloonContentHeader: 'KSD102, Краснодар, ул. Селезнева',
      balloonContentBody: '350075, Россия, Краснодарский край, Краснодар, ул. Селезнева, 100',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: '0decfd44-ae05-400c-8ff1-2c51c0ddf14d',
    geometry: { type: 'Point', coordinates: [53.155476, 50.07603] },
    properties: {
      balloonContentHeader: 'SAM26, Самара, ул. Осетинская',
      balloonContentBody: '443032, Россия, Самарская область, Самара, ул. Осетинская, 2',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: '039a7ecc-b6a9-4fe2-a853-c06def4b1206',
    geometry: { type: 'Point', coordinates: [55.85901, 37.510983] },
    properties: {
      balloonContentHeader: 'MSK1918, Москва, ул. Онежская',
      balloonContentBody: '125413, Россия, Москва, Москва, ул. Онежская, 34к2',
      balloonContentFooter: 'Пн-Вс 09:00-23:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/23:00' },
      { day: 2, time: '09:00/23:00' },
      { day: 3, time: '09:00/23:00' },
      { day: 4, time: '09:00/23:00' },
      { day: 5, time: '09:00/23:00' },
      { day: 6, time: '09:00/23:00' },
      { day: 7, time: '09:00/23:00' },
    ],
  },
  {
    type: 'Feature',
    id: '29008004-6db7-4d3f-9820-39ef5238737a',
    geometry: { type: 'Point', coordinates: [45.01816, 39.04229] },
    properties: {
      balloonContentHeader: 'KSD194, Краснодар, ул. Стасова',
      balloonContentBody: '350011, Россия, Краснодарский край, Краснодар, ул. Стасова, 159/3',
      balloonContentFooter: 'Пн-Вс 09:00-18:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/18:00' },
      { day: 2, time: '09:00/18:00' },
      { day: 3, time: '09:00/18:00' },
      { day: 4, time: '09:00/18:00' },
      { day: 5, time: '09:00/18:00' },
      { day: 6, time: '09:00/18:00' },
      { day: 7, time: '09:00/18:00' },
    ],
  },
  {
    type: 'Feature',
    id: '750ed4c9-6d85-4959-9d29-5679d521d3e0',
    geometry: { type: 'Point', coordinates: [45.04315, 39.003223] },
    properties: {
      balloonContentHeader: 'KSD201, Краснодар, ул. Спортивная',
      balloonContentBody: '350042, Россия, Краснодарский край, Краснодар, ул. Спортивная, 2',
      balloonContentFooter: 'Пн-Вс 09:00-21:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/21:00' },
      { day: 2, time: '09:00/21:00' },
      { day: 3, time: '09:00/21:00' },
      { day: 4, time: '09:00/21:00' },
      { day: 5, time: '09:00/21:00' },
      { day: 6, time: '09:00/21:00' },
      { day: 7, time: '09:00/21:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'f1fdcce8-6313-47a3-8f56-ced4ad638fbd',
    geometry: { type: 'Point', coordinates: [45.126545, 38.952847] },
    properties: {
      balloonContentHeader: 'KSD202, Краснодар, Народный переулок',
      balloonContentBody: '350053, Россия, Краснодарский край, Краснодар, Народный переулок, 2/1',
      balloonContentFooter: 'Пн-Вс 09:00-19:00',
    },
    work_time_list: [
      { day: 1, time: '09:00/19:00' },
      { day: 2, time: '09:00/19:00' },
      { day: 3, time: '09:00/19:00' },
      { day: 4, time: '09:00/19:00' },
      { day: 5, time: '09:00/19:00' },
      { day: 6, time: '09:00/19:00' },
      { day: 7, time: '09:00/19:00' },
    ],
  },
  {
    type: 'Feature',
    id: '201d8598-b91e-40c1-bc1c-d4904120f830',
    geometry: { type: 'Point', coordinates: [45.036686, 39.02418] },
    properties: {
      balloonContentHeader: 'KSD231, Краснодар, ул. Школьная',
      balloonContentBody: '350059, Россия, Краснодарский край, Краснодар, ул. Школьная, 42',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'e8f21477-121e-4765-ad47-49bb529cee05',
    geometry: { type: 'Point', coordinates: [56.797928, 60.632256] },
    properties: {
      balloonContentHeader: 'EKB5, Екатеринбург, ул. Белинского',
      balloonContentBody: '620130, Россия, Свердловская область, Екатеринбург, ул. Белинского, 232',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
  {
    type: 'Feature',
    id: 'e7cd314a-3858-40fe-8363-9cc57247143e',
    geometry: { type: 'Point', coordinates: [45.130753, 38.974766] },
    properties: {
      balloonContentHeader: 'KSD251, Краснодар, ул. им. М. П. Шемякина',
      balloonContentBody:
        '350900, Россия, Краснодарский край, Краснодар, ул. им. М. П. Шемякина, 2',
      balloonContentFooter: 'Пн-Пт 10:00-21:00, Сб-Вс 10:00-20:00',
    },
    work_time_list: [
      { day: 1, time: '10:00/21:00' },
      { day: 2, time: '10:00/21:00' },
      { day: 3, time: '10:00/21:00' },
      { day: 4, time: '10:00/21:00' },
      { day: 5, time: '10:00/21:00' },
      { day: 6, time: '10:00/20:00' },
      { day: 7, time: '10:00/20:00' },
    ],
  },
];

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
