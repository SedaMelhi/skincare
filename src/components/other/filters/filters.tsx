import { FC, useEffect, useState } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { FilterService } from '@/services/catalog.service';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckboxFilters, setDiscountFilter } from '@/redux/catalogSlice/catalogSlice';

import RangeSlider from '../rangeSlider/rangeSlider';

import Filter from './filter/filter';

import style from './filters.module.sass';

const Filters: FC = () => {
  const [filters, setFilters] = useState<any>(null);
  const [checkbox, setCheckbox] = useState('null');
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const res = FilterService.getFilterItems(router.query.id);
    res.then((res) => setFilters(res));
  }, []);
  useEffect(() => {
    console.log(filters);
    const obj: any = {};
    if (filters) {
      Object.keys(filters)
        .filter((item) => item[0] === 'S')
        .forEach((item) => {
          obj[item] = [];
        });
      dispatch(setCheckboxFilters(obj));
    }
  }, [filters, router.query.id]);

  useEffect(() => {
    dispatch(setDiscountFilter(checkbox));
  }, [checkbox]);

  return (
    <aside className={style.aside}>
      <div className={style.line}>
        <span>Cо скидкой</span>
        <label className={style.switch}>
          <input
            type="checkbox"
            className={style.input}
            value={checkbox}
            onChange={() => setCheckbox((prev) => (prev === 'null' ? 'Y' : 'null'))}
          />
          <span className={`${style.slider} ${style.round}`}></span>
        </label>
      </div>
      <div className={`${style.title} ${style.title_grey}`}>Цена</div>

      <StyledEngineProvider injectFirst>
        <RangeSlider />
      </StyledEngineProvider>
      {filters &&
        Object.keys(filters)
          .filter((item) => item[0] === 'S')
          .map(
            (item) =>
              filters[item] && (
                <Filter
                  name={filters[item].name}
                  id={item}
                  items={filters[item].items}
                  key={item}
                />
              ),
          )}
    </aside>
  );
};

export default Filters;
