import { FC } from "react";
import style from "./paidRecordingConsultation.module.sass";

const PaidRecordingConsultation: FC = () => {
  return (
    <div className={style.wrap}>
      <div className={style.titleMain}>
        <div className={style.star}>
          <div className={style.titleStar}></div>
        </div>
        <h2 className={style.title}>
          Вам нужна
          <br /> консультация, если
        </h2>
      </div>
      <div className={style.borders}>
        <div className={style.row}>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>1</span>
            </div>
            <p className={style.border__text}>
              Bам надоело тратить деньги впустую
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>2</span>
            </div>
            <p className={style.border__text}>
              Kопить средства на полке, которые вам не подходят и не дают
              результата
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>3</span>
            </div>
            <p className={style.border__text}>
              Hе понимаете, как выстраивать свою Бьюти-рутину правильно
            </p>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>4</span>
            </div>
            <p className={style.border__text}>
              Hе знаете последовательность средств и как сочетать компоненты
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>5</span>
            </div>
            <p className={style.border__text}>
              Yход за кожей для вас неизведанный мир и вызывает страх
            </p>
          </div>
        </div>
      </div>
      <div className={style.line}></div>
      <div></div>
    </div>
  );
};

export default PaidRecordingConsultation;
