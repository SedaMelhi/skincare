import { FC } from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import PinkMarquee from './../pinkMarquee/pinkMarquee';
import Arrows from '@/components/other/arrows/arrows';

import { RunningLineArray } from '@/interfaces/runningLine.interface';

import 'swiper/css';
import style from './sets.module.sass';
import { API_DOMAIN } from '@/services';

interface SetsProps {
  isVisible: boolean;
  runningLine: RunningLineArray;
  sets: {
    id: string;
    name: string;
    picture: string;
    setItem: {
      DETAIL_PICTURE: string;
      ID: string;
      NAME: string;
    }[];
  }[];
}

const Sets: FC<SetsProps> = ({ isVisible, runningLine, sets }) => {
  return (
    <section className={style.sets__wrap}>
      <PinkMarquee isVisible={isVisible} runningLine={runningLine} />
      <div className={style.sets}>
        <h2 className={style.title}>сеты</h2>
        <div>
          <div className={style.arrows}>
            <Arrows next="next-sets" prev="prev-sets" />
          </div>
          <div className={style.products__wrap}>
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
              {sets.map(
                ({ id, name, picture, setItem }) =>
                  id && (
                    <SwiperSlide key={id}>
                      <div className={style.main}>
                        <h2 className={style.subtitle}>{name}</h2>
                        <div
                          className={style.mainImage + ' ' + style.mainImage_one}
                          style={{ backgroundImage: `url(${API_DOMAIN + picture})` }}></div>
                      </div>
                      <div className={style.products}>
                        <Swiper
                          slidesPerView={4.3}
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
                          {setItem.map(({ ID, NAME, DETAIL_PICTURE }) => (
                            <SwiperSlide key={ID}>
                              <Link href={`/product/${ID}`} className={style.card}>
                                <div
                                  className={style.img + ' img ' + style.img_one}
                                  style={{
                                    backgroundImage: `url(${API_DOMAIN + DETAIL_PICTURE})`,
                                  }}></div>
                                <div className={style.size}>20 мл</div>
                                <h3 className={style.description}>{NAME}</h3>
                                <div className={style.price}>2 234 ₽</div>
                              </Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </SwiperSlide>
                  ),
              )}
            </Swiper>
          </div>
        </div>
      </div>
      <div className={style.button + ' wrap'}>
        <div className={style.btn__wrap}>
          <button className={style.btn}>Купить сет — 10 234 ₽</button>
        </div>
      </div>
    </section>
  );
};

export default Sets;
