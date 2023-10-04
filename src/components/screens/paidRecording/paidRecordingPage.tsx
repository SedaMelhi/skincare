import {FC} from 'react';
import Layout from '@/components/layout/Layout';
import DescriptionRecord from "@/components/screens/paidRecording/descriptionRecord/descriptionRecord";
import Care from "@/components/screens/paidRecording/care/care";
import Reviews from "@/components/screens/paidRecording/reviews/Reviews"
import Faq from "@/components/screens/paidRecording/faq/Faq";
import Record from "@/components/screens/paidRecording/record/record";
import style from "././paidRecording.module.sass"
import PaidRecordingConsultation
    from "@/components/screens/paidRecording/paidRecordingConsultation/paidRecordingConsultation";
import SwatchLine from "@/components/screens/paidRecording/swatchLine/swatchLine";
import CareSkinSolution from "@/components/screens/paidRecording/careSkinSolution/careSkinSolution";
import ConsultationTerms from "@/components/screens/paidRecording/consultationTerms/consultationTerms";
import AboutUsPage from "@/components/screens/aboutUs/aboutUsPage";


const PaidRecordingPage: FC = () => {
    return (

        // <Layout title="платная запись">
        //     <div>
        //         <DescriptionRecord/>
        //     </div>
        //     <div>
        //         <PaidRecordingConsultation/>
        //     </div>
        //     <div className={style.swatch}><SwatchLine/></div>
        //     <div><CareSkinSolution/></div>
        //     <div><ConsultationTerms/></div>
        //
        //
        //     <Faq/>
        //     <Record/>
            <AboutUsPage/>
        //
        // </Layout>

    )
        ;
};

export default PaidRecordingPage;
