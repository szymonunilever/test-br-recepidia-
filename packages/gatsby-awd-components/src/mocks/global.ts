import { FilterIcons } from '../components/Filter';
import { ReactComponent as RemoveTagIcon, ReactComponent as CloseSvg } from '../svgs/inline/x-mark.svg';
import { ReactComponent as ClosedIcon } from '../svgs/inline/arrow-up.svg';
import { ReactComponent as FilterIcon } from '../svgs/inline/filter.svg';
import { ReactComponent as OpenIcon } from '../svgs/inline/arrow-down.svg';

export const localImage =  {
  id: '0bcf6c75-0450-554d-89c7-85316cc28839',
    childImageSharp: {
    fluid: {
      aspectRatio: 1.3888888888888888,
        base64: 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAOABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIDBP/EABUBAQEAAAAAAAAAAAAAAAAAAAAD/9oADAMBAAIQAxAAAAGEck6WxH//xAAaEAACAwEBAAAAAAAAAAAAAAABAgADEhEh/9oACAEBAAEFAmYibsNZGTv127NT/8QAFhEAAwAAAAAAAAAAAAAAAAAAARAR/9oACAEDAQE/ATF//8QAFREBAQAAAAAAAAAAAAAAAAAAECH/2gAIAQIBAT8Bp//EABwQAAEFAAMAAAAAAAAAAAAAABEAAQIxQRASIf/aAAgBAQAGPwJ43q6tIRfxA0jtINnH/8QAHBAAAgICAwAAAAAAAAAAAAAAAREAIRBBMWFx/9oACAEBAAE/IRIeXhSkNwxYcMfqQvqTR1KzUW8P/9oADAMBAAIAAwAAABC0L//EABcRAQADAAAAAAAAAAAAAAAAAAABESH/2gAIAQMBAT8QwXD/xAAXEQEBAQEAAAAAAAAAAAAAAAABABEh/9oACAECAQE/EB1yBv/EAB4QAQEAAwABBQAAAAAAAAAAAAERACExUUFhgaGx/9oACAEBAAE/EOVAbQAe8+MQpLjQridGO8UO6qGsOK31IVuIv3gXBIuioePQn7nuq+XP/9k=',
        sizes: '(max-width: 750px) 100vw, 750px',
        src: '/static/9d07b7697abd7e1ec9743ea7b0cf84fa/9f583/image.jpg',
        srcSet: '/static/9d07b7697abd7e1ec9743ea7b0cf84fa/d278e/image.jpg 200w, /static/9d07b7697abd7e1ec9743ea7b0cf84fa/8539d/image.jpg 400w,/static/9d07b7697abd7e1ec9743ea7b0cf84fa/9f583/image.jpg 750w',
        srcSetWebp: '/static/9d07b7697abd7e1ec9743ea7b0cf84fa/1932c/image.webp 200w,/static/9d07b7697abd7e1ec9743ea7b0cf84fa/f4957/image.webp 400w,/static/9d07b7697abd7e1ec9743ea7b0cf84fa/1d22b/image.webp 750w',
        srcWebp: '/static/9d07b7697abd7e1ec9743ea7b0cf84fa/1d22b/image.webp'
    }
  }
};

export const icons: FilterIcons = {
  close: CloseSvg,
  closed: ClosedIcon,
  filter: FilterIcon,
  open: OpenIcon,
  removeTag: RemoveTagIcon,
};