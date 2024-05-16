export const scrollHandler = (e: any, setFetching: any, count: number, items: any) => {
  if (
    e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      500 &&
    items.length < count
  ) {
    console.log(items.length, count);

    setFetching(true);
  }
};
