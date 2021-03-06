declare namespace Internal {
  interface LocalImage {
    id?: string;
    ext?: string;
    fields?: {
      publicURL?: string;
    };
    childImageSharp: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fluid?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fixed?: any;
    };
  }
}
