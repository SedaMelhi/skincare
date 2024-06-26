import { GetServerSideProps, NextPage } from 'next';
import { CatalogService, FilterService } from '@/services/catalog.service';
import { IProductArr } from '@/interfaces/products.interface';
import CatalogPage from '@/components/screens/catalog/CatalogPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { API_URL } from '@/services';
import { setCheckboxFilters } from '@/redux/catalogSlice/catalogSlice';

const Catalog: NextPage = () => {
  const [products, setProducts] = useState<IProductArr>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(false);
  const checkboxFilters = useSelector((state: any) => state.catalog.checkboxFilters);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        difference &&
      products &&
      products.length < count
    ) {
      setFetching(true);
    }
  };

  const getData = async () => {
    if (router.query.brandId) {
      //FilterService
      dispatch(setCheckboxFilters({ S1: [router.query.brandId] }));
    } else if (router.query.search) {
      const value: string = typeof router.query.search === 'string' ? router.query.search : '';
      console.log(value);

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
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [products]);
  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching]);
  useEffect(() => {
    console.log(router.query.brandId);

    setProducts([]);
    setCurrentPage(0);
    setFetching(true);
  }, [router]);
  useEffect(() => {
    if (Object.values(checkboxFilters).some((item: any) => item.length !== 0)) {
      setFetching(false);
      FilterService.getData('', 'Y', 'popular', checkboxFilters).then((res) => {
        setCount(res.items.length);
        setProducts(res.items);
      });
    } else {
      getData();
    }
  }, [checkboxFilters]);

  return (
    <CatalogPage
      products={products}
      count={count}
      fetching={fetching}
      brand={router.query.brandName ? router.query.brandName + '' : ''}
      value={router.query.search ? router.query.search + '' : ''}
    />
  );
};

export default Catalog;
