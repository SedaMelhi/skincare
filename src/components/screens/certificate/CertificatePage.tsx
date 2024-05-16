import { FC, useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ContactsArray } from '@/interfaces/contact.interface';
import CertificateForm from '@/components/screens/certificate/certificateForm/certificateForm';
import CertificateImg from '@/components/screens/certificate/certificateImg/certificateImg';
import CertificateTitle from '@/components/screens/certificate/certificateTitle/CertificateTitle';
import { useRouter } from 'next/router';

import style from './CertificatePage.module.sass';
import { IGift } from '@/interfaces/gift.interface';
import { GiftsService } from '@/services';

const CertificatePage: FC = () => {
  const router = useRouter();
  const [giftId, setGiftId] = useState<any>(router.query.id);
  const [gifts, setGifts] = useState<IGift[] | []>([]);
  const [initialSlideIndex, setInitialSlideIndex] = useState<number | ''>('');
  useEffect(() => (router.query.id ? setGiftId(router.query.id) : setGiftId('all')), [router]);
  useEffect(() => {
    const data = GiftsService.getGiftsService();
    data.then((res: IGift[]) => {
      setGifts(res);
    });
  }, []);
  useEffect(() => {
    if (giftId !== undefined && giftId !== 'all' && gifts.length > 0) {
      const index = gifts.findIndex((gift: IGift) => gift.id === giftId);
      setInitialSlideIndex(index !== -1 ? index : 0);
    } else if (giftId === 'all' && gifts.length > 0) {
      setGiftId(gifts[0].id);
    }
  }, [gifts, giftId]);
  console.log(giftId);

  return (
    <>
      <Layout title="сертификат">
        <div className="wrap certificate">
          <CertificateTitle />
          <div className={style.container}>
            <div className={style.row1}>
              {giftId !== undefined && gifts.length > 0 && initialSlideIndex !== '' && (
                <CertificateImg
                  setGiftId={setGiftId}
                  gifts={gifts}
                  initialSlideIndex={initialSlideIndex}
                />
              )}
            </div>
            <div className={style.row2}>
              <CertificateForm giftId={giftId} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CertificatePage;
