import { FC, useEffect, useState } from 'react';
import { setCheckboxFilters } from '@/redux/catalogSlice/catalogSlice';
import minusSvg from './../../../../../public/catalog/minus.svg';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import style from './filter.module.sass';


const Filter: FC<{
  name: any;
  items: { name: string; id: string }[];
  id: string;
}> = ({ name, items, id }) => {
  const [renderItems, setRenderItems] = useState(items.filter((item, i) => i < 3));
  const [isShow, setIsShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true);
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 600);
  }, []);

  const addCheckboxFilter = (i: string) => {
    if (checkboxFilters[id]) {
      let params = checkboxFilters[id].some((item: any) => item === i)
        ? { ...checkboxFilters, [id]: checkboxFilters[id].filter((item: any) => item !== i) }
        : { ...checkboxFilters, [id]: [...checkboxFilters[id], i] }
      if (params[id].length === 0) {
        delete params[id]
      }
      dispatch(
        setCheckboxFilters(
          params
        ),
      );
    } else {
      dispatch(setCheckboxFilters({ ...checkboxFilters, [id]: [i] }));
    }
  };
  return (
    <div className={firstLoad ? style.load : ''}>
      <Accordion
        className={style.accordion}
      >
        <AccordionSummary
          className={style.params__wrap}
          onClick={() => {
            setRenderItems(items.filter((item, i) => i < 3))
            setIsShow(false)
            setIsOpen(prev => !prev)
          }}>
          <div className={style.title}>
            <span>{name} </span>
            <div className={style.sign}>
              <img src={minusSvg.src} alt="" style={isOpen ? { opacity: '0' } : {}} />
              <img src={minusSvg.src} alt="" />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className={style.params}>
          {renderItems.map((item, i) => (
            <label
              className={style.item}
              key={item.id}>
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
              <div className={style.input__text}>{item.name}</div>
            </label>
          ))}
          <div className={style.renderItems} onClick={() => {
            if (!isShow) {
              setRenderItems(items)
            } else {
              setRenderItems(items.filter((item, i) => i < 3))
            }

            setIsShow(prev => !prev)
          }}>
            <div className={style.line}></div>
            <span>{!isShow ? 'Показать все' : 'Скрыть'}</span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div >
  );
};

export default Filter;
