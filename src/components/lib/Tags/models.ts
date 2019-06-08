export interface TagsProps {
  data: {
    title: string;
    componentName: string;
    tagsCount: number;
    customClass?: string;
    isEditable: boolean;
    loadMoreButton: LoadMoreButton;
    tagList: ItemProps[];
  };
}

export interface TagProps {
  tag: ItemProps;
  isEditable: boolean;
  handleClick: (tagName: string) => void;
}

export interface ItemProps {
  tagName: string;
  path: string;
}

export interface LoadMoreButton {
  text?: string;
  tagsPerLoad?: number;
  isEnabled: boolean;
}
