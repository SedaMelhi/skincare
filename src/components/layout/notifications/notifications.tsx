import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { setIsNotifications } from '@/redux/basketSlice/basketSlice';

import closeSvg from './../../../../public/close.svg';
import notificationsSvg from './../../../../public/notifications.svg';
import image1 from './../../../../public/notification/1.png';
import image2 from './../../../../public/about/1.png';

import style from './notifications.module.sass';
import Notification from './notification/notifiction';

import useSWR from 'swr';
import { getNotificationsService } from '@/services/notification.service';

interface RootNotifications {
  basket: {
    isNotifications: boolean;
  };
}

const Notifications: FC = () => {
  // const isNotifications = useSelector(
  //   (state: RootNotifications) => state.basket.isNotifications
  // );
  // const dispatch = useDispatch();

  // const getData = async () => {
  //   const token = localStorage.getItem("token")!;
  //   if (token) {
  //     const data = await getNotificationsService.getNotifications(token);
  //     return data;
  //   }
  // };

  // const { data } = useSWR("profile-notifications", getData);
  // console.log(data);

  // const closeBasket = () => {
  //   dispatch(setIsNotifications(false));
  // };
  // const arr = [
  //   {
  //     title: "Скоро баллы сгорят",
  //     type: "points",
  //     desc: "Успейте использовать баллы до истечения срока.",
  //     date: "Сегодня в 14:45",
  //     image: image1.src,
  //   },
  //   {
  //     title: "заказ #677 доставлен",
  //     type: "order",
  //     desc: "г. Грозный ( Чеченская Республика ), проспект Мухаммеда Али ( бывший проспект Кирова ), д 2А ",
  //     date: "Сегодня в 14:45",
  //     image: image2.src,
  //   },
  //   {
  //     title: "заказ #677 успешно оформлен",
  //     type: "processed",
  //     desc: "доставка C 16 по 18 июля включительно",
  //     date: "Сегодня в 14:45",
  //     image: image2.src,
  //   },
  //   {
  //     title: "Вам начислено 123 бонусов",
  //     type: "AddPoints",
  //     desc: "Используйте бонусы от покупки в течение 3-х месяцев.",
  //     date: "Сегодня в 14:45",
  //     image: image1.src,
  //   },
  //   {
  //     title: "товары из листа ожидания в наличии",
  //     type: "productStock",
  //     desc: "SKIN&LAB Porebarrier Clear Pad очищающие пэды",
  //     date: "Сегодня в 14:45",
  //     image: image2.src,
  //   },
  // ];

  return '';
  // <CSSTransition
  //   in={isNotifications}
  //   timeout={400}
  //   classNames={{
  //     enter: style.slideEnter,
  //     enterActive: style.slideEnterActive,
  //     exit: style.slideExit,
  //     exitActive: style.slideExitActive,
  //   }}
  //   unmountOnExit
  // >
  //   <div>
  //     <div className={style.basket__wrap}>
  //       <div className={style.empty} onClick={closeBasket}></div>
  //       <div className={style.basket}>
  //         <div className={style.padding}>
  //           <div className={style.header}>
  //             <div className={style.close}>
  //               <img src={closeSvg.src} alt="" onClick={closeBasket} />
  //             </div>
  //             <div className={style.bag}>
  //               <img src={notificationsSvg.src} alt="" />
  //               <div className={style.bag__text}>
  //                 уведомления <span>({arr.length})</span>
  //               </div>
  //             </div>
  //           </div>
  //           <div className={style.content}>
  //             {arr.map(({ title, type, desc, date, image }, i) => (
  //               <div className={style.product} key={i}>
  //                 <Notification
  //                   title={title}
  //                   type={type}
  //                   desc={desc}
  //                   date={date}
  //                   image={image}
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </CSSTransition>
};
export default Notifications;
