import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import CircleArrow from '@/components/other/circleArrow/circleArrow';
import basketLogo from './../../../../../../public/basket.svg';
import arrowDown from './../../../../../../public/certificate/arrow.svg';
import plusSvg from './../../../../../../public/plusSimple.svg';
import style from './../basketRight.module.sass';
import { IOrder, IOrderBasket } from '@/interfaces/order.interface';
import Link from 'next/link';

interface BasketItem {
  name: string;
  price: string;
  size: string;
  id: number;
}

const MobileBasket: FC<{ basket: IOrder | null }> = ({ basket }) => {
  const arr: IOrderBasket[] | [] = basket ? Object.values(basket.cartItems) : [];
  return (
    <div className={style.basket_mobile}>
      <div className={style.basket__wrap} style={arr.length === 0 ? { height: '310px' } : {}}>
        <div className={style.basket}>
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
              // expandIcon={<img src={arrow.src} alt="" className={style.arrow_down} />}
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
                '& .Mui-expanded img[alt="arrow"]': {
                  transform: 'translate(0px) rotate(180deg)',
                },
                '& .MuiButtonBase-root-MuiAccordionSummary-root': {
                  minHeight: 'auto',
                },
              }}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <div className={style.header}>
                <div className={style.header__left}>
                  <div className={style.basketLogo}>
                    <img src={basketLogo.src} alt="" className={style.bag} />
                  </div>
                  <div className={style.header__text}>Ваш заказ ({arr.length} товаров)</div>
                  <div className={style.arrowDown}>
                    <img src={arrowDown.src} alt="arrow" />
                  </div>
                </div>
                <div className={style.header__price}>5 500 ₽</div>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '0',
              }}>
              <div className={style.padding}>
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
                  {/* <div className={style.line}>
                    <div className={style.line__text}>Доставка</div>
                    <div className={style.border}></div>
                    <div className={style.sum}>500 ₽</div>
                  </div> */}
                  <div className={style.line}>
                    <div className={style.line__text}>Итого</div>
                    <div className={style.border}></div>
                    <div className={style.all__price}>{basket && basket.basket.price} ₽</div>
                  </div>
                  <div className={style.promocodes}>
                    <div className={style.promocode__wrap + ' ' + style.promocode__first}>
                      <input type="text" className={style.promocode} placeholder="Промокод" />
                      <img src={plusSvg.src} alt="" />
                    </div>
                    <div className={style.promocode__wrap}>
                      <input
                        type="text"
                        className={style.promocode}
                        placeholder="Подарочный сертификат"
                      />
                      <img src={plusSvg.src} alt="" />
                    </div>
                  </div>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MobileBasket;
