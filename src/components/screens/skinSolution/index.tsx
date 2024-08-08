import { FC } from "react";
import Layout from "@/components/layout/Layout";
import DescriptionRecord from "@/components/screens/skinSolution/descriptionRecord/descriptionRecord";
import PaidRecordingConsultation from "@/components/screens/skinSolution/paidRecordingConsultation/paidRecordingConsultation";
import SwatchLine from "@/components/screens/skinSolution/swatchLine/swatchLine";
import CareSkinSolution from "@/components/screens/skinSolution/careSkinSolution/careSkinSolution";
import ConsultationTerms from "@/components/screens/skinSolution/consultationTerms/consultationTerms";
import BeforeAndAfter from "@/components/screens/healthStrategy/beforeAndAfter/beforeAndAfter";
import OurAgents from "@/components/screens/healthStrategy/ourAgents/ourAgents";
import Care from "@/components/screens/healthStrategy/care/care";
import Reviews from "@/components/screens/skinSolution/reviews/Reviews";
import Faq from "@/components/screens/skinSolution/faq/Faq";

import Record from "@/components/screens/skinSolution/record/record";

import OtherServices from "@/components/screens/skinSolution/otherServices/otherServices";

import style from "./index.module.sass";

const SkinSolutionPage: FC = () => {
  return (
    <Layout title="платная запись">
      <div>
        <DescriptionRecord
          title="Skin Solution, глубокий подход."
          text={[
            "Skin Solution объединяет экспертизу врача эндокринолога и косметолога",
            "Здесь вы получите профессиональную помощь в решении проблем с кожей и нутриционные рекомендации для достижения здоровья изнутри.",
          ]}
          data_b24_form="inline/14/9beldz"
          link="https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_14.js?"
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
