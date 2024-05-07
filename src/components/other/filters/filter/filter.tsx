import { FC, useEffect, useState } from 'react';

import minusSvg from './../../../../../public/catalog/minus.svg';

import style from './filter.module.sass';

const Filter: FC<{ name: any; items: { name: string; id: string }[] }> = ({ name, items }) => {
  const [show, setShow] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 600);
  }, []);
  return (
    <div className={firstLoad ? style.load : ''}>
      <input type="checkbox" className={style.title__input} id={name} />
      <label className={style.title} htmlFor={name} onClick={() => setShow(true)}>
        <span>{name} </span>
        <div className={style.sign}>
          <img src={minusSvg.src} alt="" />
          <img src={minusSvg.src} alt="" />
        </div>
      </label>
      <div className={style.params__wrap}>
        <div className={style.params}>
          {items.map(({ name, id }, i) => (
            <label className={style.item} key={id} style={i > 3 && show ? { display: 'none' } : {}}>
              <input type="checkbox" name="type_skin" value={name} />
              <div className={style.input}></div>
              {name}
            </label>
          ))}
          <div className={style.show} onClick={() => setShow(!show)}>
            <div className={style.line}></div>
            <span>{show ? 'Показать все' : 'Скрыть'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
