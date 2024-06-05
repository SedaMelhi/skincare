import { Dispatch, FC, SetStateAction } from 'react';

import Address from '@/components/other/address/address';
import DeliveryDate from '@/components/other/deliveryDate/deliveryDate';
import SmallProducts from '@/components/other/smallProducts/smallProducts';

import image from './../../../../../../public/about/1.png';

import style from './accordionHeader.module.sass';

interface AccordionHeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  type: string;
  products: { id: number; image: string }[];
}

const AccordionHeader: FC<AccordionHeaderProps> = ({ isOpen, setIsOpen, type, products }) => {
  return (
    <div className={style.flex}>
      {type === 'purchases' && (
        <div className={isOpen ? style.left_flex : style.left}>
          <div className={style.address}>
            <Address
              link="https://maps.app. goo.gl/9f6feVpgEker5Rh87"
              text="г. Грозный, проспект Мухаммеда Али, д 2А"
            />
          </div>
          <DeliveryDate text="с 16 по 18 июля включительно" />
        </div>
      )}
      <div className={isOpen ? style.right_hidden : style.right}>
        <SmallProducts
          products={products}
          setIsOpen={setIsOpen}
          size={type === 'history' ? 'big' : 'small'}
        />
      </div>
    </div>
  );
};

export default AccordionHeader;
