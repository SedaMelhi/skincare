import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { CatalogItems, CatalogMenu } from './interface';
import { setMenu } from '@/redux/menuSlice/menuSlice';
import MobileMenu from './mobileMenu/mobileMenu';
import PCMenu from './pcMenu/pcMenu';

import style from './dropDownMenu.module.sass';

interface IMenuOpen {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  scroll: string;
}

const DropDownMenu: FC<IMenuOpen> = ({ setMenuOpen, scroll }) => {
  const [items, setItems] = useState<CatalogItems>([]);
  const catalog = useSelector((state: CatalogMenu) => state.menu.menu);
  const dispatch = useDispatch();

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

  return (
    <div className={style.catalog__wrap + ' ' + style[scroll]}>
      <div className={style.wrap}>
        <div className={style.empty}></div>
        <div className={style.catalog}>
          <div className={style.pc}>
            <PCMenu items={items} setMenuOpen={setMenuOpen} />
          </div>
          <div className={style.mobile}>
            <MobileMenu items={items} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
