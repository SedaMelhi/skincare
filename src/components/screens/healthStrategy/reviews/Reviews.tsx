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
      title: "Нашла лучшего врача",
      text: "Очень долго искала хорошего онлайн врача, но похоже нашла самого лучшего! Большой плюс в том,что идет сопровождение во время консультации и понятное разъяснение всех интересующих меня вопросов, спасибо Вам!",
      sender: "Макка",
    },
    {
      id: 1,
      title: "Не знала, как грамотно...",
      text: "Не знала, как грамотно можно было бы внедрить системный подход для улучшения здоровья и качества жизни, так как меня уже долгое время мучила хроническая усталость и не было энергии практически ни на что.Благодаря Амине и ее назначениям я увидела первые результаты и смогла найти путь к правильному образу жизни, конечно, многое еще впереди, от чего нужно отказаться, но немаленький шаг уже сделан в пользу моего здоровья.Консультация оставила только положительные эмоции и понравилось, что на каждый вопрос был развернутый ответ.",
      sender: "Карина",
    },
    {
      id: 2,
      title: "Шикарный результат",
      text: "Хочу сказать вам огромное спасибо за вашу работу и сопровождение. Благодаря вашим советам, очень подробным и понятным объяснениям, мне стало проще осваивать новую для меня тему восстановления здоровья, питания , лечения и профилактики. То, в каком состоянии была при первом приеме, и то как я себя сейчас чувствую,спустя некоторое количество времени, это небо и земля!",
      sender: "Линда",
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
