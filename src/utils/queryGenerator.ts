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

  let formula = template.replace(/Q#(.)(\^.\sOR|AND\s)?/g, '${q[$1-1]}$2');
  formula =
    mp && mp.length > 0
      ? formula.replace(/MP#(.)(\^.\sOR|AND\s)?/g, '${mp[$1-1]}$2')
      : formula.replace(/MP#.(\^.\sOR|AND\s)?/g, '');
  formula = formula.replace(/(OR|AND)(\s)? (\)|$)/, '$3').replace(/\s\s/g, '');
  let res = eval('`' + formula + '`');
  res = res
    .replace(/\S+:\(\)(\^\d+\sAND|OR\s)?/g, '')
    .replace(/(\()?(\s)?undefined(\^\d+(\sAND|OR\s)?)?(\))?/g, '')
    .replace(/^(\s)+?\)/, '');

  return res === '' ? undefined : res;
};

export default generateQueryString;
