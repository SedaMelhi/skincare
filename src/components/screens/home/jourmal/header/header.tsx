import { FC } from 'react';
import CircleArrow from '@/components/other/circleArrow/circleArrow';
import Link from 'next/link';
import { API_DOMAIN } from '@/services';

import style from './header.module.sass';

export interface IJournalItem {
  id: string;
  name: string;
  sectionId: string;
  sectionName: string;
  smallPicture: string;
  text: string;
}

const Header: FC<{ journal: IJournalItem }> = ({ journal }) => {
  console.log(API_DOMAIN + journal.smallPicture);

  return (
    <Link href={`article/${journal.id}`} className={style.header}>
      <div
        className={style.image}
        style={
          journal.smallPicture
            ? { backgroundImage: `url(${API_DOMAIN + journal.smallPicture})` }
            : {}
        }></div>
      <div className={'wrap ' + style.header__text}>
        <h3 className={style.title}>
          {journal.name}
          <div className={style.arrow}>
            <CircleArrow sizeCircle="48px" sizeImg="32px" />
          </div>
        </h3>
        <div className={style.subtitle}>{journal.sectionName}</div>
        <div className={style.description}>{journal.text}</div>
      </div>
    </Link>
  );
};
export default Header;
