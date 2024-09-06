import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FilterService } from "@/services/catalog.service";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setPrice, setReset } from "@/redux/catalogSlice/catalogSlice";
import style from "./rangeSlider.module.sass";

const RangeSlider = () => {
  const price = useSelector((state: any) => state.catalog.price);
  const reset = useSelector((state: any) => state.catalog.reset);
  const checkboxFilters = useSelector(
    (state: any) => state.catalog.checkboxFilters
  );
  const discountFilter = useSelector(
    (state: any) => state.catalog.discountFilter
  );
  const [initialPrice, setInitialPrice] = React.useState<number[]>([0, 23000]);
  const [changePrice, setChangelPrice] = React.useState<number[]>([0, 23000]);
  const dispatch = useDispatch();
  const router = useRouter();

  const getInitialPrice = async (id: any) => {
    dispatch(setReset(false));
    if (id) {
      const data = await FilterService.getData({
        id: id,
        discount: discountFilter,
        sort: "priceASC",
        filters: checkboxFilters,
        offset: 0,
        limit: 5000,
      });
      let min = 0;
      let max = 0;
      for (let item of data.items) {
        if (item.minPrice !== null) {
          min = item.minPrice;
          break;
        }
      }
      for (let item of data.items.reverse()) {
        if (item.minPrice !== null) {
          max = item.minPrice;
          break;
        }
      }
      setInitialPrice([min, max]);
      setChangelPrice([min, max]);
    } else {
      setInitialPrice([0, 23000]);
      setChangelPrice([0, 23000]);
    }
  };
  React.useEffect(() => {
    getInitialPrice(router.query.id);
    dispatch(setPrice(null));
  }, [router]);
  React.useEffect(() => {
    if (reset) {
      getInitialPrice(router.query.id);
    }
  }, [reset]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setChangelPrice(newValue as number[]);
  };

  return (
    <div>
      <div className={style.line}>
        <span>От {changePrice[0]}₽</span>
        <span>до {changePrice[1]}₽</span>
      </div>
      <Box sx={{ width: 278 }} className={style.slider}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={changePrice}
          onChange={handleChange}
          min={initialPrice[0]}
          max={initialPrice[1]}
          onChangeCommitted={() =>
            dispatch(setPrice([changePrice[0], changePrice[1]]))
          }
          step={100}
          classes={{
            track: style.track, //активная линия
            thumb: style.thumb, //точки
            rail: style.rail,
            root: style.root,
          }}
        />
      </Box>
    </div>
  );
};
export default RangeSlider;
