import { FC, useEffect } from "react";
import Product from "./product/product";
import Circle from "./circle/Circle";
import Load from "@/components/other/load/load";
import { useRouter } from "next/router";
import { IProductArr } from "@/interfaces/products.interface";

import style from "./products.module.sass";

const Products: FC<{ products: IProductArr; fetching: boolean }> = ({
  products,
  fetching,
}) => {
  const router = useRouter();
  let smallProductCount = 0;
  let bigProductCount = 0;

  let mSmallProductCount = 0;
  let mBigProductCount = 0;

  useEffect(() => {
    smallProductCount = 0;
    bigProductCount = 0;
    mSmallProductCount = 0;
    mBigProductCount = 0;
  }, [router.query.id, products]);

  return (
    <div className={style.wrap}>
      <div className={style.pc}>
        <div className={style.products}>
          {products.length > 0
            ? products.map((item, i) => {
                if (item.id !== "circle") {
                  if (
                    bigProductCount === 0 ||
                    (bigProductCount === 1 && smallProductCount === 5) ||
                    (bigProductCount === 2 && smallProductCount === 6)
                  ) {
                    if (bigProductCount === 2 && smallProductCount === 6) {
                      bigProductCount = 1;
                    } else {
                      bigProductCount++;
                    }
                    smallProductCount = 0;
                    return (
                      <Product
                        item={item}
                        classValue="card_big"
                        key={`${item.id}-${i}`}
                      />
                    );
                  }
                  smallProductCount++;
                  return (
                    <Product
                      item={item}
                      classValue="card"
                      key={`${item.id}-${i}`}
                    />
                  );
                } else {
                  smallProductCount++;
                  return <Circle key={`circle-${i}`} />;
                }
              })
            : "Данных нет"}
        </div>
      </div>

      <div className={style.mobile}>
        <div className={style.products}>
          {products.length > 0
            ? products.map((item, i) => {
                if (item.id !== "circle") {
                  if (
                    mBigProductCount === 0 ||
                    (mBigProductCount === 1 && mSmallProductCount === 4)
                  ) {
                    if (mBigProductCount === 1 && mSmallProductCount === 4) {
                      mBigProductCount = 1;
                      mSmallProductCount = 0;
                    } else {
                      mBigProductCount++;
                    }
                    return (
                      <Product
                        item={item}
                        classValue="card_big"
                        key={`${item.id}-${i}`}
                      />
                    );
                  }
                  mSmallProductCount++;
                  return (
                    <Product
                      item={item}
                      classValue="card"
                      key={`${item.id}-${i}`}
                    />
                  );
                } else {
                  mSmallProductCount = 0;
                  return <Circle key={`circle-${i}`} />;
                }
              })
            : "Данных нет"}
        </div>
      </div>
      {fetching && (
        <div className={style.load}>
          <Load />
        </div>
      )}
    </div>
  );
};

export default Products;
