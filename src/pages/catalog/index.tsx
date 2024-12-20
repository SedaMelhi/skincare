import { GetServerSideProps, NextPage } from "next";
import { CatalogService, FilterService } from "@/services/catalog.service";
import { IProductArr } from "@/interfaces/products.interface";
import { useRouter } from "next/router";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatalogProducts,
  setCheckboxFilters,
  setDiscountFilter,
  setPrice,
  setSort,
} from "@/redux/catalogSlice/catalogSlice";

import CatalogPage from "@/components/screens/catalog/CatalogPage";
import { API_URL } from "@/services";

const Catalog: NextPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(false);
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
  const router = useRouter();
  const scrollHandler = (e: any) => {
    const difference = window.innerWidth >= 1200 ? 650 : 1200;
    const scrolledToEnd =
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      difference;
    if (scrolledToEnd && products.length < count) {
      setFetching(true);
    }
  };
  const getData = async () => {
    const searchQuery = router.query.search || "";

    if (searchQuery) {
      const response = await fetch(API_URL + 'catalogue/index.php', {
        method: 'POST',
        body: JSON.stringify({
          type: 'search',
          query: Array.isArray(searchQuery) ? searchQuery[0].trim() : searchQuery.trim(),
          offset: 0,
        }),
      });
      const res = await response.json();
      if (res.items && res.items.length > 0) {
        setProducts(
          res.items.length > 8
            ? [
                ...res.items.filter((item: any, i: number) => i < 8),
                { id: "circle" },
                ...res.items.filter((item: any, i: number) => i >= 8),
              ]
            : [...res.items, { id: "circle" }]
        );
        setCurrentPage(1);
      } else {
        console.log("No items found.");
      }
    } else if (router.query.brandId) {
      const response = await FilterService.getData({
        id: "",
        discount: discountFilter,
        sort: sort,
        filters: checkboxFilters,
        priceMin: price ? price[0] : "",
        priceMax: price ? price[1] : "",
        offset: 12 * currentPage,
        limit: 12,
      });
      if (response.items && response.items.length > 0) {
        if (currentPage === 0) {
          setProducts(
            response.items.length > 8
              ? [
                  ...response.items.filter((item: any, i: number) => i < 8),
                  { id: "circle" },
                  ...response.items.filter((item: any, i: number) => i >= 8),
                ]
              : [...response.items, { id: "circle" }]
          );
        } else {
          setProducts((prevProducts: any) => [
            ...prevProducts,
            ...response.items,
          ]);
        }
        setCurrentPage((prev) => prev + 1);
      }
    } else if (router.query.all) {
      const response = await FilterService.getData({
        id: "",
        discount: discountFilter,
        sort: sort,
        filters: checkboxFilters,
        priceMin: price ? price[0] : "",
        priceMax: price ? price[1] : "",
        offset: 12 * currentPage,
        limit: 12,
      });
      if (response.items && response.items.length > 0) {
        if (currentPage === 0) {
          setProducts(
            response.items.length > 8
              ? [
                  ...response.items.filter((item: any, i: number) => i < 8),
                  { id: "circle" },
                  ...response.items.filter((item: any, i: number) => i >= 8),
                ]
              : [...response.items, { id: "circle" }]
          );
        } else {
          setProducts((prevProducts: any) => [
            ...prevProducts,
            ...response.items,
          ]);
        }
        setCurrentPage((prev) => prev + 1);
      }
    }
    setFetching(false);
  };
  const getProductCount = async () => {
    if (checkboxFilters["S1"]) {
      const response = await FilterService.getData({
        id: "",
        discount: discountFilter,
        sort: sort,
        filters: checkboxFilters,
        priceMin: price ? price[0] : "",
        priceMax: price ? price[1] : "",
      });
      setCount(response.items.length);
    } else if (router.query.all) {
      const response = await FilterService.getData({
        id: "",
        discount: discountFilter,
        sort: sort,
        filters: checkboxFilters,
        priceMin: price ? price[0] : "",
        priceMax: price ? price[1] : "",
      });
      setCount(response.items.length);
    }
  };

  useEffect(() => {
    if (router.query.brandId) {
      dispatch(setCheckboxFilters({ S1: [router.query.brandId] }));
    } else {
      dispatch(setCheckboxFilters({}));
    }
    setCurrentPage(0);
    setProducts([]);
    setFetching(true);
    getProductCount();
    dispatch(setDiscountFilter("null"));
  }, [router]);

  useEffect(() => {
    if (fetching) {
      getData();
    }
    dispatch(setCatalogProducts(products));
  }, [fetching]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [count, products]);

  useEffect(() => {
    if (
      Object.keys(checkboxFilters).length > 0 ||
      sort ||
      price ||
      discountFilter !== "null"
    ) {
      setProducts([]);
      setCurrentPage(0);
      getProductCount();
      setFetching(true);
    }
  }, [checkboxFilters, sort, price, discountFilter]);

  const hasDuplicateIds = (arr: any) => {
    const ids = arr.map((item: any) => item.id); // Извлекаем все id из объектов
    const uniqueIds = new Set(ids); // Создаем множество уникальных id
    return uniqueIds.size < ids.length; // Если размер множества меньше размера массива, значит есть дубликаты
  };
  useEffect(() => {
    console.log("duplicate", hasDuplicateIds(products));
  }, [products]);

  return <CatalogPage products={products} count={count} fetching={fetching} />;
};

export default Catalog;
