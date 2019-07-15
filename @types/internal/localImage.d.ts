declare namespace Internal {
  interface LocalImage {
    id: string;
    childImageSharp: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fluid?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fixed?: any;
    };
  }
}
