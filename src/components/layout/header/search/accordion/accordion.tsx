import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { API_URL, HitsService } from '@/services';
import { debounce } from '@mui/material';

import SearchContent from '../searchContent/searchContent';

import searchImg from './../../../../../../public/search.svg';
import arrowImg from './../../../../../../public/arrow.svg';
import closeImg from './../../../../../../public/close.svg';

import style from './Accordion.module.sass';

// "search": {
//   "description": "Метод отдает товары из каталога списком по поисковой фразе. offset и limit необязательны; в этом случае будет получен каталог полностью, все товары без ограничения. ВНИМАНИЕ! Может Вызывать повышенную нагрузку на БД если кеш не актуализирован! Возвращаемые поля аналогичны getItemsList",
//   "requestVariables": {
//       "query": "Поисковая фраза. Ищет в полях: название, краткое или полное описание",
//       "offset": "Страница с товарами по порядку, начиная с 0",
//       "limit": "Количество товара на страницу offset"
//   }
// },
const Accordion: FC<{ isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }> = ({
  isOpen,
  setIsOpen,
}) => {
  const [value, setValue] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [journalItems, setJournalItems] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('продукты');
  const input = useRef<HTMLInputElement | null>(null);
  const div = useRef<HTMLDivElement | null>(null);
  const getProductsData = debounce(() => {
    if (value === '') {
      fetch(API_URL + '/main.php', {
        method: 'POST',
        body: JSON.stringify({
          type: 'getHits',
          count: 4,
        }),
      })
        .then((res) => res.json())
        .then((res: any) => {
          setProducts(Object.values(res).filter((item: any) => item.id));
          setCount(0);
        });
    } else {
      fetch(API_URL + 'catalogue/index.php', {
        method: 'POST',
        body: JSON.stringify({
          type: 'search',
          query: value.trim(),
          offset: 0,
          limit: 4,
        }),
      })
        .then((res) => res.json())
        .then((res: any) => {
          setProducts(res.items);
          setCount(res.count);
        });
    }
  }, 500);
  const getJournalData = debounce(() => {
    fetch(API_URL + 'journal.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'search',
        query: value.trim(),
        offset: 0,
        limit: 4,
      }),
    })
      .then((res) => res.json())
      .then((res: any) => {
        setJournalItems(res.items);
        setCount(res.count);
      });
  }, 500);
  useEffect(() => {
    if (activeTab === 'продукты') {
      getProductsData();
    } else {
      getJournalData();
    }
  }, [value, activeTab]);
  useEffect(() => {
    if (isOpen && input.current) {
      input.current.focus();
      div.current && div.current.scrollTo(0, 0);
    }
  }, [isOpen]);

  return (
    <div className={style.accordion + ' ' + (isOpen ? style.open : style.close)} ref={div}>
      <div onClick={() => setIsOpen(false)}>
        <img src={closeImg.src} alt="" className={style.closeImg} />
      </div>
      <div className={'wrap ' + style.flex}>
        <input
          type="text"
          value={value}
          className={style.input}
          placeholder="Я ищу"
          ref={input}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={style.search__img}>
          <img src={searchImg.src} alt="" />
        </div>
        <div className={style.arrow}>
          <img src={arrowImg.src} alt="" className={style.arrow__img} />
        </div>
      </div>
      <div className="wrap">
        <SearchContent
          value={value}
          count={count}
          products={products}
          setIsOpen={setIsOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          journalItems={journalItems}
        />
      </div>
    </div>
  );
};
export default Accordion;
