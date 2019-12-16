import { UnileverLibraryComponent } from '../../models';

export interface ProductHeroProps
  extends UnileverLibraryComponent<Internal.Product> {
  className?: string;
  localImage: Internal.LocalImage;
  imageSizes: string;
}
