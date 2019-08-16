import { map } from 'lodash';
import { RecipePersonalizationFormulaProps } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectToArray = (obj: any): any[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arr: any[] = [];
  map(obj, (item, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let str: any = key.match(/\d+/);
    str = str && str[0];
    const k = str && parseInt(str) - 1;
    arr[k] = item;
  });
  return arr;
};

const generateQueryString = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quiz: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mealPlaner: any,
  { template, searchAttributes }: RecipePersonalizationFormulaProps
) => {
  const delimiter = /;/g;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrayToQueryPart = (prop: any[]) => {
    for (let key in prop) {
      let [searchPath, value] = [
        searchAttributes[prop[key].filterPropName],
        prop[key].value,
      ];
      if (Array.isArray(value)) {
        prop[key] = `${searchPath}:(${value
          .join(' OR ')
          .replace(delimiter, ' OR ')})`;
      } else if (delimiter.test(value)) {
        prop[key] = `${searchPath}:(${value.replace(delimiter, ' OR ')})`;
      } else {
        prop[key] = `${searchPath}:${value}`;
      }
    }
    return prop;
  };

  let q = quiz && objectToArray(quiz);
  let mp = mealPlaner && objectToArray(mealPlaner);
  q && arrayToQueryPart(q);
  mp && arrayToQueryPart(mp);
  const operator = template.match(/AND|OR/g);
  const parts = template.replace(/\(|\)/g, '').split(/AND|OR/);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let params: { param: any; weight: string }[];

  params = parts.map(str => {
    const arr = str.split('^');
    return { param: arr[0], weight: arr[1] };
  });


  return params.reduce((prev, { param, weight }, i, params) => {
    const realAnswer = eval(
      '`' +
        param.replace(/Q#(.)/, '${q[$1-1]}').replace(/MP#(.)/, '${mp[$1-1]}') +
        '`'
    );
    const nextAnswer = params[i + 1]
      ? eval(
          '`' +
            params[i + 1].param
              .replace(/Q#(.)/, '${q[$1-1]}')
              .replace(/MP#(.)/, '${mp[$1-1]}') +
            '`'
        )
      : undefined;

    const isUndefined = /undefined|\S+:\(\)/.test(realAnswer);
    const nextUndefined = /undefined|\S+:\(\)/.test(nextAnswer);

    if (!isUndefined && weight && operator && operator[i] && !nextUndefined) {
      return prev + `(${realAnswer})^${weight} ${operator[i]} `;
    } else if (!isUndefined && operator && operator[i] && !nextUndefined) {
      return prev + `(${realAnswer}) ${operator[i]} `;
    } else if (!isUndefined && weight) {
      return prev + `(${realAnswer})^${weight}`;
    } else if (!isUndefined) {
      return prev + `(${realAnswer})`;
    } else {
      return prev;
    }
  }, '');
};

export default generateQueryString;
