import { FC, useState } from 'react';

import { registerLocale } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import icon from './../../../../../public/certificate/calendar.svg';
import arrow from './../../../../../public/certificate/arrow.svg';
import ru from 'date-fns/locale/ru';

import CertificateModalWindow from '@/components/screens/certificate/certificateModalWindow/certificateModalWindow';

import style from './CertificateForm.module.sass';
import { certificateService } from '@/services/certificate.service';
import { useRouter } from 'next/router';

const CertificateForm: FC<{ giftId: any }> = ({ giftId }) => {
  const [modalActive, setModalActive] = useState(false);
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [data, setData] = useState<{
    phone: string;
    name: string;
    surname: string;
    date: string;
    design: number | null;
    price: string;
    whoIs: string;
    wishes: string;
    pay: string;
  }>({
    phone: '',
    name: '',
    surname: '',
    date: '',
    design: giftId,
    price: '',
    whoIs: '',
    wishes: '',
    pay: 'site',
  });
  const handleDateChange = (date: Date | null) => {
    setDate(date);
    const { day, month, year } = formatDate(date);
    setData((prev: any) => {
      return { ...prev, date: `${day}.${month}.${year}` };
    });
  };
  const formatDate = (dateString: any) => {
    // Парсим строку в объект Date
    const date = new Date(dateString);
    // Получаем день, месяц и год
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    return { day, month, year };
  };

  const changePrice = (event: any) => {
    setData((prev) => {
      return {
        ...prev,
        price: event.target.innerText
          .substring(0, event.target.innerText.length - 1)
          .replace(/\D/g, '')
          .toString(),
      };
    });
  };
  const sendData = async (e: any) => {
    e.preventDefault();
    //setModalActive(true);
    const res = await certificateService.createCertificate(data);
    router.push(res.link);
  };

  return (
    <div className={style.main}>
      <div className={style.titleMain}>
        <div className={style.num}>1/4</div>
        <h3 className={style.title}>данные получателя карты </h3>
      </div>
      <form className={style.form}>
        <input
          className={style.payee}
          type="text"
          id="name"
          name="name"
          placeholder="Имя *"
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
          value={data.name}
        />
        <input
          className={style.payee}
          type="text"
          id="surname"
          name="surname"
          placeholder="Фамилия *"
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, surname: e.target.value };
            })
          }
          value={data.surname}
        />
        <input
          className={style.payee}
          type="tel"
          id="tel"
          name="tel"
          placeholder="Номер телефона *"
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, phone: e.target.value };
            })
          }
          value={data.phone}
        />

        <div className={style.titleMain}>
          <div className={style.num2}>2/4</div>
          <h3 className={style.title}>выбери сумму </h3>
        </div>
        <div className={style.container}>
          <div className={style.row}>
            {[500, 1000, 2500, 5000, 7500, 10000].map((item) => (
              <div className={style.btn} onClick={(event) => changePrice(event)} key={item}>
                {item} ₽
              </div>
            ))}
          </div>
        </div>
        <div>
          <input
            type="number"
            className={style.sum}
            id="certValue"
            name="certValue"
            placeholder="Выбрать сумму *"
            onChange={(event) =>
              setData((prev) => {
                return { ...prev, price: event.target.value };
              })
            }
            value={data.price}
          />
        </div>

        <div className={style.titleMain}>
          <div className={style.num3}>3/4</div>
          <h3 className={style.title}>Напиши добрые слова </h3>
        </div>
        <div>
          <textarea
            className={style.message}
            name="text"
            placeholder="Дорогая..."
            value={data.wishes}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, wishes: e.target.value };
              })
            }></textarea>
        </div>

        <label className={style.checkbox__text} htmlFor="myCheckbox">
          Упомянуть от кого
        </label>
        <input
          className={style.checkbox__input}
          type="checkbox"
          id="myCheckbox"
          name="myCheckbox"
          value="1"
        />
        <div>
          <input
            type="text"
            className={style.sender}
            placeholder="Tвоя красивая сестра :)"
            value={data.whoIs}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, whoIs: e.target.value };
              })
            }
          />
        </div>

        <div className={style.titleMain}>
          <div className={style.num4}>4/4</div>
          <h3 className={style.title}>Дата получения </h3>
        </div>
        <span className={style.date}>
          <DatePicker
            showIcon
            selected={date}
            onChange={handleDateChange}
            className={style.date__picker}
            placeholderText="Выбрать дату"
            dateFormat="yyyy/MM/dd"
            locale="ru"
            minDate={new Date()}
          />
          <img className={style.date__icon} alt="icon" src={icon.src} />
          <img className={style.date__arrow} alt="arrow" src={arrow.src} />
        </span>

        <button className={style.pay} onClick={sendData}>
          оплатить
        </button>
      </form>
      {modalActive && <CertificateModalWindow active={modalActive} setActive={setModalActive} />}
    </div>
  );
};

registerLocale('ru', ru);

export default CertificateForm;
