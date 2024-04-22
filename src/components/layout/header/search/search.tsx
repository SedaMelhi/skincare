import { Dispatch, FC, SetStateAction } from 'react';

import Accordion from './accordion/accordion';

import searchImg from './../../../../../public/search.svg';
import arrowImg from './../../../../../public/arrow.svg';

import style from './Search.module.sass';

const Search: FC<{ setIsOpen: Dispatch<SetStateAction<boolean>> }> = ({ setIsOpen }) => {
  return (
    <>
      <div className={style.search} onClick={() => setIsOpen(true)}>
        <input type="text" className={style.input} placeholder="Поиск" />
        <div className={style.search__img}>
          <img src={searchImg.src} alt="" />
        </div>
        <div className={style.arrow}>
          <img src={arrowImg.src} alt="" className={style.arrow__img} />
        </div>
      </div>
    </>
  );
};
export default Search;
