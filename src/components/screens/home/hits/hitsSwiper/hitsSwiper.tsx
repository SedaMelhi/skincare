import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import CardProduct from '@/components/other/cardProduct/cardProduct';

import 'swiper/css';
import style from './../hits.module.sass';

type HitsSwiperProps = {
  slidesPerView: number;
  hits?: Array<{
    id: string;
    name: string;
    pin: string[];
    scu: any;
    sectionCode: string;
    sectionName: string;
    smallPhoto: string;
  }>;
};

const HitsSwiper: FC<HitsSwiperProps> = ({ slidesPerView, hits }) => {
  const hitsArr = hits ? Object.values(hits).splice(0, Object.values(hits).length - 1) : [];

  return (
    <Swiper
      slidesPerView={slidesPerView}
      slidesPerGroup={3}
      slideNextClass={style.nextSlide}
      slidePrevClass={style.prevSlide}
      slideActiveClass={style.activeSlide}
      spaceBetween={20}
      modules={[Navigation]}
      navigation={{
        nextEl: '.next-hits',
        prevEl: '.prev-hits',
        enabled: true,
      }}
      breakpoints={{
        1200: {
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        550: {
          slidesPerView: 2.3,
          slidesPerGroup: 2,
        },
        0: {
          slidesPerView: 1.6,
          slidesPerGroup: 1,
          spaceBetween: 16,
        },
      }}>
      {hitsArr.map(({ id, name, pin, scu, sectionCode, sectionName, smallPhoto }) => (
        <SwiperSlide key={id}>
          <CardProduct
            available={true}
            id={id}
            name={name}
            pin={pin}
            scu={scu}
            sectionCode={sectionCode}
            sectionName={sectionName}
            smallPhoto={smallPhoto}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HitsSwiper;
