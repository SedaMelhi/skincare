import {FC} from 'react';
import style from './ourAgents.module.sass';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination,} from 'swiper/modules';
import {FreeMode, Navigation} from 'swiper/modules';
import Arrows from "@/components/other/arrows/arrows";


const OurAgents: FC = () => {
    const pagination = {
        clickable: true,

    };
    return (

        <div className={style.circle}>
            <div className={style.circle__img}>
            </div>
            <div className="wrap ourAgents">
                <div className={style.titleMain}>
                    <div className={style.star}>
                        <div className={style.titleStar}></div>
                    </div>
                    <h2 className={style.title}>Доверьтесь нашим агентам</h2>
                </div>
                <div className={style.container}>

                    <div className={style.agent}>
                        <h3 className={style.agent__name}>дудалова Аминат Адамовна

                        </h3>
                        <div className={style.agent__text}>Закончила астраханский государственный медицинский,
                            ординатура по
                            специальности эндокринология, прошла профессиональную переподготовку по специальности
                            нутрициология,
                            выпускник школы Uniprof, студент preventage
                        </div>
                    </div>
                    <div className={style.agent}>
                        <h3 className={style.agent__name}>дидаева савдат Салмановна

                        </h3>
                        <div className={style.agent__text}>Дипломирования косметолог-эстетист, бьюти эксперт с
                            опытом
                            работы
                            пять лет, более 1000 проведённых пациентов с акне, куперощам и другими дерматитами.
                        </div>
                    </div>
                    <div className={style.slide}>

                        <Swiper
                            className={style.swiper}

                            pagination={pagination}
                            modules={[Pagination, Navigation,]}
                            slidesPerView={1.5}
                            navigation={{
                                nextEl: '.next',
                                prevEl: '.prev',
                                enabled: true,
                            }}
                        >
                            <SwiperSlide>
                                <div className={style.bg}>
                                    <div className={style.img1}></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={style.bg}>
                                    <div className={style.img2}></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={style.bg}>
                                    <div className={style.img3}></div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                    <div className={style.arrows}><Arrows next="next" prev="prev"/></div>
                </div>


            </div>
        </div>
    );
};

export default OurAgents;
