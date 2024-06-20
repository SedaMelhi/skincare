import { Dispatch, FC, SetStateAction } from 'react';
import Link from 'next/link';

import { CatalogItems } from '../interface';

import arrow from './../../../../../../public/arr.svg';

import style from './../dropDownMenu.module.sass';

interface PCMenuProps {
  items: CatalogItems;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const PCMenu: FC<PCMenuProps> = ({ items, setMenuOpen }) => {
  return items.map(({ ID, NAME, SUBCATEGORIES }): any => (
    <div className={style.item__wrap} key={ID}>
      <Link
        href={'/catalog/' + ID}
        className={style.item}
        onClick={() => setMenuOpen((prev) => !prev)}>
        {NAME}{' '}
        {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
          <img className={style.arrow} src={arrow.src} />
        )}
      </Link>
      {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
        <div className={style.categories}>
          {SUBCATEGORIES.map(({ ID, NAME, SUBCATEGORIES }) => (
            <div className={style.subitem} key={ID}>
              <Link href={'/catalog/' + ID} onClick={() => setMenuOpen((prev) => !prev)}>
                {NAME}{' '}
                {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
                  <img className={style.arrow} src={arrow.src} />
                )}
              </Link>
              {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
                <div className={style.subcategories}>
                  {SUBCATEGORIES.map(({ ID, NAME }) => (
                    <div className={style.subcategories__item} key={ID}>
                      <Link
                        href={'/catalog/' + ID}
                        className={style.item}
                        onClick={() => setMenuOpen((prev) => !prev)}>
                        {NAME}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  ));
};

export default PCMenu;
