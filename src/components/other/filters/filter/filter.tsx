import { FC, useEffect, useState } from 'react';
import { setCheckboxFilters } from '@/redux/catalogSlice/catalogSlice';
import minusSvg from './../../../../../public/catalog/minus.svg';

import style from './filter.module.sass';
import { useDispatch, useSelector } from 'react-redux';

const Filter: FC<{
  name: any;
  items: { name: string; id: string }[];
  id: string;
}> = ({ name, items, id }) => {
  const [show, setShow] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 600);
  }, []);

  const addCheckboxFilter = (i: string) => {
    if (checkboxFilters[id]) {
      dispatch(
        setCheckboxFilters(
          checkboxFilters[id].some((item: any) => item === i)
            ? { ...checkboxFilters, [id]: checkboxFilters[id].filter((item: any) => item !== i) }
            : { ...checkboxFilters, [id]: [...checkboxFilters[id], i] },
        ),
      );
    } else {
      dispatch(setCheckboxFilters({ ...checkboxFilters, [id]: [i] }));
    }
  };

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
          {items.map((item, i) => (
            <label
              className={style.item}
              key={item.id}
              style={i > 3 && show ? { display: 'none' } : {}}>
              <input
                type="checkbox"
                name={item.id}
                value={item.name}
                checked={
                  checkboxFilters[id]
                    ? checkboxFilters[id].some((filter: any) => filter === item.id)
                    : false
                }
                onChange={() => addCheckboxFilter(item.id)}
              />
              <div className={style.input}></div>
              {item.name}
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
