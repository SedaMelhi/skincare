// import { FC, useState } from 'react';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

// import style from './CertificateImg.module.sass';
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// import image1 from './../../../../../public/present/1.png';
// import image2 from './../../../../../public/present/3.png';
// import image3 from './../../../../../public/certificate/path-to-image-3.svg';
// import image4 from './../../../../../public/present/2.png';
// import image5 from './../../../../../public/certificate/path-to-image-5.svg';
// import image6 from './../../../../../public/present/4.png';

// import { Swiper as SwiperType } from 'swiper/types';

// const CertificateImg: FC = () => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//   const sliders = [
//     {
//       image: image1.src,
//       id: 0,
//     },
//     {
//       image: image2.src,
//       id: 1,
//     },
//     {
//       image: image3.src,
//       id: 2,
//     },
//     {
//       image: image4.src,
//       id: 3,
//     },
//     {
//       image: image5.src,
//       id: 4,
//     },
//     {
//       image: image6.src,
//       id: 5,
//     },
//   ];

//   return (
//     <div className={style.main}>
//       <div className={style.container}>
//         <Swiper
//           style={{}}
//           pagination={true}
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className={style.swiper}>
//           {sliders.map(({ image, id }) => (
//             <SwiperSlide key={id}>
//               <div className={style.swiper__conteiner}>
//                 <div
//                   className={style.swiper__image}
//                   style={{ backgroundImage: `url(${image})` }}></div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <Swiper
//           onSwiper={setThumbsSwiper}
//           slidesPerView={6}
//           watchSlidesProgress={true}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className={style.swiper2}>
//           {sliders.map(({ image, id }) => (
//             <SwiperSlide key={id}>
//               <div
//                 className={style.swiper2__dots}
//                 style={{ backgroundImage: `url(${image})` }}></div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default CertificateImg;

import { FC, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import style from './CertificateImg.module.sass';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import image1 from './../../../../../public/present/1.png';
import image2 from './../../../../../public/present/3.png';
import image3 from './../../../../../public/certificate/path-to-image-3.svg';
import image4 from './../../../../../public/present/2.png';
import image5 from './../../../../../public/certificate/path-to-image-5.svg';
import image6 from './../../../../../public/present/4.png';

import { Swiper as SwiperType } from 'swiper/types';
import { IGift } from '@/interfaces/gift.interface';
import { API_DOMAIN, GiftsService } from '@/services';

const CertificateImg: FC<{
  setGiftId: any;
  gifts: IGift[] | [];
  initialSlideIndex: number;
}> = ({ setGiftId, gifts, initialSlideIndex }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={style.main}>
      <div className={style.container}>
        <Swiper
          style={{}}
          pagination={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.swiper}
          initialSlide={initialSlideIndex}
          onActiveIndexChange={(e) => {
            const currentGiftId = gifts[e.activeIndex]?.id;
            setGiftId(currentGiftId);
          }}>
          {gifts.map(({ picture }, id) => (
            <SwiperSlide key={id}>
              <div className={style.swiper__conteiner}>
                <div
                  className={style.swiper__image}
                  style={{ backgroundImage: `url(${API_DOMAIN + picture})` }}></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={6}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.swiper2}>
          {gifts.map(({ picture }, id) => (
            <SwiperSlide key={id}>
              <div
                className={style.swiper2__dots}
                style={{ backgroundImage: `url(${API_DOMAIN + picture})` }}></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CertificateImg;
