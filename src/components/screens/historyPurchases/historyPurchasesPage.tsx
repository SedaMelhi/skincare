import { FC, useEffect, useState } from "react";
import PurchasesWindow from "./../purchases/accordion/accordion";
import style from "./historyPurchases.module.sass";
import { orderListService } from "@/services/profile.service";
import { IOrderItem } from "@/interfaces/profile.interface";

const HistoryPurchasesPage: FC = () => {
  const [data, setData] = useState<IOrderItem[] | null>(null);

  useEffect(() => {
    orderListService.getOrderList(true).then((res) => {
      if (res) {
        setData(Object.values(res));
      }
    });
  }, []);

  return (
    <>
      {data &&
        data.map((item) => (
          <div className={style.window} key={item.id}>
            <PurchasesWindow
              title={item.name}
              price={item.price}
              allPrice={item.allPrice}
              products={Object.values(item.items)}
              deliveryPrice={item.deliveryPrice}
              date={item.dateDelivery}
              type="history"
            />
          </div>
        ))}

      {/* <div className={style.window}>
              <PurchasesWindow
                title="заказ #3124"
                price={2500}
                date="12 июля 2023"
                type="history"
              />
            </div> */}
    </>
  );
};

export default HistoryPurchasesPage;
