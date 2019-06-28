export interface Tag extends RMSData.Tag {
  tagId: string;
  fields: {
    slug: string;
  };
}

export interface TagGroup extends RMSData.TagGroup {
  children: Tag[];
}
