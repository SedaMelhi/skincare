import { GetServerSideProps, NextPage } from 'next';
import { CatalogService } from '@/services/catalog.service';
import { IProductArr } from '@/interfaces/products.interface';
import CatalogPage from '@/components/screens/catalog/CatalogPage';

const Catalog: NextPage<{ data: any }> = ({ data }) => {
  console.log(data);

  const products: IProductArr = data ? Object.values(data) : [];

  return <CatalogPage products={products} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await CatalogService.getCatalog({
    type: 'getSectionItems',
    sectionId: context.params && context.params.id,
    count: 10,
    numPage: 1,
  });

  return {
    props: { data },
  };
};

export default Catalog;
