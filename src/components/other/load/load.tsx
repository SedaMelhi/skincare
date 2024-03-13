import style from './load.module.sass';

import loadSvg from './../../../../public/load.svg';

const Load = () => {
  return <img src={loadSvg.src} alt="" className={style.load} />;
};

export default Load;
