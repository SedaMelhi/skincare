import Link from 'next/link';
import { FC } from 'react';

import save from './../../../../../public/save.svg';

import style from './save.module.sass';
import { useUserContext } from '@/context/UserContext';

const Save: FC = () => {
  const { userData } = useUserContext();

  if (!userData) {
    return null; // Или компонент загрузки
  }

  return (
    <Link href="/profile/favorites" className={style.save}>
      <img src={save.src} alt="" />
    </Link>
  );
};
export default Save;
