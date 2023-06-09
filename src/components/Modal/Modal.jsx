import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.styled.jsx';
import { Backdrop, Content } from './Modal.styled.jsx';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

  // ! ====== Add Event Listener for click Escape open modal

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // ! ====== Remove Event Listener for click Escape open modal

  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // ! ====== Common function for click Escape (window) ======

handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
};

  // ! ====== Close modal window for click backdrop ======
  handleBackdropClick = event => {
      if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  // ! ====== Render modal window ======
  render() {
    const { children } = this.props;
    return createPortal(
      <Backdrop  onClick={this.handleBackdropClick}>
        <Content >{children}</Content>
      </Backdrop>,
      modalRoot,
    );
  }
}

