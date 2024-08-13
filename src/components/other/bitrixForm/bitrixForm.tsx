import React, { FC, useEffect, useRef, useState } from 'react';
import Load from '../load/load';

import style from './bitrixForm.module.sass';

interface Props {
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  data_b24_form: string,
  link: string
}

const BitrixForm: FC<Props> = ({ setIsVisible, data_b24_form, link }) => {
  // Используйте useRef для указания места вставки скрипта
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (formRef.current && isLoading) {
      const script = document.createElement('script');
      script.src =
        link + ((Date.now() / 180000) | 0);
      script.async = true;
      script.setAttribute('data-b24-form', data_b24_form);
      script.setAttribute('data-skip-moving', 'true');

      formRef.current.appendChild(script);
      script.onload = () => {
        setLoading(false);
        setTimeout(() => {
          if (setIsVisible) {
            setIsVisible(true);
          }
        }, 1000);
      };
    }
  }, []);

  return (
    <div>
      {isLoading && (
        <div className={style.load}>
          <Load />
        </div>
      )}
      <div ref={formRef}></div>
    </div>
  );
};

export default BitrixForm;

// const BitrixForm: FC<Props> = ({ setIsVisible }) => {
//   // Используйте useRef для указания места вставки скрипта
//   const formRef = useRef<HTMLDivElement>(null);
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     if (formRef.current && isLoading) {
//       const script = document.createElement('script');
//       script.src =
//         'https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_10.js?' + ((Date.now() / 180000) | 0);
//       script.async = true;
//       script.setAttribute('data-b24-form', 'inline/10/ydop5w');
//       script.setAttribute('data-skip-moving', 'true');

//       formRef.current.appendChild(script);
//       script.onload = () => {
//         setLoading(false);
//         setTimeout(() => {
//           if (setIsVisible) {
//             setIsVisible(true);
//           }
//         }, 1000);
//       };
//     }
//   }, []);

//   return (
//     <div>
//       {isLoading && (
//         <div className={style.load}>
//           <Load />
//         </div>
//       )}
//       <div ref={formRef}></div>
//     </div>
//   );
// };

// export default BitrixForm;
