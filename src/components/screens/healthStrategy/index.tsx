import { FC } from "react";
import Layout from "@/components/layout/Layout";
import DescriptionRecord from "@/components/screens/skinSolution/descriptionRecord/descriptionRecord";
import Reviews from "@/components/screens/healthStrategy/reviews/Reviews";
import Faq from "@/components/screens/healthStrategy/faq/Faq";
import Record from "@/components/screens/healthStrategy/record/record";
import PaidRecordingConsultation from "@/components/screens/healthStrategy/paidRecordingConsultation/paidRecordingConsultation";
import SwatchLine from "@/components/screens/healthStrategy/swatchLine/swatchLine";
import CareSkinSolution from "@/components/screens/healthStrategy/careSkinSolution/careSkinSolution";
import ConsultationTerms from "@/components/screens/healthStrategy/consultationTerms/consultationTerms";
import OurAgents from "@/components/screens/healthStrategy/ourAgents/ourAgents";
import OtherServices from "@/components/screens/healthStrategy/otherServices/otherServices";
import BeforeAndAfter from "@/components/screens/healthStrategy/beforeAndAfter/beforeAndAfter";

import style from "./index.module.sass";

const HealthStrategyPage: FC = () => {
  return (
    <Layout title="платная запись">
      <div>
        <DescriptionRecord
          title="Программa health strategy"
          subtitle="> C превентивным врачом-эндокринологом"
          text={[
            "Это целостная работа с организмом,которая затрагивает все органы и системы, начиная с пищеварительной и заканчивая эндокринной системой.",
            "При соблюдении рекомендаций специалиста вы сможете избавиться не только от того, что вас беспокоило изначально, но и улучшить качество вашей жизни в долгосрочной перспективе.",
          ]}
          data_b24_form="inline/12/hldxpa"
          link="https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_12.js?"
        />
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
        <OurAgents page={'health'}/>
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

export default HealthStrategyPage;
