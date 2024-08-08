import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import style from "./Reviews.module.sass";

const Reviews: FC = () => {
  const data = [
    {
      id: 0,
      title: "Есть видимый результат",
      text: `Здравствуйте, хотелось бы выразить благодарность Соне и Амине за совместную консультацию, давно мучилась с акне и хотелось бы помимо уходовой косметики разобраться с первопричиной акне, c чем мне помогла врач-эндокринолог, которая детально разобрала результаты моих анализов и образ жизни. И наконец-то получилось подобрать с помощью консультации Сони продукты которые подходят к моему типу кожи и от которых есть видимый результат, новых воспалений нет, а которые были сходят понемногу)`,
      sender: "Марьям",
    },
    {
      id: 1,
      title: "Понравилось все...",
      text: "Очень понравился профессиональный подход Сони и врача-эндокринолога,благодаря которым за небольшой период моя кожа стала ухоженной и сияющей! Понравилось все, начиная от детальных разборов анализов и уходовой косметики, заканчивая приятной атмосферой)",
      sender: "Мубарик",
    },
    {
      id: 2,
      title: "Отличная консультация",
      text: "Отличная совместная консультация двух специалистов! Вдумчивая консультация действительно на основе особенностей кожи и показаний. Определили по анализам курс лечения,подобрали грамотный уход,  будем работать совместно для улучшения качества жизни и состояния кожи)",
      sender: "Алина",
    },
  ];

  return (
    <div className={style.bg + " " + style.wrap}>
      <div className={"reviews " + style.reviews}>
        <div className={style.titleMain}>
          <h2 className={style.title}>Что о нас говорят</h2>
        </div>

        <Swiper
          spaceBetween={20}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={style.swiper}
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 5,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className={style.slide}>
              <div className={style.border}>
                <h3 className={style.border__title}>{item.title}</h3>
                <p className={style.border__text}>{item.text}</p>
                <p className={style.sender}>@{item.sender}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
