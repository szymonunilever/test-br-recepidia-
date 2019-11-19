declare namespace Internal {
  interface Tag extends RMSData.Tag {
    tagId: number;
    id: string;
    name: string;
    title: string;
    disclaimer?: string | null;
    fields: {
      slug: string;
    };
  }
}
