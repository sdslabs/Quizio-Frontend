// TODO: convert to functional

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../../styles/modules/popup.scss'

export default class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalBackdrop = document.createElement('div');
    this.modalTarget.className = 'modal';
    this.modalBackdrop.className = 'modalBackdrop';
    document.body.appendChild(this.modalTarget);
    document.body.appendChild(this.modalBackdrop);
    this._render();
    setTimeout(() => {
      this.modalTarget.classList.add('modal-in');
      this.modalBackdrop.classList.add('modalBackdrop-in');
    }, 40)

  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.modalTarget.classList.remove('modal-in');
    this.modalBackdrop.classList.remove('modalBackdrop-in');
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(this.modalTarget);
      document.body.removeChild(this.modalTarget);
      document.body.removeChild(this.modalBackdrop);
    }, 500)
  }
  renderModalDialogue() {
    return (
      <div className={this.props.modalDialogue}>
        {this.props.children}
      </div>
    )
  }
  _render() {
    ReactDOM.render(
      this.renderModalDialogue(),
      this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

export default Modal