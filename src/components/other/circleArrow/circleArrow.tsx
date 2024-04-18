import { FC } from 'react';

import style from './circleArrow.module.sass';

interface CircleArrowProps {
  sizeCircle: string;
  sizeImg: string;
  color?: string;
  colorImg?: string;
}

const CircleArrow: FC<CircleArrowProps> = ({ sizeCircle, sizeImg, color, colorImg }) => {
  return (
    <div
      className={style.circle}
      style={{ width: sizeCircle, height: sizeCircle, borderColor: color }}>
      <span style={{ width: sizeImg }}>
        <svg
          width="42"
          height="18"
          viewBox="0 0 42 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32.0988 1L40 9M32.0988 17L40 9M40 9H32.0988L0 9"
            stroke="#19171A"
            strokeWidth="2"
          />
        </svg>
      </span>
    </div>
  );
};
export default CircleArrow;
