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
              Консультация skin <br />
              solution: Забота
              <br /> на высшем уровне
            </h2>
          </div>
        </div>
        <div className={style.text}>
          Yникальный подход, который сочетает в себе глубинный анализ вашей кожи и консультацию с
          опытным врачом-эндокринологом и косметологом. Консультация Skin Solution включает:
        </div>
        <div className={style.lists}>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Готовые назначение от врача-эндокринолога и косметолога-эстетиста{' '}
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Cбор полного анамнеза и разбор результатов обследования{' '}
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Индивидуальные рекомендации по питанию и нутритивной поддержки
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>
              Сопровождение напротяжении четырёх недель с момента получения рекомендации{' '}
            </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>Еженедельные ответы на вопросы в указанные дни </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>2 созвона с экспертами </p>
          </div>
          <div className={style.list}>
            <div>
              <div className={style.list__star}></div>
            </div>
            <p className={style.list__text}>Чеклист модификации образа жизни </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareSkinSolution;
