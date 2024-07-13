import { GetServerSideProps, NextPage } from 'next';
import { CatalogService, FilterService } from '@/services/catalog.service';
import { IProductArr } from '@/interfaces/products.interface';
import CatalogPage from '@/components/screens/catalog/CatalogPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckboxFilters } from '@/redux/catalogSlice/catalogSlice';

const Catalog: NextPage<{ data: any; id: string | null }> = ({ data, id }) => {
  const [products, setProducts] = useState<IProductArr>(data && data.items ? data.items : []);

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);
  const discountFilter = useSelector((state: any) => state.catalog.discountFilter);
  const min_price = useSelector((state: any) => state.catalog.discountFilter);
  const max_price = useSelector((state: any) => state.catalog.discountFilter);

  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    const scrolledToEnd =
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      difference;
    if (
      scrolledToEnd &&
      products.length < data.count &&
      !fetching &&
      !Object.values(checkboxFilters).some((item: any) => item.length !== 0)
    ) {
      setFetching(true);
    }
  };

  const getData = async () => {
    if (!Object.values(checkboxFilters).some((item: any) => item.length !== 0)) {
      const newPage = currentPage + 1;
      const response = await CatalogService.getCatalog({
        type: 'getItemsList',
        offset: 12 * currentPage,
        limit: 12,
        sectionId: id,
      });
      if (response.items && response.items.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...response.items]);
        setCurrentPage(newPage);
      }
    }
    setFetching(false);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [products]);

  useEffect(() => {
    if (
      !checkboxFilters ||
      Object.values(checkboxFilters).every((item: any) => item.length === 0)
    ) {
      setProducts(
        data.items
          ? data.items.length > 8
            ? [...data.items.slice(0, 8), { id: 'circle' }, ...data.items.slice(8)]
            : [...data.items, { id: 'circle' }]
          : [],
      );
      setCurrentPage(1);
    }
  }, [id, data.items, checkboxFilters]);

  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching]);

  useEffect(() => {
    if (Object.values(checkboxFilters).length > 0) {
      FilterService.getData(id, discountFilter, 'popular', checkboxFilters).then((res) => {
        setCurrentPage(0);
        setProducts(res.items);
        console.log(res.items);
      });
    }
  }, [checkboxFilters, discountFilter]);

  useEffect(() => {
    setProducts([]);
    setCurrentPage(0);

    dispatch(setCheckboxFilters({}));
  }, [id]);

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
