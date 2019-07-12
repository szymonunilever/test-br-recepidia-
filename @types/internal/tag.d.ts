declare namespace Internal {
  interface Tag extends RMSData.Tag {
    tagId: string;
    id: string;
    name: string;
    fields: {
      slug: string;
    };
  }
}
