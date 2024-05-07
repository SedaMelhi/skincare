import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { debounce } from '@mui/material';

import Input from '@/components/other/input/input';

import style from './../courierContent/courierContent.module.sass';

interface IProps {
  value: { id: false | number; name: string };
  setValue: Dispatch<
    SetStateAction<{
      id: false | number;
      name: string;
    }>
  >;
  getData: any;
  placeholder: string;
}

const Select: FC<IProps> = ({ value, setValue, getData, placeholder }) => {
  const [listOpen, setListOpen] = useState(false);
  const [list, setList] = useState<{ id: number; name: string }[] | null>(null);
  useEffect(() => getData(setList), [value]);

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={value.name}
        type="text"
        isNecessary={true}
        onBlur={() =>
          setTimeout(() => {
            setListOpen(false);
          }, 200)
        }
        onChange={(e) => {
          setValue({ id: false, name: e.target.value });
          setListOpen(true);
        }}
      />
      <div
        className={
          style.select__wrap +
          ' ' +
          (listOpen && value.name !== '' ? style.select__wrap_open : style.select__wrap_close)
        }>
        {list &&
          list.map(({ id, name }) => (
            <div
              className={style.select}
              key={id}
              onClick={() => {
                setValue({ id, name });
                setListOpen(false);
              }}>
              {name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Select;
