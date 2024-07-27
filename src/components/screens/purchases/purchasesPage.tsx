import { FC, useEffect, useState } from "react";
import { orderListService } from "@/services/profile.service";
import { IOrderItem } from "@/interfaces/profile.interface";
import PurchasesWindow from "./accordion/accordion";
import style from "./purchases.module.sass";

const PurchasesPage: FC = () => {
  const [data, setData] = useState<IOrderItem[] | null>(null);

  useEffect(() => {
    orderListService.getOrderList(false).then((res) => {
      if (res) {
        setData(Object.values(res));
      }
    });
  }, []);
  console.log(data);

  return (
    <>
      {data &&
        data.map(
          ({
            id,
            status,
            name,
            allPrice,
            items,
            price,
            deliveryPrice,
            address,
            dateDelivery,
          }) => (
            <div className={style.window} key={id}>
              <PurchasesWindow
                title={name}
                price={price}
                address={address}
                dateDelivery={dateDelivery}
                allPrice={allPrice}
                products={Object.values(items)}
                deliveryPrice={deliveryPrice}
                status={
                  status === "Оплачен"
                    ? "paid"
                    : status === "Доставлен"
                    ? "delivered"
                    : "waiting"
                }
                type="purchases"
              />
            </div>
          )
        )}
    </>
  );
};

export default PurchasesPage;
