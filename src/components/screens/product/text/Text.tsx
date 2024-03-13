import { FC, useEffect, useState } from 'react';

import { IProduct, IScu } from '@/interfaces/products.interface';
import { addSCUToCartService, getCartService } from '@/services/cart.service';

import ArrowIcon from './../arrowIcon/arrowIcon';
import actionSvg1 from './../../../../../public/action1.svg';
import actionSvg2 from './../../../../../public/action2.svg';
import actionSvg3 from './../../../../../public/action3.svg';
import infoSvg from './../../../../../public/info.svg';
import saveSvg from './../../../../../public/save.svg';
import checkSvg from './../../../../../public/check.svg';

import style from './text.module.sass';
import { setIsAddNewItem, setReduxBasketArr } from '@/redux/basketSlice/basketSlice';
import { useDispatch } from 'react-redux';

const Text: FC<{ product: IProduct; scu: IScu[] | null; setActiveScu: any; activeScu: any }> = ({
  product,
  scu,
  setActiveScu,
  activeScu,
}) => {
  const sizes: string[] = [];
  const [colors, setColors] = useState<{ name: string; image: string; id: string }[]>([]);
  const icons = [actionSvg1.src, actionSvg2.src, actionSvg3.src];
  const [btnText, setBtnText] = useState('Добавить в сумочку');
  const dispatch = useDispatch();
  scu?.forEach((item) => {
    !sizes.includes(item.value) && sizes.push(item.value);
  });

  const [activeSize, setActiveSize] = useState(sizes[0]);

  scu?.forEach((item) => {
    item.shade &&
      !colors.some(({ id }) => id === item.shade?.ID) &&
      item.value === activeSize &&
      setColors([
        ...colors,
        {
          name:
            item.shade.NAME.length > 30
              ? item.shade.NAME.substring(0, 30) + '...'
              : item.shade.NAME,
          image: item.shade.PREVIEW_PICTURE,
          id: item.shade.ID,
        },
      ]);
  });

  const [activeColor, setActiveColor] = useState<string>(colors[0] ? colors[0].id : '0');

  useEffect(() => {
    const newColors: { name: string; image: string; id: string }[] = [];
    setActiveScu(
      scu?.filter(
        ({ value, shade }) =>
          value === activeSize && (colors.length > 0 ? shade?.ID === activeColor : true),
      )[0],
    );
    scu?.forEach((item) => {
      item.shade &&
        !colors.some(({ id }) => id === item.shade?.ID) &&
        item.value === activeSize &&
        newColors.push({
          name:
            item.shade.NAME.length > 30
              ? item.shade.NAME.substring(0, 30) + '...'
              : item.shade.NAME,
          image: item.shade.PREVIEW_PICTURE,
          id: item.shade.ID,
        });
    });
    setColors(newColors);
  }, [activeSize]);

  useEffect(() => {
    if (colors.length > 0) {
      setActiveColor((prev) => colors.filter(({ id }) => id === prev)[0]?.id || colors[0].id);
    }

    setActiveScu(
      scu?.filter(
        ({ value, shade }) =>
          value === activeSize && (colors.length > 0 ? shade?.ID === activeColor : true),
      )[0],
    );
  }, [colors]);

  useEffect(() => {
    setActiveScu(
      scu?.filter(
        ({ value, shade }) =>
          value === activeSize && (colors.length > 0 ? shade?.ID === activeColor : true),
      )[0],
    );
  }, [activeColor]);

  const addProductInCart = async () => {
    if (localStorage.getItem('saleUserId')) {
      const data = await addSCUToCartService.addSCUToCart(activeScu.id, 1);

      if (data.status === 'ok') {
        setBtnText('добавлен');
        const dataArr = getCartService.getCart();

        dataArr.then((res) => {
          dispatch(setReduxBasketArr(Object.values(res.cartItems)));
          dispatch(setIsAddNewItem(true));
        });
      }
    }
  };

  return (
    <div className={style.text}>
      <h2 className={style.title}>{product.name}</h2>
      <div className={style.actions}>
        {product.props &&
          product.props['44'] &&
          product.props['44'].value &&
          product.props['44'].value.map((name: String, i: number) => (
            <div className={style.action} key={i}>
              <img src={icons[i % 3]} alt="" className={style.svg} />
              <span>{name}</span>
            </div>
          ))}
      </div>
      {product.preDescription && (
        <div
          className={style.description}
          dangerouslySetInnerHTML={{ __html: String(product.preDescription) }}></div>
      )}

      <div className={style.colors}>
        {colors.map(({ name, image, id }) => (
          <div className={style.color} key={id} onClick={() => setActiveColor(id)}>
            <div className={style.color__name}>
              <img src={'/Union.svg'} alt="" />
              <span>{name}</span>
            </div>
            <div className={style.color__border + ' ' + (activeColor === id ? style.active : '')}>
              <div
                className={style.color__image}
                style={
                  image
                    ? {
                        background: `url(https://b.skincareagents.com/${image})`,
                      }
                    : {}
                }></div>
            </div>
          </div>
        ))}
      </div>
      {sizes && sizes.length > 0 && (
        <>
          <div className={style.subtitle}>Объеm</div>
          <div className={style.sizes}>
            {sizes.map((item, i) => (
              <div
                className={style.size + ' ' + (activeSize === item ? style.active : '')}
                key={i}
                onClick={() => setActiveSize(item)}>
                {item}
              </div>
            ))}
          </div>
        </>
      )}

      <div className={style.old__price}>
        {activeScu && activeScu.price && activeScu.price.discount ? (
          <div className={style.oldPrice}>
            <div>{activeScu.price.basePrice + ' ₽'}</div>
            {/* <div>
            <img src={infoSvg.src} alt="" />
          </div> */}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={style.price}>
        {activeScu && activeScu.price && activeScu.price.discountPrice
          ? activeScu.price.discountPrice + ' ₽'
          : 'цена не указана'}
      </div>
      <div className={style.btns}>
        <button className={style.btn} onClick={addProductInCart}>
          {btnText} {btnText === 'добавлен' ? <img src={checkSvg.src} alt="" /> : ''}
        </button>
        <img src={saveSvg.src} alt="" className={style.save} />
      </div>

      {/* <div className={style.select__wrap}>
        <div className={style.textGrey}>
          <span>Москва </span>
          <ArrowIcon />
        </div>
      </div>
      <div className={style.date}>В пункты выдачи 3 дня</div>
      <div className={style.more}>Подробнее о доставке</div> */}
    </div>
  );
};
export default Text;
