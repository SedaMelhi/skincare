import { GetServerSideProps, NextPage } from 'next';
import { CatalogService, FilterService } from '@/services/catalog.service';
import { IProductArr } from '@/interfaces/products.interface';
import CatalogPage from '@/components/screens/catalog/CatalogPage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Catalog: NextPage<{ data: any; id: string | null }> = ({ data, id }) => {
  const [products, setProducts] = useState<IProductArr>(data && data.items ? data.items : []);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);

  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        difference &&
      products &&
      products.length < data.count
    ) {
      setFetching(true);
    }
  };

  const getData = async () => {
    const data = await CatalogService.getCatalog({
      type: 'getItemsList',
      offset: 12 * currentPage,
      limit: 12,
      sectionId: id && id,
    });
    data.items && setProducts((prevProducts) => [...prevProducts, ...data.items]);
    setCurrentPage((prevPage) => prevPage + 1);
    setFetching(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [products, data.count]);

  useEffect(() => {
    setProducts(
      data.items
        ? data.items.length > 8
          ? [...data.items.slice(0, 8), { id: 'circle' }, ...data.items.slice(8)]
          : [...data.items, { id: 'circle' }]
        : [],
    );
    setCurrentPage(1);
  }, [id, data.items]);

  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching]);

  useEffect(() => {
    if (Object.values(checkboxFilters).some((item: any) => item.length !== 0))
      FilterService.getData(id, 'Y', 'popular', checkboxFilters).then((res) => setProducts(res));
    else setProducts(data.items);
  }, [checkboxFilters]);

  return <CatalogPage products={products} count={data.count} fetching={fetching} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await CatalogService.getCatalog({
    type: 'getItemsList',
    offset: 0,
    limit: 12,
    sectionId: context.params && context.params.id,
  });

  return {
    props: { data, id: context.params ? context.params.id : null },
  };
};

export default Catalog;
