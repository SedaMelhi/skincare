import { FC } from 'react';
import CertificatePage from '@/components/screens/certificate/CertificatePage';
import { ContactsArray } from '@/interfaces/contact.interface';
import { GetServerSideProps, NextPage } from 'next';

const Certificate: NextPage = () => {
  return <CertificatePage />;
};

export default Certificate;
