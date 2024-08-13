import {FC} from 'react';
import style from './ShopSkinCare.module.sass';


const ShopSkinCare: FC = () => {
    return (
        <div>
            <div className="wrap">

                <div className={style.container}>
                    <h2 className={style.title}>Skin Care Agents — это магазин косметики с подходом смарт-бьюти</h2>
                    <div className={style.text}>Мы сотрудничаем с мировыми брендами, чтобы предложить вам инновационные
                        и
                        эффективные продукты для ухода за кожей — от масок и сывороток до ультразвуковых очистителей и
                        массажеров.
                    </div>

                    <div className={style.arrow}>
                        <div className={style.arrow__text}>каталог</div>
                        <div className={style.arrow__border}>
                            <img src='./aboutUs/arrowRight.svg' className={style.arrow__svg}/></div>
                    </div>


                </div>
                <div className={style.imgMain}>
                    <img src='./aboutUs/about3.JPG'  className={style.img} />
                </div>
            </div>
        </div>


    );
};

export default ShopSkinCare;