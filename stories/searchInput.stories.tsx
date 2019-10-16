import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { ReactComponent as PlaceholderIcon } from '../src/svgs/inline/placeholder.svg';

import { Modal, SearchInput } from 'src/components/lib';
import searchData from 'src/components/data/search.json';
import { ReactComponent as CloseSvg } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as SearchSvg } from 'src/svgs/inline/search-icon.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalStateControl = (props: any) => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open modal</button>
      <Modal isOpen={modalState} close={closeModal} {...props}>
        {props.children}
      </Modal>
    </div>
  );
};

const content: AppContent.SearchInput.Content = {
  title: 'Looking for something?',
};

const config = {
  searchResultsCount: 8,
  labelIcon: <SearchSvg />,
  buttonResetIcon: <CloseSvg />,
  buttonSubmitIcon: <PlaceholderIcon />,
  onSubmit: () => {},
};

storiesOf('Components/SearchInput', module)
  .add('defaultView', () => {
    return <SearchInput list={searchData} content={content} {...config} />;
  })
  .add('in modal', () => {
    return (
      <ModalStateControl className="modal--search" closeBtn={<CloseSvg />}>
        <SearchInput list={searchData} content={content} {...config} />
      </ModalStateControl>
    );
  });
