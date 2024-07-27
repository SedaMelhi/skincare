import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { setIsNotifications } from "@/redux/basketSlice/basketSlice";
import closeSvg from "./../../../../public/close.svg";
import notificationsSvg from "./../../../../public/notifications.svg";
import style from "./notifications.module.sass";
import useSWR from "swr";
import { getNotificationsService } from "@/services/notification.service";
import { NotificationType, NotificationTypesEnum } from "./types";
import AddPoints from "./notification/addPoints";
import ExpirationPoints from "./notification/expirationPoints";
import Product from "./notification/product";
import Order from "./notification/order";
import Delivery from "./notification/delivery";

interface RootNotifications {
  basket: {
    isNotifications: boolean;
  };
}

const Notifications: FC = () => {
  const isNotifications = useSelector(
    (state: RootNotifications) => state.basket.isNotifications
  );
  const dispatch = useDispatch();

  const getData = async () => {
    const token = localStorage.getItem("token")!;
    const data = await getNotificationsService.getNotifications(token);
    return Object.values(data) as NotificationType[];
  };

  const { data, isLoading } = useSWR("profile-notifications", getData);

  const closeBasket = () => {
    dispatch(setIsNotifications(false));
  };

  if (!data || isLoading) {
    return <></>;
  }

  return (
    <CSSTransition
      in={isNotifications}
      timeout={400}
      classNames={{
        enter: style.slideEnter,
        enterActive: style.slideEnterActive,
        exit: style.slideExit,
        exitActive: style.slideExitActive,
      }}
      unmountOnExit
    >
      <div>
        <div className={style.basket__wrap}>
          <div className={style.empty} onClick={closeBasket}></div>
          <div className={style.basket}>
            <div className={style.padding}>
              <div className={style.header}>
                <div className={style.close}>
                  <img src={closeSvg.src} alt="" onClick={closeBasket} />
                </div>
                <div className={style.bag}>
                  <img src={notificationsSvg.src} alt="" />
                  <div className={style.bag__text}>
                    уведомления <span>({data.length})</span>
                  </div>
                </div>
              </div>
              <div className={style.content}>
                {[...data.reverse()].map((notification) =>
                  notification.type === NotificationTypesEnum.AddPoints ? (
                    <AddPoints
                      notification={notification}
                      key={`${notification.type}${notification.dateTime}`}
                    />
                  ) : notification.type ===
                    NotificationTypesEnum.ExpirationPoints ? (
                    <ExpirationPoints
                      notification={notification}
                      key={`${notification.type}${notification.dateTime}`}
                    />
                  ) : notification.type === NotificationTypesEnum.Product ? (
                    <Product
                      notification={notification}
                      key={notification.id}
                    />
                  ) : notification.type === NotificationTypesEnum.Order ? (
                    <Order notification={notification} key={notification.id} />
                  ) : notification.type === NotificationTypesEnum.Delivery ? (
                    <Delivery
                      notification={notification}
                      key={notification.id}
                    />
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
export default Notifications;
