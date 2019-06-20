import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from 'src/components/lib/common/Modal';
import Icon from '../src/svgs/inline/logo.svg';

/**react-modal API https://reactcommunity.org/react-modal/#usage */

// ReactModal.setAppElement('#root');

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
      <Modal isOpen={modalState} close={closeModal}>
        {props.children}
      </Modal>
    </div>
  );
};

storiesOf('Components/Modal', module)
  .add('Modal with state control', () => {
    return (
      <ModalStateControl>
        <button>first focusable element</button>
        <button>second focusable element</button>
      </ModalStateControl>
    );
  })
  .add('Modal with custom classname and close button', () => {
    return (
      <Modal isOpen={true} className="modal--fullscreen" closeBtn={<Icon />}>
        <div>Modal content</div>
      </Modal>
    );
  })
  .add('Scrollable modal with a lot of content', () => {
    return (
      <React.Fragment>
        <ModalStateControl>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </ModalStateControl>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
        <div>page content</div>
      </React.Fragment>
    );
  });
