import loadSvg from './../../../../public/load.svg';

import style from './load.module.sass';

const Load = () => {
  return <img src={loadSvg.src} alt="" className={style.load} />;
};

export default Load;
