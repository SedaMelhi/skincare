import { FC, useEffect, useState } from 'react';

import searchImg from './../../../../../public/search.svg';
import arrowImg from './../../../../../public/arrow.svg';
import closeImg from './../../../../../public/close.svg';

import style from './Search.module.sass';
import { useDispatch } from 'react-redux';
import { setIsScroll } from '@/redux/basketSlice/basketSlice';
const Search: FC = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsScroll(isOpen));
  }, [isOpen]);
  return (
    <>
      <div className={style.accordion + ' ' + (isOpen ? style.open : style.close)}>
        <div onClick={() => setIsOpen(false)}>
          <img src={closeImg.src} alt="" className={style.closeImg} />
        </div>
        {/* <div className={style.flex}>
          <input
            type="text"
            value={value}
            className={style.input}
            placeholder="Поиск"
            onChange={(e) => setValue(e.target.value)}
          />
          <div className={style.search__img}>
            <img src={searchImg.src} alt="" />
          </div>
          <div className={style.arrow}>
            <img src={arrowImg.src} alt="" className={style.arrow__img} />
          </div>
        </div> */}
      </div>
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
