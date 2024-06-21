import { Dispatch, FC, SetStateAction } from 'react';
import style from './catalog.module.sass';

interface CatalogProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Catalog: FC<CatalogProps> = ({ menuOpen, setMenuOpen }) => {
  return (
    <div onClick={() => setMenuOpen(!menuOpen)} className={style.catalog}>
      <div className={style.hamburger + ' ' + (menuOpen ? style.open : style.close)}>
        <div className={style.line}></div>
        <div className={style.line}></div>
        <div className={style.line}></div>
      </div>
      <div className={style.catalog__text}>каталог</div>
    </div>
  );
};
export default Catalog;
