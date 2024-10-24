import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CatalogItems } from '../interface';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useRouter } from 'next/router';
import { IBrands } from '../dropDownMenu';
import arrow from './../../../../../../public/arr.svg';
import arrowLeft from './../../../../../../public/arrowLeft.svg';
import pinkHurt from './../../../../../../public/pinkHurt.svg';

import { useDispatch } from 'react-redux';
import { setCheckboxFilters, setDiscountFilter, setPrice, setSort } from '@/redux/catalogSlice/catalogSlice';

import style from './mobileMenu.module.sass';
import Link from 'next/link';

interface MobileMenuProps {
  items: CatalogItems;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  brands: IBrands;
  brandsCount: number;
}

const MobileMenu: FC<MobileMenuProps> = ({ items, setMenuOpen, brands, brandsCount }) => {
  const [menu, setMenu] = useState<CatalogItems | undefined>(items);
  const [title, setTitle] = useState<string>('');
  const router = useRouter();
  useEffect(() => {
    setMenu(items);
  }, [items]);
  const handleMenuItemClick = (arr: CatalogItems, name: string): void => {
    setMenu(arr);
    setTitle(name);
  };
  const changeLink = (id: string): void => {
    reset()
    router.push('/catalog/' + id);
  };

  const dispatch = useDispatch();
  const handleBrandClick = (id: string, name: string) => {
    reset()
    router.push('/catalog?brandId=' + id + '&brandName=' + name);
  };
  const reset = () => {
    setMenuOpen(false);
    dispatch(setCheckboxFilters({}))
    dispatch(setPrice(null))
    dispatch(setSort(''))
    dispatch(setDiscountFilter('null'))
  }
  return (
    <div className={style.menu}>
      {!title && (
        <Link
          href={'/catalog/?all=true'}
          className={style.level1}
          onClick={() => setMenuOpen((prev) => !prev)}>
          <div className={style.name}>ВСЕ</div>
        </Link>
      )}

      {title && (
        <div className={style.title} onClick={() => handleMenuItemClick(items, '')}>
          <div>
            <img src={arrowLeft.src} alt="" />
          </div>
          <div>{title}</div>
        </div>
      )}
      {!title ? (
        <div className={style.level1} onClick={() => handleMenuItemClick([], 'БРЕНДЫ')}>
          <div className={style.name}>БРЕНДЫ</div>
          <div className={style.arrow}>
            <img src={arrow.src} alt="" />
          </div>
        </div>
      ) : (
        ''
      )}
      {title === 'БРЕНДЫ' ? (
        <div className={style.level2 + ' ' + style.brands}>
          {Object.keys(brands).map((key) => (
            <div className={style.brands__column} key={key}>
              <div className={style.brands__letter}>
                <span className={style.brands__letter_upper}>{key}</span>
                <span className={style.brands__letter_lower}>{key}</span>
              </div>

              {brands[key].map(({ id, name }) => (
                <div className={style.brands__item}>
                  <div onClick={() => handleBrandClick(id, name)}>{name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}

      {menu &&
        menu.map(({ DEPTH_LEVEL, DESCRIPTION, IBLOCK_SECTION_ID, ID, NAME, SUBCATEGORIES }) =>
          DEPTH_LEVEL === '1' ? (
            SUBCATEGORIES && SUBCATEGORIES.length > 0 ? (
              <div
                className={style.level1}
                key={ID}
                onClick={() => handleMenuItemClick(SUBCATEGORIES, NAME)}>
                <div className={style.name}>{NAME}</div>
                <div className={style.arrow}>
                  <img src={arrow.src} alt="" />
                </div>
              </div>
            ) : (
              <div className={style.level1} key={ID} onClick={() => changeLink(ID)}>
                <div className={style.name}>{NAME}</div>
              </div>
            )
          ) : (
            <div className={style.level2} key={ID}>
              {SUBCATEGORIES && SUBCATEGORIES.length > 0 ? (
                <Accordion
                  sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    color: '#8A7E8F',
                    '& .Mui-expanded': {
                      margin: '0',
                      color: '#271F2B',
                    },
                    '& > div': {
                      minHeight: 'auto',
                    },
                    '& > div.Mui-expanded': {
                      minHeight: 'auto',
                      paddingBottom: '12px',
                    },
                  }}>
                  <AccordionSummary
                    expandIcon={<img src={arrow.src} alt="" className={style.arrow_down} />}
                    sx={{
                      width: '100%',
                      padding: '0',
                      justifyContent: 'space-between',
                      '& .Mui-expanded': {
                        margin: '0',
                      },
                      '& .MuiAccordionSummary-content': {
                        flexGrow: '0',
                        margin: '0',
                      },
                      '& .Mui-expanded img': {
                        transform: 'translate(-4px, 0px) rotate(90deg)',
                      },
                      '& .MuiButtonBase-root-MuiAccordionSummary-root': {
                        minHeight: 'auto',
                      },
                    }}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <div className={style.name}>
                      <div>{NAME}</div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: '0',
                    }}>
                    <div className={style.level3} onClick={() => changeLink(ID)}>
                      Все
                    </div>
                    {SUBCATEGORIES &&
                      SUBCATEGORIES.length > 0 &&
                      SUBCATEGORIES.map(({ NAME, ID }) => (
                        <div className={style.level3} key={ID} onClick={() => changeLink(ID)}>
                          {NAME}
                        </div>
                      ))}
                  </AccordionDetails>
                </Accordion>
              ) : (
                <div className={style.name} onClick={() => changeLink(ID)}>
                  {NAME}
                </div>
              )}
            </div>
          ),
        )}
      <div className={style.favorite}>
        <div>
          <img src={pinkHurt.src} alt="" />
        </div>
        <div>фавориты</div>
      </div>
    </div>
  );
};

export default MobileMenu;
