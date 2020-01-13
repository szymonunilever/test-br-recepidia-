export const esResponseHandler = (
  res: {
    body: {
      hits: {
        total: any;
        hits: { _source: any }[];
      };
    };
  },
  field = ''
) => {
  const data = res.body.hits.hits.map((item: { _source: any }) => item._source);
  const total = res.body.hits.total.value;
  let byField = [];
  if (field) {
    // @ts-ignore
    byField = res.body.hits.hits.map(
      (item: { _source: any }) => item._source[field]
    );
  }
  return { data, total, byField };
};
