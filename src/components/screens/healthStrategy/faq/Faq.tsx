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
      question: 'Что такое Skin Solution и для кого она предназначена?',
      answer:
        'Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.',
    },
    {
      id: '1',
      question: 'кто врачи?',
      answer:
        'Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.',
    },
    {
      id: '2',
      question: 'Какие выгоды в Skin Solution?',
      answer:
        'Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.',
    },
    {
      id: '3',
      question: 'Как проходит консультация?',
      answer:
        'Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.',
    },
    {
      id: '4',
      question: 'что она включAет?',
      answer:
        'Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.',
    },
    {
      id: '5',
      question: 'Какие результаты можно ожидать?',
      answer:
        'Skin Solution - это премиум программа, объединяющая экспертизу врача эндокринолога и косметолога. Она предназначена для тех, кто хочет решить проблемы с кожей, такие как акне, розацея, атопический дерматит, и получить комплексные рекомендации по уходу и питанию.',
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
