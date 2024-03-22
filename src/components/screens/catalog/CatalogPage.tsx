import { FC, useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/other/breadcrumbs/breadcrumbs';
import CountProducts from '@/components/other/countProducts/countProducts';
import Filters from '@/components/other/filters/filters';
import Sort from '@/components/other/sort/sort';
import Products from '@/components/other/products/products';

import { IProductArr } from '@/interfaces/products.interface';

import filtersSvg from './../../../../public/catalog/filters.svg';
import { useSelector } from 'react-redux';
import { CatalogMenu } from '@/components/layout/header/dropDownMenu/interface';

import style from './catalog.module.sass';
import { useRouter } from 'next/router';

const CatalogPage: FC<{ products: IProductArr; count: number }> = ({ products, count }) => {
  const [name, setName] = useState<string>('');
  const catalog = useSelector((state: CatalogMenu) => state.menu.menu);

  const router = useRouter();
  useEffect(() => {
    setName(catalog ? catalog.filter(({ ID }) => ID == router.query.id)[0]?.NAME : '');
  }, [catalog, router, products]);

  return (
    <Layout title="Каталог">
      <div className={`wrap ${style.catalog}`}>
        <div className={style.top__wrap}>
          <div className={style.empty}></div>
          <div>
            <div className={style.top}>
              <div className={style.flex}>
                <Breadcrumbs
                  arr={[
                    { text: 'Каталог', link: 'catalog' },
                    { text: name, link: 'catalog/1' },
                  ]}
                />
                <CountProducts count={count} />
              </div>
            </div>
            <div className={style.top}>
              <div className={`${style.flex}`}>
                <h2 className={style.title}>{name}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={style.params}>
          <div className={style.filter_wrap}>
            <span className={style.text}>фильтры</span>
            <img src={filtersSvg.src} alt="" />
          </div>
          <div className={style.sort}>
            <Sort />
          </div>
        </div>
        <div className={style.wrap}>
          <Filters />
          {products.length > 0 && <Products products={products} />}
        </div>
      </div>
    </Layout>
  );
};
export default CatalogPage;
