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
      title: "Я приходила после...",
      text: `Я приходила после консультации с косметологом, но в голове все равно были вопросы, тк это начало моего “осознанного пути” по уходу за лицом. Встретила милая девушка и настояла, что сейчас позовет консультанта-эксперта, хотя я отпиралась, тк была уже со списком нужных мне продуктов. И хорошо, что позвала, потому что я была действительно приятно удивлена ее знанием продуктов и консультацией. Это один из редких случаев, когда сервис и доброжелательность на высоте (большая редкость в ЧР). Ну и цены были не завышены, что тоже большой плюс (я знаю, о чем говорю - любитель сравнивать ценники)`,
      sender: "Иман",
    },
    {
      id: 1,
      title: "Не передать словами...",
      text: `Взяла всего лишь гидрофильное масло, но вы оставили впечатление ещё и ещё возвращаться! Что девочки, что атмосфера, просто не передать словами`,
      sender: "Седа",
    },
    {
      id: 2,
      title: "Шикарный результат",
      text: `Недавно после электроэпиляции (на лице) у меня остались рубцы, следы, по ее вине коротко говоря, она обожгла кожу. Почти месяц как я у вас приобрела уходовую косметику, и скажу вам честно,у меня на этой зоне никаких следов, рубцов не осталось и я так рада этому. Потихоньку всё заживает, хотя все говорили, что поможет только лазерная шлифовка. Спасибо вам большое!`,
      sender: "Рашана",
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
