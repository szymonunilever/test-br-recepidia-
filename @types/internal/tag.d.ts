declare namespace Internal {
  interface Tag extends RMSData.Tag {
    tagId: number;
    id: string;
    name: string;
    fields: {
      slug: string;
    };
  }
}
