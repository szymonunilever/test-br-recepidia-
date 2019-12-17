export const getTagSlug = (path: string, tag: Internal.Tag) =>
  `${path}${tag.fields.slug}`;
