import { GetServerSideProps, NextPage } from "next";
import { CatalogService, FilterService } from "@/services/catalog.service";
import { IProductArr } from "@/interfaces/products.interface";
import debounce from "debounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatalogProducts,
  setCheckboxFilters,
  setSort,
} from "@/redux/catalogSlice/catalogSlice";

import CatalogPage from "@/components/screens/catalog/CatalogPage";
import { useRouter } from "next/router";

const CatalogCategory: NextPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const dispatch = useDispatch();
  const checkboxFilters = useSelector(
    (state: any) => state.catalog.checkboxFilters
  );
  const sort = useSelector((state: any) => state.catalog.sort);
  const discountFilter = useSelector(
    (state: any) => state.catalog.discountFilter
  );
  const price = useSelector((state: any) => state.catalog.price);
  const [count, setCount] = useState(0);
  const router = useRouter()
  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    const scrolledToEnd =
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      difference;
    if (
      scrolledToEnd && products.length < count
    ) {
      setFetching(true);
    }
  };  


  const getData = async () => {
    if (router.query.id) {
      const response = await FilterService.getData({
        id: router.query.id,
        discount: discountFilter,
        sort: sort,
        filters: checkboxFilters,
        priceMin: price ? price[0] : '',
        priceMax: price ? price[1] : '',
        offset: 12 * currentPage,
        limit: 12,
      });
      if (response.items && response.items.length > 0) {
        if (currentPage === 0) {
          setProducts(response.items.length > 8
            ? [...response.items.filter((item: any, i: number) => i < 8), { id: "circle" }, ...response.items.filter((item: any, i: number) => i >= 8)]
            : [...response.items, { id: "circle" }]
          );
        } else {
          setProducts((prevProducts: any) => [...prevProducts, ...response.items]);
        }
        setCurrentPage(currentPage + 1);
      }
      setFetching(false);
    }

  };
  const getProductCount = async () => {
    if (router.query.id) {
      const response = await FilterService.getData({
        id: router.query.id,
        discount: discountFilter,
        sort: sort,
        filters: checkboxFilters,
        priceMin: price ? price[0] : '',
        priceMax: price ? price[1] : ''
      });
      setCount(response.items.length)
    }
  }

  useEffect(() => {
    setCurrentPage(0)
    setProducts([])
    setFetching(true)
    if (currentPage === 0) {
      getData()
    }
    getProductCount()
  }, [router.query.id])
  useEffect(() => {
    if (fetching) {
      getData();
    }
  }, [fetching]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [count, products])
  useEffect(() => {
    if (Object.keys(checkboxFilters).length > 0 || sort || price || discountFilter !== 'null') {
      setProducts([])
      setCurrentPage(0)
      getProductCount()
      setFetching(true)
    }
  }, [checkboxFilters, sort, price, discountFilter]);

  const hasDuplicateIds = (arr: any) => {
    const ids = arr.map((item: any) => item.id); // Извлекаем все id из объектов
    const uniqueIds = new Set(ids); // Создаем множество уникальных id
    return uniqueIds.size < ids.length; // Если размер множества меньше размера массива, значит есть дубликаты
  };

  useEffect(() => {
    console.log('duplicate', hasDuplicateIds(products));
  }, [products])

  return <CatalogPage products={products} count={count} fetching={fetching} />;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const data = await FilterService.getData({
//     id: context.params && context.params.id,
//     discount: null,
//     sort: "popular",
//     filters: {},
//     priceMin: "",
//     priceMax: "",
//     offset: 0,
//     limit: 12,
//   });

//   return {
//     props: { data, id: context.params ? context.params.id : null },
//   };
// };

export default CatalogCategory;
