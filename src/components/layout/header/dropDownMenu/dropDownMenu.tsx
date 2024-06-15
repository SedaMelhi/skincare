import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CatalogItems, CatalogMenu } from './interface';
import { setMenu } from '@/redux/menuSlice/menuSlice';
import MobileMenu from './mobileMenu/mobileMenu';
import PCMenu from './pcMenu/pcMenu';

import style from './dropDownMenu.module.sass';
import { FilterService } from '@/services/catalog.service';

interface IMenuOpen {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  scroll: string;
}
export type Brands = {
  id: string;
  name: string;
};

export interface IBrands {
  [key: string]: Brands[];
}

const DropDownMenu: FC<IMenuOpen> = ({ setMenuOpen, scroll }) => {
  const [items, setItems] = useState<CatalogItems>([]);
  const catalog = useSelector((state: CatalogMenu) => state.menu.menu);
  const dispatch = useDispatch();
  const [brands, setBrands] = useState({});
  const [brandsCount, setBrandsCount] = useState(0);
  useEffect(() => {
    let arr: CatalogItems = [];
    if (catalog.length === 0) {
      fetch(' local/api/catalogue.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'getCategoryList',
        }),
      })
        .then((res) => res.json())
        .then((data) => dispatch(setMenu(data)));
    } else {
      catalog.forEach(({ ID, NAME, DESCRIPTION, DEPTH_LEVEL, IBLOCK_SECTION_ID }) => {
        if (DEPTH_LEVEL === '1') {
          arr.push({ ID, NAME, DESCRIPTION, DEPTH_LEVEL, IBLOCK_SECTION_ID, SUBCATEGORIES: [] });
        }
      });
      catalog.forEach(({ ID, NAME, DESCRIPTION, DEPTH_LEVEL, IBLOCK_SECTION_ID }) => {
        if (DEPTH_LEVEL === '2') {
          arr.forEach((item) => {
            if (item.ID === IBLOCK_SECTION_ID) {
              item.SUBCATEGORIES &&
                item.SUBCATEGORIES.push({
                  ID,
                  NAME,
                  DESCRIPTION,
                  DEPTH_LEVEL,
                  IBLOCK_SECTION_ID,
                  SUBCATEGORIES: catalog.filter(
                    (item) => item.IBLOCK_SECTION_ID === ID && item.DEPTH_LEVEL === '3',
                  ),
                });
            }
          });
        }
      });
      setItems(arr);
    }
  }, [catalog]);
  useEffect(() => {}, [brands]);
  useEffect(() => {
    const res = FilterService.getFilterItems('');
    res.then((res) => {
      let brands: Brands[] = res.S1.items;
      setBrandsCount(brands.length);
      if (brands) {
        brands = brands.sort((a: Brands, b: Brands) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        const sortedBrands: IBrands = {};
        brands.forEach((item) => {
          sortedBrands[item.name[0]]
            ? sortedBrands[item.name[0]].push(item)
            : (sortedBrands[item.name[0]] = [item]);
        });
        setBrands(sortedBrands);
      }
    });
  }, []);
  console.log(brands);

  return (
    <div className={style.catalog__wrap + ' ' + style[scroll]}>
      <div className={style.wrap}>
        <div className={style.empty}></div>
        <div className={style.catalog}>
          <div className={style.pc}>
            <PCMenu
              items={items}
              setMenuOpen={setMenuOpen}
              brands={brands}
              brandsCount={brandsCount}
            />
          </div>
          <div className={style.mobile}>
            <MobileMenu
              items={items}
              setMenuOpen={setMenuOpen}
              brands={brands}
              brandsCount={brandsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
