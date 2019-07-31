export type triggerGetSearchData = (size: number) => void;
export type getSearchData = (
  searchQuery: string,
  params: SearchParams
) => Promise<void>;

export interface SearchParams {
  from?: number;
  size?: number;
}
