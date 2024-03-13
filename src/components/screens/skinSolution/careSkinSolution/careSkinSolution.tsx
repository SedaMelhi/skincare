import { FC } from 'react';
import style from './CareSkinSolution.module.sass';

const CareSkinSolution: FC = () => {
  return (
    <div>
      <div className={style.circle}>
        <div className={style.circle__big}></div>
        <div className={style.circle__small}></div>
      </div>
      <div className={style.wrap}>
        <div className={style.main}>
          <div className={style.titleMain}>
            <div className={style.star}></div>
            <h2 className={style.title}>
              Консультация
              <br /> health strategy: Забота
              <br /> на высшем уровне
            </h2>
          </div>
        </div>
        <div className={style.text}>Консультация Health Strategy включает:</div>

        <div className={style.lists}>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Cбор жалоб и анамнеза (заполнение анкеты), изучение мной Вашей истории болезни
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Cоставление списка анализов по итогам жалоб и анамнеза
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Полная дешифровка полученных результатов исследований и анализов
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Составление схемы ( расписанная программа, рассчитаны на 3-4 месяца по времени)
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Расписанный прием биодобавок,витаминов и минералов, рекомендации (касаемо здоровья,
              коррекция/модификация образа жизни)
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>Индивидуальные рекомендации по продуктам питания</p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              В консультацию входит меню питания, с подробными доступными рецептами{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareSkinSolution;
