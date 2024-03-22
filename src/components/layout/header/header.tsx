import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Catalog from './catalog/catalog';
import Search from './search/search';
import Logo from './logo/logo';
import ProfileLogo from './profileLogo/profileLogo';
import Save from './save/save';
import Basket from './basket/basketBtn';
import { setIsBasketOpen, setIsNotifications } from '@/redux/basketSlice/basketSlice';
import DropDownMenu from './dropDownMenu/dropDownMenu';
import { setIsMenuOpen } from '@/redux/menuSlice/menuSlice';
import { setMenu } from '@/redux/menuSlice/menuSlice';

import { CatalogService } from '@/services';
import style from './header.module.sass';
import axios from 'axios';
import { saleUserIdService } from '@/services/noauth.service';
interface RootState {
  basket: {
    isBasketOpen: boolean;
  };
}

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState('');
  const isBasketOpen = useSelector((state: RootState) => state.basket.isBasketOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsMenuOpen(menuOpen));
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 10) {
        setScroll('scroll');
      } else {
        setScroll('');
      }
    });
  }, [menuOpen]);

  useEffect(() => {
    fetch('https://b.skincareagents.com/local/api/catalog.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'getCategoryList',
      }),
    })
      .then((res) => res.json())
      .then((catalog) => dispatch(setMenu(catalog)));
    if (!localStorage.getItem('saleUserId')) {
      const data = saleUserIdService.getSaleUserId();
      data.then((res) => {
        if (res.result) {
          localStorage.setItem('saleUserId', res.result);
        }
      });
    }
  }, []);

  return (
    <div className={style.header__wrap + ' ' + style[scroll]}>
      <div className="wrap">
        <header className={style.header}>
          <nav className={style.group + ' ' + style.nav}>
            <Catalog menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Search />
          </nav>
          <div className={style.logo}>
            <Logo />
          </div>
          <div className={style.group + ' ' + style.group_right}>
            <ProfileLogo />
            <Save />
            <div
              onClick={() => {
                dispatch(setIsBasketOpen(!isBasketOpen));
                dispatch(setIsNotifications(false));
              }}>
              <Basket />
            </div>
          </div>
        </header>
        <div className={style.menu}>
          {menuOpen && <DropDownMenu setMenuOpen={setMenuOpen} scroll={scroll} />}
        </div>
      </div>
    </div>
  );
};
export default Header;
