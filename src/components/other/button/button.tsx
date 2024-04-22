import { FC } from 'react';
import Link from 'next/link';

import style from './Button.module.sass';

interface ButtonProps {
  text: string;
  height?: string;
  fontSize?: string;
  link?: string;
  arrow?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ text, height, fontSize, link, onClick, arrow }) => {
  return link ? (
    <Link href={link}>
      <button
        className={style.btn}
        onClick={onClick}
        style={{ height: height ? height : '50px', fontSize: fontSize ? fontSize : '16px' }}>
        {text}
        {arrow && (
          <div className={style.svg}>
            <svg
              width="32"
              height="14"
              viewBox="0 0 32 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24.0741 1L30 7M24.0741 13L30 7M30 7L24.0741 7L0 7"
                stroke="#FDFCFD"
                stroke-width="1.5"
              />
            </svg>
          </div>
        )}
      </button>
    </Link>
  ) : (
    <button
      className={style.btn}
      onClick={onClick}
      style={{ height: height ? height : '50px', fontSize: fontSize ? fontSize : '16px' }}>
      {text}
    </button>
  );
};

export default Button;
