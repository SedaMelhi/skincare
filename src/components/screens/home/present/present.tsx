import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Title from '@/components/other/title/title';

import 'swiper/css';
import style from './present.module.sass';
import { IGift } from '@/interfaces/gift.interface';
import { API_DOMAIN, GiftsService } from '@/services';

const Present: FC = () => {
  const [gifts, setGifts] = useState<IGift[] | []>([]);
  useEffect(() => {
    const data = GiftsService.getGiftsService();
    data.then((res) => setGifts(res));
  }, []);

  return (
    <div className={style.bg}>
      <section className={style.present__wrap}>
        <div className={style.present}>
          <div className={style.top}>
            <div className={style.title}>
              <Title text="Подарите, Порадуйте" />
            </div>
            <div className={style.description}>
              Дарите красоту и уход в подарок, приобретая сертификат. Отправьте сладкие слова и
              выберите обложку для уникального сюрприза.
            </div>
          </div>
          <div className={style.products__wrap}>
            <div className={style.products}>
              <Swiper
                slidesPerView={4}
                slidesPerGroup={4}
                slideNextClass={style.nextSlide}
                slidePrevClass={style.prevSlide}
                slideActiveClass={style.activeSlide}
                spaceBetween={12}
                modules={[Navigation]}
                navigation={{
                  nextEl: '.next',
                  prevEl: '.prev',
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
                  400: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },

                  0: {
                    slidesPerView: 1.2,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                  },
                }}>
                {gifts &&
                  gifts.map(({ id, name, picture, value }) => (
                    <SwiperSlide key={id}>
                      <Link href={`/certificate/${id}`} className={style.card}>
                        <div
                          className={style.img + ' img ' + style.img_one}
                          style={
                            picture ? { backgroundImage: `url("${API_DOMAIN}${picture}")` } : {}
                          }></div>
                        <h3 className={style.subtitle}>{name}</h3>
                        <div className={style.price}>{parseFloat(value).toString()} ₽</div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <div className={style.btn__wrap}>
            <Link href="/certificate" className={style.btn}>
              Выбрать
              <div className={style.circle}>
                <span>
                  <svg
                    width="60"
                    height="24"
                    viewBox="0 0 60 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M42.0988 4L50 12M42.0988 20L50 12M50 12H42.0988L10 12"
                      stroke="#19171A"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Present;
