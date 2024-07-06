import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import Layout from "@/components/layout/Layout";

import leftArrowSvg from "./../../../public/journal/left-arrow.svg";
import greyStarSvg from "./../../../public/journal/grey-star.svg";

import style from "./article.module.sass";
import HitsSwiper from "@/components/screens/home/hits/hitsSwiper/hitsSwiper";
import { JournalService } from "@/services/journal.service";
import { API_DOMAIN } from "@/services";
import { CardService } from "@/services/catalog.service";
import ProductPage from "@/components/screens/product/ProductPage";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "@/components/other/cardProduct/cardProduct";
import { Navigation } from "swiper/modules";

const Journal: NextPage<{ data: any; products: any }> = ({
  data,
  products,
}) => {
  return (
    <Layout title="Статья">
      <section className={style.articles}>
        <div className={style.articles__leftCol}>
          <Link href="/journal" className={style.articles__back}>
            <img src={leftArrowSvg.src} alt="Left arrow icon" />
            <span>Журнал</span>
          </Link>
          <h2 className={style.articles__title}>{data.name}</h2>
          <div className={style.articles__categoryHolder}>
            <img src={greyStarSvg.src} alt="Grey star icon" />
            <span>образ жизни</span>
          </div>
        </div>
        <div className={style.articles__rightCol}>
          <div
            className={style.articles__img}
            style={
              data.picture
                ? { backgroundImage: `url(${API_DOMAIN + data.picture})` }
                : {}
            }
          ></div>
          <p className={style.articles__author}>
            Автор: {data.author ? data.author : "эндокринолог"}
          </p>
          <p className={style.date}>{data.date.split(".").join("/")}</p>
          <div
            className={style.articles__text}
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
          <h2 className={style.articles__mentionedProducts}>
            упомянутые в статье
          </h2>
          <div className={style.swiper__wrap}>
            <div className={style.swiper}>
              <Swiper
                slidesPerView={3}
                slidesPerGroup={3}
                slideNextClass={style.nextSlide}
                slidePrevClass={style.prevSlide}
                slideActiveClass={style.activeSlide}
                spaceBetween={20}
                modules={[Navigation]}
                navigation={{
                  nextEl: ".next",
                  prevEl: ".prev",
                  enabled: true,
                }}
                breakpoints={{
                  1200: {
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  550: {
                    slidesPerView: 2.3,
                    slidesPerGroup: 2,
                  },
                  0: {
                    slidesPerView: 1.6,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                  },
                }}
              >
                {products.map(
                  ({
                    id,
                    name,
                    smallPhoto,
                    sectionCode,
                    sectionName,
                    pin,
                    scu,
                  }: any) => (
                    <SwiperSlide key={id}>
                      <CardProduct
                        available={true}
                        id={id}
                        name={name}
                        smallPhoto={smallPhoto}
                        sectionCode={sectionCode}
                        sectionName={sectionName}
                        pin={pin}
                        scu={scu}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await JournalService.getDetail({
    id: context.params && context.params.id,
  });

  let products = [];
  if (data.scu && Array.isArray(data.scu)) {
    products = await Promise.all(
      data.scu.map((item: any) =>
        CardService.getCard({
          type: "getItem",
          itemId: item,
        })
      )
    );
  }

  products = products.flatMap((productGroup) =>
    Object.values(productGroup).filter((product: any) => product.id !== null)
  );
  // Преобразование price.basePrice в строку
  const transformPriceToString = (products: any[]) => {
    return products.map((product) => {
      const newScu: any = {};
      for (const key in product.scu) {
        if (
          product.scu[key] &&
          product.scu[key].price &&
          typeof product.scu[key].price.basePrice === "number"
        ) {
          newScu[key] = {
            ...product.scu[key],
            price: product.scu[key].price.basePrice.toString(), // Преобразуем basePrice в строку
          };
        } else {
          newScu[key] = product.scu[key];
        }
      }
      return {
        ...product,
        scu: newScu,
      };
    });
  };
  products = transformPriceToString(products);

  return {
    props: { data, products },
  };
};

export default Journal;
