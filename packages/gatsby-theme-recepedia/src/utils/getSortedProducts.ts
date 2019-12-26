// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSortedProducts = (allProduct: { nodes: any }) =>
  allProduct.nodes.sort(
    (
      a: { productLaunchDate: string | number | Date },
      b: { productLaunchDate: string | number | Date }
    ) => {
      if (
        new Date(a.productLaunchDate).valueOf() <
        new Date(b.productLaunchDate).valueOf()
      )
        return 1;
      if (
        new Date(a.productLaunchDate).valueOf() >
        new Date(b.productLaunchDate).valueOf()
      )
        return -1;
      return 0;
    }
  );
