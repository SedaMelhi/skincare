import { FC, useEffect, useState } from "react";

import { ContactsArray } from "@/interfaces/contact.interface";

import arrow from "./../../../../public/arrow.svg";
import logo from "./../../../../public/logo.svg";

import style from "./footer.module.sass";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import FooterInfoModal from "./modals/footerInfoModal";
import { ContactsService } from "@/services/contacts.service";
import { setFooterData } from "@/redux/footerSlice/footerSlice";
import { useRouter } from "next/router";
interface RootState {
  footer: {
    footerData: ContactsArray;
  };
}
const Footer: FC = () => {
  const data = useSelector((state: RootState) => state.footer.footerData);

  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const dispatch = useDispatch();

  const handleOpen = (content: string) => {
    setModalContent(content);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const formatPhoneNumber = (phone: string) => {
    const match = phone.match(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    }
    return null; // или return phone; если вы хотите вернуть исходное значение в случае несоответствия
  };

  useEffect(() => {
    ContactsService.getContacts().then((result) =>
      dispatch(setFooterData(result))
    );
  }, []);

  return (
    <footer className={style.footer__wrap}>
      <div className="wrap">
        <div className={style.footer}>
          <div className={style.flex}>
            <div>
              <h2 className={style.title}>
                Расслабьтесь. Мы все сделаем за вас
              </h2>
              <div
                onClick={() => router.push("/free")}
                className={style.button}
              >
                Записаться на консультацию <img src={arrow.src} />
              </div>
            </div>
            <div className={style.menu}>
              <div className={style.column}>
                <Link href="/catalog?all=true" className={style.subtitle}>
                  Каталог <img src={arrow.src} />
                </Link>
                <div className={style.item}>Скидки</div>
                <div className={style.item}>Новинки</div>
                <Link href={"/catalog?all=true"} className={style.item}>
                  Бренды
                </Link>
              </div>
              <div className={style.column}>
                <div className={style.subtitle}>клиентам</div>
                <div
                  className={style.item}
                  onClick={() => handleOpen("Доставка")}
                >
                  Доставка
                </div>
                <div
                  className={style.item}
                  onClick={() => handleOpen("Возврат")}
                >
                  Возврат
                </div>
                <div
                  className={style.item}
                  onClick={() => handleOpen("Помощь")}
                >
                  Помощь
                </div>
              </div>
              <div className={style.column}>
                <div className={style.subtitle}>Контакты</div>
                <div className={style.item}>
                  <a href={`mailto:${data.length > 0 ? data[0].value : ""}`}>
                    {data.length > 0 ? data[0].value : ""}
                  </a>
                </div>
                <div className={style.item}>
                  <a href={`tel:+${data.length > 0 ? data[1].value : ""}`}>
                    {data.length > 0 ? formatPhoneNumber(data[1].value) : ""}
                  </a>
                </div>

                <a
                  target="_blank"
                  href={`https://t.me/+${data.length > 0 ? data[2].value : ""}`}
                  className={style.item}
                >
                  Написать в Telegram <img src={arrow.src} />
                </a>
              </div>
              <div className={`${style.column} ${style.address}`}>
                <div className={style.subtitle}>Адрес</div>
                <div className={style.item}>
                  {data.length > 0 ? data[4].value : ""}
                </div>
                <div className={style.item}>
                  {data.length > 0 ? data[5].value : ""}
                </div>
              </div>
            </div>
          </div>
          <div className={style.end}>
            <Link href={"/"}>
              <img src={logo.src} alt="" className={style.logo} />
            </Link>
            <div className={style.end__text}>
              <Link href={'https://www.instagram.com/seryon.se?igsh=ODJycGFtamN2MWcw'} target="_blank" className={style.seryonse}>
                Сайт разработан в branding & web студии SERYONSE
              </Link>
              <div className={style.end__text__bottom}>
                <div className={style.end__text__documents}>
                  <Link href={'/documents/пользовательское_соглашение.docx'} target="_blank" className={style.text}>
                    Политика обработки персональных данных
                  </Link>
                  <Link href={'/documents/политика_конфиденциальности.docx'} target="_blank" className={style.text}>
                    Политика конфиденциальности
                  </Link>
                  <Link href={'/documents/оферта.docx'} target="_blank" className={style.text}>Оферта</Link>
                </div>
                <p className={style.text}>© 2024 — Skincare Agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterInfoModal
        open={open}
        handleClose={handleClose}
        content={modalContent}
      />
    </footer>
  );
};

export default Footer;
