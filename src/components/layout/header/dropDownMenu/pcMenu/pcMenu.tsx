import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import { IBrands } from "../dropDownMenu";
import { CatalogItems } from "../interface";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setCheckboxFilters,
  setDiscountFilter,
  setPrice,
  setSort,
} from "@/redux/catalogSlice/catalogSlice";

import arrow from "./../../../../../../public/arr.svg";

import style from "./../dropDownMenu.module.sass";

interface PCMenuProps {
  items: CatalogItems;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  brands: IBrands;
  brandsCount: number;
}

const PCMenu: FC<PCMenuProps> = ({
  items,
  setMenuOpen,
  brands,
  brandsCount,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBrandClick = (id: string, name: string) => {
    reset();
    router.push("/catalog?brandId=" + id + "&brandName=" + name);
  };
  const reset = () => {
    setMenuOpen((prev) => !prev);
    dispatch(setCheckboxFilters({}));
    dispatch(setPrice(null));
    dispatch(setSort(""));
    dispatch(setDiscountFilter("null"));
  };
  return (
    <div>
      {
        <div className={style.item__wrap}>
          <Link
            href={"/catalog/?all=true"}
            className={style.item}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Все
          </Link>
          <div
            className={style.item}
            onClick={() => {
              reset();
            }}
          >
            Бренды
            <img className={style.arrow} src={arrow.src} />
          </div>
          {brandsCount >= 1 && (
            <div className={style.categories + " " + style.brands}>
              {Object.keys(brands).map((key) => (
                <div className={style.brands__column} key={key}>
                  <div className={style.brands__letter}>
                    <span className={style.brands__letter_upper}>{key}</span>
                    <span className={style.brands__letter_lower}>{key}</span>
                  </div>

                  {brands[key].map(({ id, name }) => (
                    <div className={style.brands__item} key={id}>
                      <div onClick={() => handleBrandClick(id, name)}>
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      }
      {items.map(({ ID, NAME, SUBCATEGORIES }): any => (
        <div className={style.item__wrap} key={ID}>
          <Link
            href={"/catalog/" + ID}
            className={style.item}
            onClick={() => {
              reset();
            }}
          >
            {NAME}
            {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
              <img className={style.arrow} src={arrow.src} />
            )}
          </Link>
          {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
            <div className={style.categories}>
              {SUBCATEGORIES.map(({ ID, NAME, SUBCATEGORIES }) => (
                <div className={style.subitem} key={ID}>
                  <Link
                    href={"/catalog/" + ID}
                    onClick={() => {
                      reset();
                    }}
                  >
                    {NAME}
                    {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
                      <img className={style.arrow} src={arrow.src} />
                    )}
                  </Link>
                  {SUBCATEGORIES && SUBCATEGORIES.length >= 1 && (
                    <div className={style.subcategories}>
                      {SUBCATEGORIES.map(({ ID, NAME }) => (
                        <div className={style.subcategories__item} key={ID}>
                          <Link
                            href={"/catalog/" + ID}
                            className={style.item}
                            onClick={() => {
                              reset();
                            }}
                          >
                            {NAME}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PCMenu;
