import { FC } from 'react';
import Logo from '@/components/layout/header/logo/logo';

import style from './swatchLine.module.sass';

const SwatchLine: FC = () => {
  return (
    <div className={style.main}>
      <div className={style.lineFirst}></div>
      <div className={style.lineSecond}>
        <div className={style.logo}>
          <img className={style.logoImg} src="./paidRecording/logo.svg" />
        </div>
      </div>
    </div>
  );
};
export default SwatchLine;
