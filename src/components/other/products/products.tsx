import infoSvg from './../../../../public/info.svg';

import { FC } from 'react';

import style from './products.module.sass';
import Link from 'next/link';

const Products: FC = () => {
  return (
    <div className={style.products}>
      <Link href="/product/1" className={style.cart_big}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
          <div className={style.old}>2 234 ₽</div>
          <div className={style.info}>
            <img src={infoSvg.src} alt="" />
          </div>
        </div>
      </Link>
      <Link href="/product/2" className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </Link>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
      <div className={style.cart_big}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
          <div className={style.old}>2 234 ₽</div>
          <div className={style.info}>
            <img src={infoSvg.src} alt="" />
          </div>
        </div>
      </div>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
      <div className={style.cart}>
        <div className={style.image}></div>
        <div className={style.name}>SKIN&LAB Porebarrier Clear Pad очищающие пэды</div>
        <div className={style.size}>20 мл</div>
        <div className={style.price}>
          <div className={style.new}>2 234 ₽</div>
        </div>
      </div>
    </div>
  );
};

export default Products;
