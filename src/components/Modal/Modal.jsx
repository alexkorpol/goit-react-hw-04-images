import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.styled.jsx';
import { Backdrop, Content } from './Modal.styled.jsx';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {

    // ! ====== Function for click Escape (window) ======
    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      }
    };

    // ! ====== Set addEventListener for click Escape ====
     window.addEventListener('keydown', handleKeyDown);

    // ! ====== Remove removeEventListener for click Escape after close modal window ======
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);

  // ! ====== Close modal window for click backdrop ======
  const handleBackdropClick = event => {
      if (event.currentTarget === event.target) {
      onClose();
    }
  };

  // ! ====== Render modal window ======
    return createPortal(
      <Backdrop  onClick={handleBackdropClick}>
        <Content >{children}</Content>
      </Backdrop>,
      modalRoot
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};
