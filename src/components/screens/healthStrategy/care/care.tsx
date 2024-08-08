import { FC } from "react";
import style from "./care.module.sass";

const Care: FC = () => {
  return (
    <div className={style.wrap + " wrap"}>
      <div className={style.line}>
        <div className={style.line__one}></div>
        <div className={style.line__two}></div>
      </div>
      <h3 className={style.title}>ваша ванная</h3>
      <div className={style.borders}>
        <div className={style.border}>
          <div className={style.border__img}>
            <img src="./paidRecording/before.png" />
          </div>
          <h3 className={style.border__title}>до советов агентов:(</h3>
          <ul className={style.border__list}>
            <li className={style.border__listItem}>
              Переполненная ненужными продуктами
            </li>
            <li className={style.border__listItem}>
              Неэффективные продукты для твоего типа кожи
            </li>
            <li className={style.border__listItem}>Хаотичная рутина</li>
            <li className={style.border__listItem}>
              Огромная трата денег без результатов
            </li>
            <li className={style.border__listItem}>Боль</li>
            <li className={style.border__listItem}>И беспорядок</li>
          </ul>
        </div>
        <div className={style.border}>
          <div className={style.border__img}>
            <img src="./paidRecording/after.png" />
          </div>
          <div className={style.border__titleMain}>
            <img
              src="./paidRecording/star.png"
              className={style.border__titleStar}
            />
            <h3 className={style.border__title}>и после</h3>
            <img
              src="./paidRecording/star.png"
              className={style.border__titleStar}
            />
          </div>
          <ul className={style.border__list}>
            <li className={style.border__listItem}>
              Только нужные продукты, всё без лишних трат
            </li>
            <li className={style.border__listItem}>
              Эффективные активные ингредиенты
            </li>
            <li className={style.border__listItem}>
              Уход подобранный экспертом специально для твоего типа кожи
            </li>
            <li className={style.border__listItem}>
              Наконец‑то твоя кожа и ванная смотрятся ухоженными
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Care;
