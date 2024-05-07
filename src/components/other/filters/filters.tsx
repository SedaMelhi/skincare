import { FC, useEffect, useState } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { FilterService } from '@/services/catalog.service';
import { useRouter } from 'next/router';

import RangeSlider from '../rangeSlider/rangeSlider';

import Filter from './filter/filter';

import style from './filters.module.sass';

const Filters: FC = () => {
  const [filters, setFilters] = useState<any>({});
  const [checkbox, setCheckbox] = useState('null');
  const router = useRouter();
  useEffect(() => {
    const res = FilterService.getFilterItems(router.query.id);
    res.then((res) => setFilters(res));
  }, []);
  useEffect(() => {
    const res = FilterService.getData(router.query.id, checkbox, []);
    res.then((res) => console.log(res));
  }, [checkbox]);
  console.log(filters);
  console.log(checkbox);

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
      {['S10', 'S9', 'S1', 'S8', 'S7', 'S6'].map(
        (item) =>
          filters[item] && (
            <Filter name={filters[item].name} items={filters[item].items} key={item} />
          ),
      )}
    </aside>
  );
};

export default Filters;
