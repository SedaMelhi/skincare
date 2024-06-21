import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CardSetProduct from '@/components/other/cardSetProduct/cardSetProduct';

import 'swiper/css';
import style from './../sets.module.sass';

type SetsSubSwiperProps = {
  slidesPerView: number;
  setItem?: Array<{
    id?: string; 
    name?: string;
    price?: string;
    picture?: string;
    value?: string;
  }>;
};

const SetsSubSwiper: FC<SetsSubSwiperProps> = ({ slidesPerView, setItem }) => {
  const setsItemArr = setItem ? Object.values(setItem).splice(0, Object.values(setItem).length) : [];

  return (
    <Swiper
      slidesPerView={slidesPerView}
      slidesPerGroup={4}
      spaceBetween={28}
      breakpoints={{
        1200: {
          spaceBetween: 28,
        },
        768: {
          slidesPerView: 3.3,
          slidesPerGroup: 3,
          spaceBetween: 16,
        },
        550: {
          slidesPerView: 2.5,
          slidesPerGroup: 2,
        },
        0: {
          slidesPerView: 2.2,
          slidesPerGroup: 2,
          spaceBetween: 16,
        },
      }}>
      {setsItemArr.map(({ id, name, price, picture, value }) => (
        <SwiperSlide key={id}>
          <CardSetProduct
            id={id}
            name={name}
            price={price}
            picture={picture}
            value={value}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default SetsSubSwiper;
