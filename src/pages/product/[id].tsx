import { GetServerSideProps, NextPage } from "next";
import { CardService } from "@/services/catalog.service";

import ProductPage from "@/components/screens/product/ProductPage";

const Product: NextPage<any> = ({ data }) => {
  return <ProductPage data={data} key={data && Object.keys(data)[0]} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await CardService.getCard({
    type: "getItem",
    itemId: context.params && context.params.id,
  });

  return {
    props: { data },
  };
};

export default Product;
