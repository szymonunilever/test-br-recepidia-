export interface SearchResultsProps {
  list: string[];
  activeIndex: number;
  onClickHandler: (currentItemValue: number) => void;
  onHoverHandler: (currentItemValue: number) => void;
  navigateToItem: boolean;
}
