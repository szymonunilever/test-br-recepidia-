declare namespace Internal {
  interface Tag extends RMSData.Tag {
    tagId: number;
    id: string;
    name: string;
    title: string;
    fields: {
      slug: string;
    };
  }
}
