import { FC, useEffect, useRef, useState } from 'react';

import { FilterService } from '@/services/catalog.service';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '@/redux/catalogSlice/catalogSlice';

import sortSvg from './../../../../public/catalog/sort.svg';

import style from './sort.module.sass';

const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sort = useSelector((state: any) => state.catalog.sort)
  const dispatch = useDispatch()
  const [sortItems, setSortItems] = useState([])
  const router = useRouter();
  const sortTag = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    document.addEventListener('mouseup', function (e: any) {
      if (sortTag.current) {
        if (!sortTag.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
    });
    const res = FilterService.getFilterItems(router.query.id);
    res.then((res) => setSortItems(res.sort));
  }, []);
  useEffect(() => {
    dispatch(setSort('popular'))
  }, [router]);

  const handleSortItemClick = (e: any) => {
    dispatch(setSort(e.target.value))
    setIsOpen(false)
  }
  return (
    <div className={style.wrap} ref={sortTag}>
      <span className={style.text} onClick={() => setIsOpen(!isOpen)} >{sort === sortItems[2] ? 'По популярности' : sort === sortItems[0] ? "По возрастанию цены" : sort === sortItems[1] ? "По убыванию цены" : sort === sortItems[3] ? "По скидкам" : sort === sortItems[4] ? "По новинкам" : 'По популярности'}</span>
      <img src={sortSvg.src} alt="" className={style.img} onClick={() => setIsOpen(!isOpen)} />
      <div className={style.items + ' ' + (isOpen ? style.open : style.close)}>
        <label className={style.item}><input type="radio" name="sort" value={sortItems[2]} onChange={handleSortItemClick} /><div className={style.circle + ' ' + (sort === sortItems[2] && style.active)}></div><span>По популярности</span></label>
        <label className={style.item}><input type="radio" name="sort" value={sortItems[0]} onChange={handleSortItemClick} /><div className={style.circle + ' ' + (sort === sortItems[0] && style.active)}></div><span>По возрастанию цены</span></label>
        <label className={style.item}><input type="radio" name="sort" value={sortItems[1]} onChange={handleSortItemClick} /><div className={style.circle + ' ' + (sort === sortItems[1] && style.active)}></div><span>По убыванию цены</span></label>
        <label className={style.item}><input type="radio" name="sort" value={sortItems[3]} onChange={handleSortItemClick} /><div className={style.circle + ' ' + (sort === sortItems[3] && style.active)}></div><span>По скидкам</span></label>
        <label className={style.item}><input type="radio" name="sort" value={sortItems[4]} onChange={handleSortItemClick} /><div className={style.circle + ' ' + (sort === sortItems[4] && style.active)}></div><span>По новинкам</span></label>
      </div>
    </div>
  );
};

export default Sort;
