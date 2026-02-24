import React from 'react'
import { modalComponentStyles, ModalData } from '../../Redux';
import Button from '../Button/Button';
import { isUndefined } from 'lodash';
import ReactModal from 'react-modal'
import './Modal.css'

const modalSelector = document.getElementById('loadModal');
ReactModal.setAppElement(modalSelector);

const Modal = (props: ModalData) => {
  const {
    title,
    children,
    activeModal: { active, setActive},
    headerComponent,
    footerComponent,
    noFooter,
  } = props

  const closeModal = () => setActive(false)

  return (
    <ReactModal
      isOpen={active}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      style={{...modalComponentStyles}}
    >
      {isUndefined(headerComponent) ? (
        <header className='headerModal'>
          <h2 className='modalTitle'>{title}</h2>
          <button type='button' className='modalCloseTab' onClick={closeModal}>
            <span>&times;</span>
          </button>
        </header>
        ) : headerComponent
      }
      <body className='bodyModal'>
        {children}  
      </body>
      {isUndefined(footerComponent) && !noFooter ? (
        <footer className='footerModal'>
          <Button
            variant='outline-primary'
            onClick={closeModal}
          >Cancelar</Button>
          <Button
            variant='outline-primary'
          >Aceptar</Button>
        </footer>
        ) : footerComponent
      }
    </ReactModal>
  );
}

export default Modal;