import { FC } from 'react';
import Link from 'next/link';

import Title from '@/components/other/title/title';
import Header from './header/header';
import Accordion from './accordion/accordion';

import style from './journal.module.sass';

const Journal: FC<any> = ({ journals }) => {
  return (
    <section className={style.journal}>
      <div className={style.title}>
        <Link href="/journal">
          <Title text="журнал" />
        </Link>
      </div>
      <div className={style.left__wrap}>
        <div className={style.left}>
          <Header journal={journals[0]} />
          <Accordion journals={journals} />
        </div>
      </div>
    </section>
  );
};
export default Journal;
