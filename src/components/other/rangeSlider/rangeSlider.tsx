import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FilterService } from '@/services/catalog.service';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPrice } from '@/redux/catalogSlice/catalogSlice';
import style from './rangeSlider.module.sass';


const RangeSlider = () => {
  const price = useSelector((state: any) => state.catalog.price);
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);
  const discountFilter = useSelector((state: any) => state.catalog.discountFilter);
  const [initialPrice, setInitialPrice] = React.useState<number[]>([0, 50000]);
  const [changePrice, setChangelPrice] = React.useState<number[]>([0, 50000]);
  const dispatch = useDispatch()
  const router = useRouter()
  React.useEffect(() => {
    console.log('range');

    if (router.query.id) {
      const data = FilterService.getData({ id: router.query.id, discount: discountFilter, sort: 'priceASC', filters: checkboxFilters, offset: 0, limit: 1000000 })
      data.then(res => {
        let min = 0
        let max = 0
        for (let item of res.items) {
          if (item.minPrice !== null) {
            min = item.minPrice
            break
          }
        }
        for (let item of res.items.reverse()) {
          if (item.minPrice !== null) {
            max = item.minPrice
            break
          }
        }
        setInitialPrice([min, max])
        setChangelPrice([min, max])
      })
    } else {
      setInitialPrice([0, 50000])
      setChangelPrice([0, 50000])
    }

  }, [router])
  React.useEffect(() => {
    dispatch(setPrice(null))
  }, [router])
  const handleChange = (event: Event, newValue: number | number[]) => {
    setChangelPrice(newValue as number[])
  };



  return (
    <div>
      <div className={style.line}>
        <span>От {changePrice[0]}₽</span>
        <span>до {changePrice[1]}₽</span>
      </div>
      <Box sx={{ width: 278 }} className={style.slider}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={changePrice}
          onChange={handleChange}
          min={initialPrice[0]}
          max={initialPrice[1]}
          onChangeCommitted={() => dispatch(setPrice([changePrice[0], changePrice[1]]))}
          step={100}
          classes={{
            track: style.track, //активная линия
            thumb: style.thumb, //точки
            rail: style.rail,
          }}
        />
      </Box>
    </div>
  );
}
export default RangeSlider