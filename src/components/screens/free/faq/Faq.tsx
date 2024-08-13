import React, { FC, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import iconExpand from "@/../public/paidRecording/plus.png";
import iconCollapse from "@/../public/paidRecording/minus.svg";

import style from "./Faq.module.sass";

const Faq: FC = () => {
  const faqData = [
    {
      id: "0",
      question: "Все ли прописанные средства из схемы понадобятся?",
      answer:
        "Каждое средство из схемы подбирается так, чтобы в комбинации с другими оно не только не конфликтовало, но и усиливало действие других средств, так схема ухода дает максимально выраженный результат.",
    },
    {
      id: "1",
      question: "Когда можно ждать результат?",
      answer:
        "При регулярном использовании и полного соблюдения схемы первые изменения можно наблюдать в течение двух месяцев",
    },
    {
      id: "2",
      question: "Надолго ли хватает средств?",
      answer:
        "Расход средств у каждого индивидуальный и зависит от частоты использования, количества нанесения, объема средства и его текстуры.",
    },
    {
      id: "3",
      question: "Стоимость консультации?",
      answer:
        "Консультация бесплатная, так как средства подбираются из нашего магазина.",
    },
    {
      id: "4",
      question: "Можно ли подобрать уход с ограниченным бюджетом?",
      answer:
        "Агенты Скинкерь всегда стараются уложиться в бюджет клиента, чтобы он мог сразу же подключить продукты в свою Бьюти-рутину.",
    },
  ];
  const [isExpanded, setIsExpanded] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setIsExpanded(isExpanded === index ? null : index);
  };
  return (
    <div className={style.bg}>
      <div className="wrap">
        <div className={style.main}>
          <div className={style.headerTitle}>
            <div className={style.title__main}>
              <h2 className={style.title}>остались вопросы?</h2>
              <p className={style.text}>
                Вот ответы на самые
                <br /> частые из них.
              </p>
            </div>
          </div>
          <div className={style.container}>
            <div className={style.img}>
              <div className={style.circle__one}></div>
              <div className={style.circle__two}></div>
              <div className={style.titleImg}></div>
            </div>
            <div className={style.borders}>
              {faqData.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={isExpanded === index}
                  onChange={() => handleToggle(index)}
                  className={style.border}
                >
                  <AccordionSummary
                    expandIcon={
                      <img
                        src={
                          isExpanded === index
                            ? iconCollapse.src
                            : iconExpand.src
                        }
                        alt=""
                        className={style.border__input}
                      />
                    }
                  >
                    <h3 className={style.border__title}>{faq.question}</h3>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className={style.border__text}>{faq.answer}</p>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
