import { FC, useEffect, useRef, useState } from "react";
import { StyledEngineProvider } from "@mui/material";
import { FilterService } from "@/services/catalog.service";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckboxFilters,
  setDiscountFilter,
  setPrice,
  setReset,
} from "@/redux/catalogSlice/catalogSlice";

import RangeSlider from "../rangeSlider/rangeSlider";

import Filter from "./filter/filter";

import style from "./filters.module.sass";

const Filters: FC<{
  isOpenFiltersMobile?: boolean;
  setIsOpenFiltersMobile?: any;
}> = ({ isOpenFiltersMobile, setIsOpenFiltersMobile }) => {
  const [filters, setFilters] = useState<any>(null);
  const [checkbox, setCheckbox] = useState("null");
  const filtersTag = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const res = FilterService.getFilterItems(router.query.id);
    res.then((res) => setFilters(res));
    document.addEventListener("mouseup", function (e: any) {
      if (filtersTag.current) {
        if (!filtersTag.current.contains(e.target)) {
          setIsOpenFiltersMobile(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setDiscountFilter(checkbox));
  }, [checkbox]);
  const reset = () => {
    dispatch(setDiscountFilter("null"));
    dispatch(setReset(true));
    dispatch(setPrice(null));
    dispatch(setCheckboxFilters({}));
    setCheckbox("null");
    setIsOpenFiltersMobile(false);
  };


  return (
    <aside
      className={
        style.aside + " " + (isOpenFiltersMobile ? style.open : style.close)
      }
      ref={filtersTag}
    >
      <div className={style.line}>
        <div className={style.line_sale}>
          <span>Cо скидкой</span>
          <label className={style.switch}>
            <input
              type="checkbox"
              className={style.input}
              value={checkbox}
              onChange={() =>
                setCheckbox((prev) => (prev === "null" ? "Y" : "null"))
              }
              checked={checkbox !== "null"}
            />
            <span className={`${style.slider} ${style.round}`}></span>
          </label>
        </div>
        {isOpenFiltersMobile && (
          <div className={style.resert} onClick={reset}>
            Cбросить
          </div>
        )}
      </div>

      <div className={`${style.title} ${style.title_grey}`}>Цена</div>

      <StyledEngineProvider injectFirst>
        <RangeSlider />
      </StyledEngineProvider>
      {filters &&
        Object.keys(filters)
          .filter((item) => item[0] === "S")
          .map(
            (item) =>
              filters[item] && (
                <Filter
                  name={filters[item].name}
                  id={item}
                  items={filters[item].items}
                  key={item}
                />
              )
          )}

      <div className={style.close_btn_center}>
        <div
          className={style.close_btn}
          onClick={() => setIsOpenFiltersMobile(false)}
        >
          применить
        </div>
      </div>
    </aside>
  );
};

export default Filters;
