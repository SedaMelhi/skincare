import { FC } from 'react';

import style from './about.module.sass';
import Link from 'next/link';


const About: FC = () => {
  return (
    <div className="wrap">
      <div className={style.about}>
        <div className={style.title}>
          <div>прозрачность, </div>
          <div>осознанность и подход</div>
          <div>смарт-бьюти.</div>
        </div>
        <div className={style.images}>
          <div>
            <img src="./about/about1.JPG" alt="" className={style.img__one} />
          </div>
          <div>
            <img src="./about/about2.JPG" alt="" className={style.img__two} />
          </div>
        </div>
        <div className={style.title}>
          <div>Мы верим в то, что забота</div>
          <div>о себе должна быть</div>
          <div>как внешней,</div>
          <div>так и внутренней.</div>
        </div>
        <div>
          <img src="./about/about3.JPG" alt="" className={style.img__three} />
        </div>
      </div>
      <div className={style.btn}>
        <Link href="./aboutUs">
          <span>познакомимся поближе?</span>
          <div className={style.circle}>
            <img src="./arrowCircle.svg" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default About;
