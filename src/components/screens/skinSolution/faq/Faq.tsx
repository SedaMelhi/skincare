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
      question: "КТО ВРАЧИ?",
      answer: `Дудалова Аминат-дипломированный эндокринолог с превентивным подходом, прошла профессиональную переподготовку по специальности «Нутрициология», студент PREVENTAGE, выпускник школы UNIPROF. Все документы, подтверждающие образование специалиста, представлены на сайте(выше). Или можно вставить вновь фото дипломов туда же.<br/><br/>
        Байракова Залина-сертифицированный косметик-эстетист с 2022 года. Провела несколько сотен консультаций, помогла подобрать рабочие схемы для пациентов с акне, куперозом и другими дерматитами.`,
    },
    {
      id: "1",
      question: "КАКИЕ ВЫГОДЫ?",
      answer:
        "Благодаря одной консультации вы работаете в двух направлениях: как внутренне, так и внешне. Получаете ответы не только на то, какие у вас дефициты и как их восполнить, модифицировать образ жизни, но и как правильно выстроить уход, чтобы не ломать голову и не тратить деньгиc впустую, чтобы он дал результат.",
    },
    {
      id: "2",
      question: "КАК ПРОХОДИТ КОНСУЛЬТАЦИЯ?",
      answer:
        "Консультация проходит в онлайн-формате в TELEGRAM. Сначала высылается анкета, ее нужно заполнить в течение 3х дней и сдать анализы в течение 10 дней. После получения результатов в течение недели наши специалисты пришлют протокол и дальнейшую стратегию по модификации образа жизни и уходу.",
    },
    {
      id: "3",
      question: "Как проходит консультация?",
      answer:
        "Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.",
    },
    {
      id: "4",
      question: "ЧТО ОНА ВКЛЮЧАЕТ?",
      answer: `
        – Готовые назначение от врача-эндокринолога и косметолога-эстетиста <br/>
        – Сбор полного анамнеза и разбор результатов обследования <br/>
        – Индивидуальные рекомендации по питанию и нутритивной поддержки <br/>
        – Сопровождение напротяжении четырёх недель с момента получения рекомендации <br/>
        – Еженедельные ответы на вопросы в указанные дни <br/>
        – 2 созвона с экспертами <br/>
        – Чеклист модификации образа жизни <br/>
        `,
    },
    {
      id: "5",
      question: "КАКИЕ РЕЗУЛЬТАТЫ МОЖНО ОЖИДАТЬ?",
      answer:
        "При соблюдении всех рекомендаций на регулярной основе наши клиенты замечают улучшение состояния кожи и в целом всего организма, изменения внешнего вида, тело становится очерченнее, более выносливым, кожа напитанной и холеной.",
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
                    <p
                      className={style.border__text}
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    ></p>
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
