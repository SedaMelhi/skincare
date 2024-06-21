import { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import style from './../sets.module.sass';
import SetsSubSwiper from './../setsSubSwiper/setsSubSwiper';

type SetsSwiperProps = {
  slidesPerView: number;
  sets?: Array<{
    id: string;
    name: string;
    description: string;
    picture: string;
    price: string;
    setItem: any;
  }>;
};

const SetsSwiper: FC<SetsSwiperProps> = ({ slidesPerView, sets }) => {
  const setsArr = sets ? Object.values(sets).splice(0, Object.values(sets).length - 1) : [];

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      slidesPerGroup={1}
      allowTouchMove={false}
      slideNextClass={style.nextSlide}
      slidePrevClass={style.prevSlide}
      navigation={{
        nextEl: '.next-sets',
        prevEl: '.prev-sets',
        enabled: true,
      }}>
      {setsArr.map(({ id, name, description, picture, price, setItem }) => (
        <SwiperSlide key={id}>
          <div className={style.main}>
            <h2 className={style.subtitle}>{name}</h2>
            <div
              className={style.mainImage + ' ' + style.mainImage_one}
              style={{
                background: `url(https://b.skincareagents.com${picture}) center/contain no-repeat`,
              }}></div>
          </div>
          <div className={style.products}>
            <SetsSubSwiper slidesPerView={slidesPerView} setItem={setItem} />
          </div>
          <div className={style.button + ' wrap'}>
            <div className={style.btn__wrap}>
              <button className={style.btn}>Купить сет — {price} ₽</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default SetsSwiper;
