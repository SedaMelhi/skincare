import {FC} from 'react';
import style from './CareTips.module.sass';


const CareTips: FC = () => {
    return (
        <div>
            <div className="wrap">

                <div className={style.container}>
                    <h2 className={style.title}>Погрузитесь в наш журнал статей, посвящённых искусству заботиться о
                        себе</h2>
                    <div className={style.text}>Получите новые идеи, советы и находки, которые помогут вам глубже понять
                        процесс ухода за собой.
                    </div>

                    <div className={style.arrow}>
                        <div className={style.arrow__text}>читать</div>
                        <div className={style.arrow__border}>
                            <img src='./aboutUs/arrowRight.svg' className={style.arrow__svg}/></div>
                    </div>

                </div>

                <div className={style.imgMain}>
                    <img src='./aboutUs/about1.JPG' className={style.img1} />
                    <img src='./aboutUs/about2.JPG' className={style.img2} />
                </div>
            </div>
        </div>


    );
};

export default CareTips;