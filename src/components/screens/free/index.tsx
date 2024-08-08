import { FC } from "react";
import Layout from "@/components/layout/Layout";
import DescriptionRecord from "@/components/screens/skinSolution/descriptionRecord/descriptionRecord";
import PaidRecordingConsultation from "@/components/screens/free/paidRecordingConsultation/paidRecordingConsultation";
import SwatchLine from "@/components/screens/free/swatchLine/swatchLine";
import CareSkinSolution from "@/components/screens/free/careSkinSolution/careSkinSolution";
import ConsultationTerms from "@/components/screens/free/consultationTerms/consultationTerms";
import BeforeAndAfter from "@/components/screens/healthStrategy/beforeAndAfter/beforeAndAfter";
import OurAgents from "@/components/screens/healthStrategy/ourAgents/ourAgents";
import Care from "@/components/screens/healthStrategy/care/care";
import Reviews from "@/components/screens/free/reviews/Reviews";
import Faq from "@/components/screens/free/faq/Faq";
import Record from "@/components/screens/free/record/record";
import OtherServices from "@/components/screens/free/otherServices/otherServices";
// import AboutUsPage from '@/components/screens/aboutUs/aboutUsPage';

import style from "./index.module.sass";

const FreePage: FC = () => {
  return (
    <Layout title="Бесплатная консультация">
      <div>
        <DescriptionRecord
          title="Бесплатная консультация"
          subtitle="> По подбору ухода"
          text={[
            "Индивидуальный подбор средств под конкретные запросы с учетом всех особенностей кожи. Уникальность такой консультации в том, что наши специалисты полностью разбирает ваш случай и действующий уход, делает разбор косметички и убирает ненужные средства, подбирает недостающие, чтобы все работало в комплексе и дало результат.",
            "Каждый бьюти-агент прошел полноценное обучение, неустанно пополняет багаж знаний в этой сфере и имеет большое количество отзывов за плечами практики.",
          ]}
          data_b24_form="inline/10/ydop5w"
          link="https://cdn-ru.bitrix24.ru/b26885834/crm/form/loader_10.js?"
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

export default FreePage;
