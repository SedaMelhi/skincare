import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";
import Arrows from "@/components/other/arrows/arrows";

import img1 from "./../../../../../public/paidRecording/certificate1.png";
import img2 from "./../../../../../public/paidRecording/certification.png";
import img3 from "./../../../../../public/paidRecording/certificate2.png";
import img4 from "./../../../../../public/paidRecording/certificateZalina.jpg";

import "swiper/css";
import "swiper/css/pagination";

import style from "./ourAgents.module.sass";

type OurAgentsProps = {
  page?: string
}

const OurAgents: FC<OurAgentsProps> = ({page}) => {
  return (
    <div className={style.circle}>
      <div className={style.circle__img}></div>
      <div className="wrap ourAgents">
        <div className={style.titleMain}>
          <div className={style.star}>
            <div className={style.titleStar}></div>
          </div>
          <h2 className={style.title}>Доверьтесь нашим агентам</h2>
        </div>
        <div className={style.container}>
          <div className={style.agent}>
            <h3 className={style.agent__name}>дудалова Аминат Адамовна</h3>
            <div className={style.agent__text}>
              Закончила астраханский государственный медицинский, ординатура по
              специальности эндокринология, прошла профессиональную
              переподготовку по специальности нутрициология, выпускник школы
              Uniprof, студент preventage
            </div>
           {page !== 'health' && <div className={style.agent2}>
              <h3 className={style.agent__name}>Байракова Залина Максимовна</h3>
              <div className={style.agent__text}>
                Сертифицированный косметик-эстетист с 2022 года. Провела
                несколько сотен консультаций, помогла подобрать рабочие схемы
                для пациентов с акне, куперозом и другими дерматитами
              </div>
            </div>}
          </div>
          <div className={style.slider__wrapper}>
            <div className={style.bg__wrap}>
              <div className={style.bg}>
                <Swiper
                  className={"mySwiper " + style.images}
                  slidesPerView={"auto"}
                  slidesPerGroup={1}
                  autoHeight={true}
                  modules={[Pagination, Navigation]}
                  pagination={{
                    el: ".lending-pagination",
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: ".next",
                    prevEl: ".prev",
                    enabled: true,
                  }}
                >
                  <SwiperSlide className={style.img1}>
                    <img src={img1.src} alt="" />
                  </SwiperSlide>
                  <SwiperSlide className={style.img2}>
                    <img src={img2.src} alt="" />
                  </SwiperSlide>
                  <SwiperSlide className={style.img3}>
                    <img src={img3.src} alt="" />
                  </SwiperSlide>
                 {page !== 'health' && <SwiperSlide className={style.img4}>
                    <img src={img4.src} alt="" />
                  </SwiperSlide>}
                </Swiper>
              </div>
            </div>
            <div className={style.bottom}>
              <div></div>
              <div>
                <div className={"lending-pagination " + style.pagination}></div>
              </div>
              <div className={style.arrows}>
                <Arrows next="next" prev="prev" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAgents;
