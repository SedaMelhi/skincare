import { GetServerSideProps, NextPage } from 'next';
import { CatalogService } from '@/services/catalog.service';
import { IProductArr } from '@/interfaces/products.interface';
import CatalogPage from '@/components/screens/catalog/CatalogPage';

const Catalog: NextPage<{ data: any }> = ({ data }) => {
  const products: IProductArr = data ? data : [];
  //const products: IProductArr = data ? data.items : [];
  //<CatalogPage products={products} count={data.count} />
  console.log(products);

  return <CatalogPage products={products} count={products.length} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await CatalogService.getCatalog({
    type: 'testCatalogList',
    offset: 0,
    //sectionId: context.params && context.params.id,
    sectionId: context.params && context.params.id,
  });

  return {
    props: { data },
  };
};

export default Catalog;
