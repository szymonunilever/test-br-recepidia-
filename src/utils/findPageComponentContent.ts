import { find, get } from 'lodash';

export const findPageComponentContent = (
  // @ts-ignore
  components: any,
  name: string,
  view?: string
) =>
  get(
    find(
      components,
      ({ name: compName, content }) =>
        compName === name &&
        (!get(content, 'view') || get(content, 'view') === view)
    ),
    'content'
  );
