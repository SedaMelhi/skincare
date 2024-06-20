import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/other/breadcrumbs/breadcrumbs';
import Slider from './slider/slider';
import TabPanel from './tabPanel/tabPanel';
import Text from './text/Text';
import HitsSwiper from '@/components/screens/home/hits/hitsSwiper/hitsSwiper';
import { CatalogService } from '@/services/catalog.service';
import { IProduct, IScu } from '@/interfaces/products.interface';

import askSvg from './../../../../public/ask.svg';

import style from './product.module.sass';

const ProductPage: FC<{ data: IProduct }> = ({ data }) => {
  const hits = useSelector((state: any) => state.hits.hits);
  const [product, setProduct] = useState(data ? Object.values(data)[0] : []);
  const [images, setImages] = useState<string[]>([]);
  const scu: IScu[] | null = product.scu ? Object.values(product.scu) : null;
  const router = useRouter();

  const [activeScu, setActiveScu] = useState<IScu | null>(null);

  useEffect(() => {
    let temp: string[] = [];
    if (product) {
      if (activeScu) {
        activeScu.photos && activeScu.photos.length > 0 && temp.push(...activeScu.photos);
      }
      temp = temp.filter((item) => item !== null);
      if (temp.length === 0) {
        product.addPhotos && temp.push(...product.addPhotos);
        product.detailPhoto && temp.push(product.detailPhoto);
      }
    }
    temp = temp.filter((item) => item !== null);
    setImages(temp);
  }, [activeScu]);

  // useEffect(() => {
  //   if (product.id !== id) {
  //     const answer = CatalogService.getCatalog({
  //       type: 'getItem',
  //       itemId: id,
  //     });
  //     answer.then((res) => setProduct(Object.values(res)[0]));
  //   }
  // }, [id]);

  return (
    <Layout title={product.name}>
      <div className={`wrap ${style.wrap}`}>
        <Breadcrumbs
          arr={[
            { text: 'Каталог', link: '/catalog/' + product.sectionCode },
            { text: 'Волосы', link: '/catalog/' + product.sectionCode },
            { text: product.name, link: '/product/' + product.id },
          ]}
        />
        <section className={style.product}>
          <Slider detailPhoto={images} />
          <Text product={product} scu={scu} setActiveScu={setActiveScu} activeScu={activeScu} />
        </section>
        <div className={style.quenstion__wrap}>
          <div className={style.quenstion}>
            <div className={style.textGrey}>
              <span>Есть вопрос?</span>
            </div>
            <div className={style.textGrey}>бесплатная консультация</div>
          </div>
          <div className={style.ask}>
            <img src={askSvg.src} alt="" />
          </div>
        </div>
        <TabPanel product={product} />
      </div>
      <div className={style.recommendation}>
        <div className={style.recommendation__title}>Bам может понравиться</div>
        <HitsSwiper slidesPerView={4} />
      </div>
    </Layout>
  );
};
export default ProductPage;
