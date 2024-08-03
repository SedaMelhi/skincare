import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CatalogMenu } from '@/components/layout/header/dropDownMenu/interface';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/other/breadcrumbs/breadcrumbs';
import CountProducts from '@/components/other/countProducts/countProducts';
import Filters from '@/components/other/filters/filters';
import Sort from '@/components/other/sort/sort';
import Products from '@/components/other/products/products';
import Load from '@/components/other/load/load';

import { IProductArr } from '@/interfaces/products.interface';

import filtersSvg from './../../../../public/catalog/filters.svg';

import style from './catalog.module.sass';

const CatalogPage: FC<{
  products: IProductArr;
  count: number;
  fetching: boolean;
  value?: string;
  brand?: string;
  all?: boolean;
}> = ({ products, count, fetching, value, brand }) => {
  const [name, setName] = useState<string>('');
  const catalog = useSelector((state: CatalogMenu) => state.menu.menu);
  const router = useRouter();

  useEffect(() => {
    if (router.query.brandId) {
      setName(router.query.brandName + '')
    } else {
      setName(catalog ? catalog.filter(({ ID }) => ID == router.query.id)[0]?.NAME || 'все' : '');
    }

  }, [catalog, router, products]);

  return (
    <Layout title="Каталог">
      <div className={`wrap ${style.catalog}`}>
        <div className={style.top__wrap}>
          <div className={style.empty}></div>
          <div className={style.width}>
            <div className={style.top}>
              <div className={style.flex}>
                {value ? (
                  <div className={style.subtitle}>Поиск по запросу</div>
                ) : brand ? (
                  <Breadcrumbs
                    arr={[
                      { text: 'Каталог', link: '/catalog' },
                      { text: 'Бренды', link: '/catalog' },
                      { text: brand, link: '' },
                    ]}
                  />
                ) : (
                  <Breadcrumbs
                    arr={[
                      { text: 'Каталог', link: '/catalog' },
                      { text: name, link: '/' },
                    ]}
                  />
                )}
                <CountProducts count={count} />
              </div>
            </div>
            <div className={style.top}>
              <div className={`${style.flex}`}>
                <h2 className={style.title}>{value ? value : brand ? brand : name}</h2>
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
          <div className={style.products}>
            {products && products.length > 0 && <Products products={products} fetching={fetching} />}
            {
              fetching && <div className={style.load}>
                <Load />
              </div>
            }
          </div>

        </div>
      </div>
    </Layout>
  );
};
export default CatalogPage;
