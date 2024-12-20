import { FC } from 'react';
import MobileBasket from './mobileBasket/mobileBasket';
import CircleArrow from '@/components/other/circleArrow/circleArrow';

import { IbasketData } from '@/interfaces/basket.interface';
import { IOrder, IOrderBasket } from '@/interfaces/order.interface';

import Link from 'next/link';

import style from './basketRight.module.sass';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const BasketRight: FC<{ basket: IOrder | null }> = ({ basket }) => {
  const arr: IOrderBasket[] | [] = basket ? Object.values(basket.cartItems) : [];
  const { price, discount } = useSelector((state: RootState) => state.order.pricing); 

  return (
    <div>
      <div className={style.basket_pc}>
        <div className={style.basket__wrap} style={arr.length === 0 ? { height: '310px' } : {}}>
          <div className={style.basket}>
            <div className={style.padding}>
              <div className={style.header}>
                <div className={style.header__title}>
                  <div>Ваш заказ ({arr.length} товаров)</div>
                </div>
              </div>

              <div className={style.content}>
                {arr.length === 0 ? (
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
                  arr.map(({ name, cartId, price, value, picture, parentId }) => (
                    <Link href={`product/${parentId}`} key={cartId} className={style.product}>
                      <div
                        className={style.image}
                        style={
                          picture
                            ? {
                              backgroundImage: `url(https://b.skincareagents.com${picture})`,
                            }
                            : {}
                        }></div>
                      <div className={style.info}>
                        <div className={style.name}>{name}</div>
                        <div className={style.bottom}>
                          <div className={style.price}>{price.discountPrice}</div>
                          <div className={style.size}>{value}</div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
            {arr.length !== 0 && (
              <div className={style.footer}>
                <div className={style.line}>
                  <div className={style.line__text}>Сумма заказа</div>
                  <div className={style.border}></div>

                  <div className={style.sum}>{basket && basket.basket.price} ₽</div>
                </div>
                {discount && (
                  <div className={style.line}>
                    <div className={style.line__text}>Промокод</div>
                    <div className={style.border}></div>
                    <div className={style.sum}>- {discount} ₽</div>
                  </div>
                )}
                {/* <div className={style.line}>
                  <div className={style.line__text}>Доставка</div>
                  <div className={style.border}></div>
                  <div className={style.sum}>500 ₽</div>
                </div> */}
                <div className={style.line}>
                  <div className={style.line__text}>Итого</div>
                  <div className={style.all__price}>{price ? price : basket && basket.basket.price} ₽</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileBasket basket={basket} />
    </div>
  );
};

export default BasketRight;
