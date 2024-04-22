import { FC } from 'react';
import CircleArrow from '@/components/other/circleArrow/circleArrow';
import style from './header.module.sass';

const Header: FC = () => {
  return (
    <div className={style.header}>
      <div className={style.image}></div>
      <div className={'wrap ' + style.header__text}>
        <h3 className={style.title}>
          Как составить уход?
          <div className={style.arrow}>
            {' '}
            <CircleArrow sizeCircle="48px" sizeImg="32px" />
          </div>
        </h3>
        <div className={style.subtitle}>Проблемная кожа</div>
        <div className={style.description}>
          О красивой коже мечтает каждый. Мы готовы на все, лишь бы достичь идеала. Но достаточно
          несколько простых шагов
        </div>
      </div>
    </div>
  );
};
export default Header;
