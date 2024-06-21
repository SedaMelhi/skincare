import { GetServerSideProps, NextPage } from 'next';
import { CatalogService, FilterService } from '@/services/catalog.service';
import { IProductArr } from '@/interfaces/products.interface';
import CatalogPage from '@/components/screens/catalog/CatalogPage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';

const Catalog: NextPage = () => {
  const [products, setProducts] = useState<IProductArr>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);
  const [count, setCount] = useState(0);
  const router = useRouter();

  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        difference &&
      products &&
      products.length < 20
    ) {
      console.log(true);

      setFetching(true);
    }
  };

  const getData = async () => {
    console.log('ok');

    const value: string = typeof router.query.search === 'string' ? router.query.search : '';
    fetch(API_URL + 'catalogue/index.php', {
      method: 'POST',
      body: JSON.stringify({
        type: 'search',
        limit: 12,
        offset: 12 * currentPage,
        query: value.trim(),
      }),
    })
      .then((res) => res.json())
      .then((res: any) => {
        res.items && setProducts((prevProducts) => [...prevProducts, ...res.items]);
        setCurrentPage((prevPage) => prevPage + 1);
        setFetching(false);
        setCount(res.count);
      });

    console.log(products);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching]);
  useEffect(() => {
    if (Object.values(checkboxFilters).some((item: any) => item.length !== 0))
      FilterService.getData('', 'Y', 'popular', checkboxFilters).then((res) => console.log(res));
    else getData();
  }, [checkboxFilters]);

  return (
    <CatalogPage
      products={products}
      count={count}
      fetching={fetching}
      search={true}
      value={typeof router.query.search === 'string' ? router.query.search : ''}
    />
  );
};

export default Catalog;
