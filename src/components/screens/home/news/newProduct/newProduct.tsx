import { IProduct } from '@/interfaces/products.interface';
import Link from 'next/link';
import { FC } from 'react';
import notPhoto from './../../../../../../public/notphoto.png';
import style from './NewProduct.module.sass';

const NewProduct: FC<any> = ({ item }) => {
  const scu: { price: string }[] = Object.values(item.scu);
  return (
    <Link href={`/product/${item.id}`} className={style.card}>
      <div
        className={style.img + ' img ' + style.img_one}
        style={{
          backgroundImage: item.smallPhoto
            ? `url(https://b.skincareagents.com${item.smallPhoto ? item.smallPhoto : notPhoto.src})`
            : `url(${notPhoto.src})`,
        }}></div>
      <h3 className={style.subtitle}>SKIN&LAB</h3>
      <p className={style.description}>{item.name}</p>
      <div className={style.price}>{item.scu && Object.values(item.scu)[0] && parseFloat(scu[0].price).toString()} ₽</div>
    </Link>
  );
};

export default NewProduct;
