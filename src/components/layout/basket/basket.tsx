import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { getCartService } from '@/services/cart.service';
import Link from 'next/link';
import { IPricesObj, IbasketData } from '@/interfaces/basket.interface';

import CircleArrow from '@/components/other/circleArrow/circleArrow';
import NewProductsSwiper from './newProducts/newProductsSwiper';
import ProductsTable from './productsTable/productsTable';
import { setIsBasketOpen, setReduxBasketArr } from '@/redux/basketSlice/basketSlice';

import closeSvg from './../../../../public/close.svg';
import basketSvg from './../../../../public/basket2.svg';
import whitebasketArrowSvg from './../../../../public/whiteArrow.svg';

import style from './basket.module.sass';

interface IRootState {
  basket: {
    isBasketOpen: boolean;
  };
}

const Basket: FC = () => {
  const [basketArr, setBasketArr] = useState<IbasketData[] | []>([]);
  const isBasketOpen = useSelector((state: IRootState) => state.basket.isBasketOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const [pricesObj, setPricesObj] = useState<IPricesObj | null>(null);
  const closeBasket = () => {
    dispatch(setIsBasketOpen(false));
  };
  const handleBtnClick = () => {
    router.push('/placing');
  };

  useEffect(() => {
    if (localStorage.getItem('saleUserId')) {
      const data = getCartService.getCart();
      data.then((res) => {
        console.log('res', res);
        setPricesObj(res.basket);
        setBasketArr(Object.values(res.cartItems));
      });
      data.catch((error) => console.error('Error fetching cart:', error));
    }
  }, [isBasketOpen]);
  useEffect(() => {
    dispatch(setReduxBasketArr(basketArr));
  }, [basketArr]);
  useEffect(() => {
    closeBasket();
  }, [router]);
  //cartItems
  return (
    <CSSTransition
      in={isBasketOpen}
      timeout={400}
      classNames={{
        enter: style.slideEnter,
        enterActive: style.slideEnterActive,
        exit: style.slideExit,
        exitActive: style.slideExitActive,
      }}
      unmountOnExit>
      <div>
        <div className={style.basket__wrap}>
          <div className={style.empty} onClick={closeBasket}></div>
          <div className={style.basket}>
            <div className={style.padding}>
              <div className={style.header}>
                <div className={style.close}>
                  <img src={closeSvg.src} alt="" onClick={closeBasket} />
                </div>
                <div className={style.bag}>
                  <img src={basketSvg.src} alt="" />
                  <div className={style.bag__text}>
                    Сумочка <span>({basketArr.length})</span>
                  </div>
                </div>
              </div>
              <div className={style.content}>
                {basketArr.length === 0 ? (
                  <>
                    <p className={style.description}>
                      Похоже, ваша сумочка пуста. Давайте изменим это.
                    </p>
                    <div className={style.search}>
                      <span className={style.text}>поиск</span>
                      <div className={style.circle}>
                        <CircleArrow
                          sizeCircle="66px"
                          sizeImg="32px"
                          color="var(--grey-400)"
                          colorImg="var(--grey-900)"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <ProductsTable
                    basketArr={basketArr}
                    setBasketArr={setBasketArr}
                    setPricesObj={setPricesObj}
                  />
                )}
              </div>
            </div>
            {basketArr.length === 0 ? (
              <div className={style.products}>
                <div className={style.text}>новинки</div>
                <NewProductsSwiper />
              </div>
            ) : (
              <div className={style.footer}>
                <div className={style.table}>
                  <div className={style.table__row}>
                    <div>Товаров на сумму</div>
                    <div className={style.price + ' ' + style.old_price}>
                      {pricesObj ? pricesObj.fullPrice : 0} ₽
                    </div>
                  </div>
                  <div className={style.table__row}>
                    <div className={style.discount}>Скидка</div>
                    <div className={style.price + ' ' + style.discount}>
                      {pricesObj ? pricesObj.fullPrice - pricesObj.price : 0} ₽
                    </div>
                  </div>
                  <div className={style.table__row}>
                    <div>Итого</div>
                    <div className={style.price + ' ' + style.allPrice}>
                      {pricesObj ? pricesObj.price : 0} ₽
                    </div>
                  </div>
                </div>
                <div className={style.promocode}>
                  Применить промокод, сертификат или баллы можно при оформлении заказа.
                </div>
                <Link href="/placing">
                  <button className={style.btn} onClick={handleBtnClick}>
                    оформить заказ <img src={whitebasketArrowSvg.src} alt="->" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
export default Basket;
