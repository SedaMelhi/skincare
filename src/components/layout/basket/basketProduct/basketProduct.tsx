import { FC, useState } from 'react';
import Link from 'next/link';
import { IbasketData } from '@/interfaces/basket.interface';
import {
  addSCUToCartService,
  getCartService,
  removeSCUToCartService,
} from '@/services/cart.service';
import { IScu, IShade } from '@/interfaces/products.interface';

import closeSvg from './../../../../../public/close.svg';
import saveSvg from './../../../../../public/save.svg';
import notphotoPng from './../../../../../public/notphoto.png';
import minusSvg from './../../../../../public/minus.svg';
import plusSvg from './../../../../../public/plus.svg';

import style from './basketProduct.module.sass';

const BasketProduct: FC<IbasketData> = ({
  name,
  quantity,
  finalPrice,
  scuId,
  parentItem,
  cartId,
  fullPrice,
  price,
  setBasketArr,
  setPricesObj,
}) => {
  const [activeScu, setActiveScu] = useState(
    parentItem?.SCU.filter(({ id, value }) => id === scuId),
  );
  const uniqueColors: any = {};
  const [uniqueScuColor, setUniqueScuColor] = useState<(IShade | false)[]>(
    parentItem?.SCU.map((item) => {
      if (item.shade && !uniqueColors[item.shade.NAME] && activeScu[0].value === item.value) {
        uniqueColors[item.shade.NAME] = true;
        return item.shade;
      }
      return false;
    }).filter((item) => item),
  );
  const uniqueScuValue: string[] = Array.from(
    new Set(
      parentItem?.SCU.map(({ value, shade }) =>
        shade?.ID === activeScu[0].shade?.ID ? value : '',
      ),
    ),
  ).filter((item) => item !== '');

  const handleRemoveScuToCart = (cartId: number) => {
    const data = removeSCUToCartService.removeSCUToCart(cartId);
    data.then((res) => {
      if (res.status === 'ok') {
        const data = getCartService.getCart();
        data.then((res) => {
          setPricesObj && setPricesObj(res.basket);
          setBasketArr && setBasketArr(Object.values(res.cartItems));
        });
      }
    });
  };
  const handleSizeClick = (newValue: string, cartId: number) => {
    addSCUToCartService.addSCUToCart(
      parentItem.SCU.filter(
        ({ value, shade }) => shade?.ID === activeScu[0].shade?.ID && newValue == value,
      )[0].id,
      quantity,
    );
    handleRemoveScuToCart(cartId);
  };
  const handleChangeActiveColor = (id: string, cartId: number) => {
    addSCUToCartService.addSCUToCart(
      parentItem.SCU.filter(
        ({ value, shade }) => shade?.ID === id && activeScu[0].value == value,
      )[0].id,
      quantity,
    );
    handleRemoveScuToCart(cartId);
  };
  const handlePlusScu = () => {
    const data = addSCUToCartService.addSCUToCart(scuId, 1);
    data.then((res) => {
      if (res.status === 'ok') {
        const data = getCartService.getCart();

        data.then((res) => {
          setPricesObj && setPricesObj(res.basket);
          setBasketArr && setBasketArr(Object.values(res.cartItems));
        });
      }
    });
  };
  const handleMinusScu = () => {
    // if (quantity > 1) {
    //   handleRemoveScuToCart(cartId);
    //   console.log('quantity', quantity);
    //   const data = addSCUToCartService.addSCUToCart(scuId, quantity - 1);
    //   data.then((res) => {
    //     if (res.status === 'ok') {
    //       const data = getCartService.getCart();
    //       console.log('sdfdsf');
    //       data.then((res) => {
    //         setPricesObj && setPricesObj(res.basket);
    //         setBasketArr && setBasketArr(Object.values(res.cartItems));
    //       });
    //     }
    //   });
    // }
  };
  return (
    <div className={style.row} key={scuId}>
      <div className={style.top}>
        <Link href={`/product/${parentItem.ID}`} key={parentItem.ID}>
          <div
            className={style.image}
            style={{
              backgroundImage: `url(${
                parentItem.PREVIEW_PICTURE
                  ? 'https://b.skincareagents.com' + parentItem.PREVIEW_PICTURE
                  : notphotoPng.src
              })`,
            }}></div>
        </Link>
        <div className={style.column}>
          <div className={style.flex}>
            <div>
              <Link href={`/product/${parentItem.ID}`} key={parentItem.ID}>
                <div className={style.title}>{name}</div>
              </Link>
              <div className={style.colors}>
                {uniqueScuColor.map(
                  (item) =>
                    item && (
                      <div className={style.color} key={item.ID}>
                        <div className={style.color__name}>
                          <img src={'/Union.svg'} alt="" />
                          <span>{item.NAME}</span>
                        </div>
                        <div
                          className={
                            style.color__border +
                            ' ' +
                            (item.ID === activeScu[0].shade?.ID ? style.active : '')
                          }
                          onClick={() => handleChangeActiveColor(item.ID, cartId)}>
                          <div
                            className={style.color__image}
                            style={{
                              background: item.PREVIEW_PICTURE
                                ? `url(https://b.skincareagents.com/${item.PREVIEW_PICTURE})`
                                : '',
                            }}></div>
                        </div>
                      </div>
                    ),
                )}
              </div>
              <div className={style.sizes}>
                {uniqueScuValue.map((value, i) => (
                  <div
                    className={
                      style.size + ' ' + (activeScu[0].value === value ? style.active : '')
                    }
                    key={i}
                    onClick={() => handleSizeClick(value, cartId)}>
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className={style.save}>
                <img src={saveSvg.src} alt="save" />
              </div>
              <div className={style.remove} onClick={() => handleRemoveScuToCart(cartId)}>
                <img src={closeSvg.src} alt="remove" />
              </div>
            </div>
          </div>
          <div className={style.bottom}>
            <div className={style.counter}>
              <div
                className={style.minus}
                onClick={handleMinusScu}
                style={quantity === 1 ? { opacity: 0.4 } : {}}>
                <img src={minusSvg.src} alt="" />
              </div>
              <span className={style.count}>{quantity}</span>
              <div className={style.plus} onClick={handlePlusScu}>
                <img src={plusSvg.src} alt="" />
              </div>
            </div>
            <div className={style.price}> {finalPrice} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketProduct;
