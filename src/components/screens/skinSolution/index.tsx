import { FC } from 'react';
import Layout from '@/components/layout/Layout';
import DescriptionRecord from '@/components/screens/skinSolution/descriptionRecord/descriptionRecord';
import Care from '@/components/screens/skinSolution/care/care';
import Reviews from '@/components/screens/skinSolution/reviews/Reviews';
import Faq from '@/components/screens/skinSolution/faq/Faq';
import Record from '@/components/screens/skinSolution/record/record';
import PaidRecordingConsultation from '@/components/screens/skinSolution/paidRecordingConsultation/paidRecordingConsultation';
import SwatchLine from '@/components/screens/skinSolution/swatchLine/swatchLine';
import CareSkinSolution from '@/components/screens/skinSolution/careSkinSolution/careSkinSolution';
import ConsultationTerms from '@/components/screens/skinSolution/consultationTerms/consultationTerms';
import AboutUsPage from '@/components/screens/aboutUs/aboutUsPage';
import OurAgents from '@/components/screens/skinSolution/ourAgents/ourAgents';
import OtherServices from '@/components/screens/skinSolution/otherServices/otherServices';
import BeforeAndAfter from '@/components/screens/skinSolution/beforeAndAfter/beforeAndAfter';

import style from './index.module.sass';

const SkinSolutionPage: FC = () => {
  return (
    <Layout title="платная запись">
      <div>
        <DescriptionRecord />
      </div>
      <div className={style.recording}>
        <PaidRecordingConsultation />
      </div>
      <div className={style.swatch}>
        <SwatchLine />
      </div>
      <div className={style.careSkinSolution}>
        <CareSkinSolution />
      </div>
      <div className={style.terms}>
        <ConsultationTerms />
      </div>
      <div>
        <BeforeAndAfter />
      </div>
      <div className={style.ourAgents}>
        <OurAgents />
      </div>
      <div className={style.care}>
        <Care />
      </div>
      <div className={style.reviews}>
        <Reviews />
      </div>
      <div className={style.faq}>
        <Faq />
      </div>
      <div className={style.record}>
        <Record />
      </div>
      <div className={style.otherServices}>
        <OtherServices />
      </div>
    </Layout>
  );
};

export default SkinSolutionPage;
