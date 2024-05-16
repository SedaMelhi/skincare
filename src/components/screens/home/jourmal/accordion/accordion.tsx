import { useState, FC } from 'react';
import { IJournalItem } from '../header/header';
import { API_DOMAIN } from '@/services';
import Link from 'next/link';

import CircleArrow from '@/components/other/circleArrow/circleArrow';

import style from './accordion.module.sass';

interface AccordionItem {
  title: string;
  description: string;
  type: string;
  id: number;
}

const Accordion: FC<{ journals: IJournalItem[] }> = ({ journals }) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const onItemClick = (index: string): void => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={style.accordion}>
      {journals.map(
        ({ id, name, text, smallPicture, sectionName }): any =>
          id && (
            <div className={style.item} key={id} onClick={() => onItemClick(id)}>
              <div className={style.column}>
                <div className={style.text}>
                  <div className={style.type__mobile}>{sectionName}</div>
                  <div
                    className={style.title + ' ' + (activeIndex === id ? style.title_active : '')}>
                    <h3>{name}</h3>
                    <Link
                      href={`/article/${id}`}
                      className={
                        style.circle + ' ' + (activeIndex === id ? style.active : style.hidden)
                      }>
                      <CircleArrow sizeCircle="48px" sizeImg="32px" color="var(--primary-500)" />
                    </Link>
                  </div>

                  <div
                    className={
                      style.description + ' ' + (activeIndex === id ? style.active : style.hidden)
                    }>
                    {text}
                  </div>
                </div>
              </div>
              <div
                className={style.column + ' ' + (activeIndex === id ? style.active : style.hidden)}>
                <div
                  className={style.image}
                  style={{ backgroundImage: `url(${API_DOMAIN + smallPicture})` }}></div>
              </div>
              <div className={style.column}>
                <div className={style.type}>{sectionName}</div>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default Accordion;
