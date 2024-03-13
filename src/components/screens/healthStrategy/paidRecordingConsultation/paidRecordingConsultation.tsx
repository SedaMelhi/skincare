import { FC } from 'react';
import style from './paidRecordingConsultation.module.sass';

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
              Bы устали пробовать средства и не видеть результат{' '}
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>2</span>
            </div>
            <p className={style.border__text}>
              Yстали от шаблонных назначений, хотите грамотно подобранный уход
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>3</span>
            </div>
            <p className={style.border__text}>
              Xотите найти истинную причину ваших проблем с кожей (окне, розацеа, атопический
              дерматит)
            </p>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>4</span>
            </div>
            <p className={style.border__text}>
              Hе знаете, с чего начать путь к здоровой кожи и образа жизни{' '}
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>5</span>
            </div>

            <p className={style.border__text}>
              Hе знаете, как внедрить системный подход в решение вашей проблемы
            </p>
          </div>
          <div className={style.border}>
            <div className={style.border__number}>
              <span>6</span>
            </div>
            <p className={style.border__text}>Бросаете все на полпути </p>
          </div>
        </div>
      </div>
      <div className={style.line}></div>
      <div></div>
    </div>
  );
};

export default PaidRecordingConsultation;
