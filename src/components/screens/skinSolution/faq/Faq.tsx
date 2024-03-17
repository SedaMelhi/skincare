import React, { FC, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import iconExpand from '@/../public/paidRecording/plus.png';
import iconCollapse from '@/../public/paidRecording/minus.svg';

import style from './Faq.module.sass';

const Faq: FC = () => {
  const faqData = [
    {
      id: '0',
      question: 'КТО ВРАЧИ?',
      answer: `Дудалова Аминат-дипломированный эндокринолог с превентивным подходом, прошла профессиональную переподготовку по специальности «Нутрициология», студент PREVENTAGE, выпускник школы UNIPROF. Все документы, подтверждающие образование специалиста, представлены на сайте(выше). Или можно вставить вновь фото дипломов туда же. 

Дидаева Соня-дипломированный косметолог-эстетист с опытом работы 5 лет, которая сама вышла в стойкую ремиссию с акне. Более 1000 женщин прошли ее консультацию и получили положительный результат.`,
    },
    {
      id: '1',
      question: 'КАКИЕ ВЫГОДЫ?',
      answer:
        'Благодаря одной консультации вы работаете в двух направлениях: как внутренне, так и внешне. Получаете ответы не только на то, какие у вас дефициты и как их восполнить, модифицировать образ жизни, но и как правильно выстроить уход, чтобы не ломать голову и не тратить деньгиc впустую, чтобы он дал результат.',
    },
    {
      id: '2',
      question: 'КАК ПРОХОДИТ КОНСУЛЬТАЦИЯ?',
      answer:
        'Консультация проходит в онлайн-формате в TELEGRAM. Сначала высылается анкета, ее нужно заполнить в течение 3х дней и сдать анализы в течение 10 дней. После получения результатов в течение недели наши специалисты пришлют протокол и дальнейшую стратегию по модификации образа жизни и уходу.',
    },
    {
      id: '3',
      question: 'ЧТО ОНА ВКЛЮЧАЕТ?',
      answer: `-Готовые назначение от врача-эндокринолога и косметолога-эстетиста
-Сбор полного анамнеза и разбор результатов обследования
-Индивидуальные рекомендации по питанию и нутритивной поддержки
-Сопровождение напротяжении четырёх недель с момента получения рекомендации
-Еженедельные ответы на вопросы в указанные дни
-2 созвона с экспертами
-Чеклист модификации образа жизни`,
    },
    {
      id: '4',
      question: 'КАКИЕ РЕЗУЛЬТАТЫ МОЖНО ОЖИДАТЬ?',
      answer: `При соблюдении всех рекомендаций на регулярной основе наши клиенты замечают улучшение состояния кожи и в целом всего организма, изменения внешнего вида, тело становится очерченнее, более выносливым, кожа напитанной и холеной.`,
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
                  className={style.border}>
                  <AccordionSummary
                    expandIcon={
                      <img
                        src={isExpanded === index ? iconCollapse.src : iconExpand.src}
                        alt=""
                        className={style.border__input}
                      />
                    }>
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