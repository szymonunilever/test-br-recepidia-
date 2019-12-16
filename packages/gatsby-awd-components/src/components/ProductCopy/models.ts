import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models';

export enum ProductCopyViewType {
  Title,
  Description,
  Ingredients,
  Allergy,
}
export interface ProductCopyProps
  extends UnileverLibraryComponent<AppContent.ProductCopyContent> {
  product: RMSData.Product;
  titleLevel?: titleLevel;
  viewType: ProductCopyViewType;
}
