import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { debounce } from "@mui/material";

import Input from "@/components/other/input/input";

import style from "./../courierContent/courierContent.module.sass";

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
  disabled?: boolean;
  error?: string;
  setError: Dispatch<SetStateAction<string>>;
}

const Select: FC<IProps> = ({
  value,
  setValue,
  getData,
  placeholder,
  disabled,
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [list, setList] = useState<{ id: number; name: string }[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => getData(setList), [value]);

  return (
    <div className={style.selectBlock}>
      <Input
        error={error}
        placeholder={placeholder}
        value={value.name}
        type="text"
        isNecessary={true}
        onBlur={() => {
          if (!value.id) setError(true);
          else setError(false);
          setTimeout(() => {
            setListOpen(false);
          }, 200);
        }}
        onClick={(e: any) => {
          setListOpen(true);
        }}
        onChange={(e) => {
          if (value.id) setError(false);

          setValue({ id: false, name: e.target.value });
          setListOpen(true);
        }}
        disabled={disabled}
      />
      {error && <div className={style.err}>выберите значение из списка</div>}
      {list && list.length > 0 && (
        <div
          className={
            style.select__wrap +
            " " +
            (listOpen && value.name !== ""
              ? style.select__wrap_open
              : style.select__wrap_close)
          }
        >
          <div className={style.select__scroll}>
            {list.map(({ id, name }) => (
              <div
                className={style.select}
                key={id}
                onClick={() => {
                  setValue({ id, name: name });
                  setListOpen(false);
                  setError(false);
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
