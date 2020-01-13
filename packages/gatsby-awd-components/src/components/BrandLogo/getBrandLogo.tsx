import { ReactComponent as KnorrLogoIcon } from '../../svgs/inline/logo-knorr.svg';
import { ReactComponent as HellmannsLogoIcon } from '../../svgs/inline/logo-hellmanns-filled.svg';
import { ReactComponent as MaizenaLogoIcon } from '../../svgs/inline/logo-maizena.svg';
import { iconNormalize } from '../../utils';

export const getBrandLogo = (brand: string | undefined) => {
  switch (brand) {
    case 'knorr':
      return iconNormalize(KnorrLogoIcon);
    case 'hellmanns':
      return iconNormalize(HellmannsLogoIcon);
    case 'maizena':
      return iconNormalize(MaizenaLogoIcon);
    default: return null
  }
};
