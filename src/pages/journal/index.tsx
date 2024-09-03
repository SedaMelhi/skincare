import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Filter from "@/components/other/filters/filter/filter";
import { JournalService } from "@/services/journal.service";
import { API_DOMAIN, API_URL } from "@/services";
import Load from "@/components/other/load/load";

import style from "./journal.module.sass";

export interface IJournal {
  id: number;
  date: string;
  sort: number;
  name: string;
  description: string;
  picture: string;
  section: { id: number; name: string };
}
export interface IJournalCatList {
  date: string;
  description: string;
  id: string;
  name: string;
  picture: string | null;
}
const Journal: NextPage<{
  data: any;
  mainItem: any;
  categoryList: IJournalCatList[];
}> = ({ data, mainItem, categoryList }) => {
  const [items, setItems] = useState<IJournal[]>(data.items);
  const [main, setMain] = useState<IJournal>(data.items[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [activeCatList, setActiveCatList] = useState<null | string>(null);
  const [count, setCount] = useState(+data.count);
  const getData = async () => {
    const data = await JournalService.getJournal({
      offset: 12 * currentPage,
      limit: 12,
      categoryId: activeCatList || null,
    });

    if (data.items && fetching) {
      setItems([...items, ...data.items]);
      setCurrentPage(currentPage + 1);
      setFetching(false);
    } else if (data.items) {
      setCount(+data.count);
      setItems([...data.items]);
    }
  };
  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [items]);
  useEffect(() => {
    if (activeCatList) getData();
  }, [activeCatList]);
  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        difference &&
      items.length < count
    ) {
      setFetching(true);
    }
  };

  return (
    <Layout title="Журнал">
      <div className="wrap">
        <section className={style.journal}>
          <h1 className={style.journal__title}>Журнал</h1>
          <div className={style.journal__content}>
            <div className={style.journal__img}>
              <img
                src={main.picture ? API_DOMAIN + main.picture : "/notphoto.png"}
                alt="Product image"
              />
            </div>
            <div className={style.journal__textCol}>
              <div className={style.journal__text}>
                <p className={style.date}>{main.date}</p>
                <h2 className={style.journal__subtitle}>{main.name}</h2>
                <p className={style.journal__article}>{main.description}</p>
              </div>
              <Link href={`/article/${main.id}`} className={style.journal__btn}>
                <span className={style.journal__btnText}>Читать</span>
                <img
                  className={style.journal__btnArrow}
                  src="./journal/right-arrow .svg"
                  alt="Right arrow icon"
                />
              </Link>
            </div>
          </div>
        </section>
        <section className={style.categories}>
          {/* {
             <Filter name={filters[item].name} items={filters[item].items} key={item} />
          } */}
          <div className={style.categories__leftCol}>
            <h2 className={style.categories__title}>Категории</h2>
            <div className={style.dropdownHolder}>
              <ul className={style.dropdown}>
                {categoryList.map(({ id, name }) => (
                  <li
                    className={
                      style.dropdown__item +
                      " " +
                      (id === activeCatList ? style.dropdown__item_active : "")
                    }
                    onClick={() => {
                      setActiveCatList(id);
                      setCurrentPage(0);
                    }}
                    key={id}
                  >
                    <div
                      className={
                        style.dropdown__link +
                        " " +
                        (id === activeCatList
                          ? style.dropdown__item_active
                          : "")
                      }
                    >
                      {name}
                    </div>
                  </li>
                ))}
              </ul>
              <img
                className={style.dropdown__img}
                src="./journal/up-arrow.svg"
                alt="Up arrow ucon"
              />
            </div>
          </div>
          <div className={style.items}>
            <div className={style.articleColumns}>
              {items.map(
                ({ id, date, name, description, picture, section }, i) =>
                  (i + 1) % 4 !== 0 ? (
                    <Link
                      href={`/article/${id}`}
                      className={style.articleColumn}
                      key={id}
                    >
                      <div
                        className={
                          style.articleColumn__img +
                          " " +
                          (i % 4 === 0
                            ? ""
                            : i % 4 === 1
                            ? style.articleColumn__img_second
                            : style.articleColumn__img_third)
                        }
                        style={
                          picture
                            ? {
                                backgroundImage: `url(${
                                  "https://b.skincareagents.com/" + picture
                                })`,
                              }
                            : {}
                        }
                      ></div>
                      <p className={style.category}>{section.name}</p>
                      <h3 className={style.articleColumn__title}>{name}</h3>
                    </Link>
                  ) : (
                    <Link
                      href={`/article/${id}`}
                      className={style.article2}
                      key={id}
                    >
                      <div className={style.article2__imgCol}>
                        <img
                          src={
                            picture
                              ? "https://b.skincareagents.com/" + picture
                              : "/notphoto.png"
                          }
                          alt="Image"
                          className={style.article2__img}
                        />
                      </div>
                      <div className={style.article2__textCol}>
                        <p className={style.category}>{section.name}</p>
                        <h2 className={style.article2__title}>{name}</h2>
                        <p className={style.article2__paragraph}>
                          {description}
                        </p>
                      </div>
                    </Link>
                  )
              )}
            </div>
            {fetching && (
              <div className={style.load}>
                <Load />
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await JournalService.getJournal({
    offset: 0,
    limit: 12,
    categoryId: null,
  });
  const categoryList = await JournalService.getCategoryList();
  const mainItem = await JournalService.getMainItem();
  return {
    props: { data, mainItem, categoryList },
  };
};

export default Journal;
