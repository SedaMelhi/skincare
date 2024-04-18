import { FC } from 'react';

import CircleArrow from '../../circleArrow/circleArrow';

import style from './Circle.module.sass';
import Link from 'next/link';

const Circle: FC = () => {
  return (
    <div className={style.circle__wrap}>
      <div className={style.circle}>
        <div className={style.text}>
          <div className={style.title}>наши консультанты разбирают косметичку</div>
          <div className={style.link}>
            <div className={style.link__text}> тоже хочу</div>
            <Link href="/free">
              <div className={style.circleArrow}>
                <CircleArrow sizeCircle="100%" sizeImg="42px" color="#6B5F71" colorImg="#19171A" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circle;
