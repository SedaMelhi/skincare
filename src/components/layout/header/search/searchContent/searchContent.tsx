import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import Link from 'next/link';

import CardProduct from '@/components/other/cardProduct/cardProduct';
import Product from '@/components/other/products/product/product';
import Button from '@/components/other/button/button';

import CircleArrow from '@/components/other/circleArrow/circleArrow';

import style from './searchContent.module.sass';

const SearchContent: FC<{
  value: string;
  count: number;
  products: any[];
  activeTab: string;
  journalItems: any[];
  setActiveTab: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ value, count, products, setIsOpen, activeTab, setActiveTab, journalItems }) => {
  const pluralize = useCallback((n: number): string => {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${n} результат`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
      return `${n} результата`;
    } else {
      return `${n} результатов`;
    }
  }, []);

  return (
    <div>
      <div className={style.tabs}>
        <div
          className={style.tab + ' ' + (activeTab === 'продукты' ? style.active : '')}
          onClick={() => setActiveTab('продукты')}>
          продукты
        </div>
        <div
          className={style.tab + ' ' + (activeTab === 'статьи' ? style.active : '')}
          onClick={() => setActiveTab('статьи')}>
          статьи
        </div>
      </div>
      <div className={style.popular_wrap}>
        <div className={style.name}>{value === '' ? 'Популярные запросы' : pluralize(count)}</div>

        {activeTab === 'продукты' ? (
          <div className={style.popular}>
            {products &&
              products.map((item, i) => (
                <div onClick={() => setIsOpen(false)} key={i}>
                  {count === 0 ? (
                    <div>
                      <CardProduct
                        available={true}
                        id={item.id}
                        name={item.name}
                        pin={item.pin}
                        scu={item.scu}
                        sectionCode={item.sectionCode}
                        sectionName={item.sectionName}
                        smallPhoto={item.smallPhoto}
                      />
                    </div>
                  ) : (
                    <div>
                      <Product item={item} classValue="card" />
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className={style.journal}>
            {journalItems &&
              journalItems.map((item) => (
                <Link href={`/article/${item.id}`} key={item.id} onClick={() => setIsOpen(false)}>
                  <div className={style.header}>
                    <div className={style.image}></div>
                    <div className={'wrap ' + style.header__text}>
                      <h3 className={style.title}>
                        <div>
                          <div className={style.subtitle}>{item.section.name}</div>
                          {item.name}
                        </div>
                        <div className={style.arrow}>
                          <CircleArrow
                            sizeCircle="48px"
                            sizeImg="21px"
                            color="#C077ED"
                            colorImg="#C077ED"
                          />
                        </div>
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
        {count !== 0 && (
          <div className={style.btn}>
            <Button text={'Показать всё'} arrow={true} link={'catalog'} />
          </div>
        )}
      </div>
      <Button text="" />
    </div>
  );
};
export default SearchContent;
