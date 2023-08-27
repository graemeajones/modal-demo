import { useState } from 'react';
import Action from './Actions.jsx';
import './Modal.scss';

const Modal = ({ show, title, children }) => {
  // View ----------------------------------------
  return show ? (
    <div className='ModalOverlay'>
      <main className='ModalPane'>
        <header>
          <p>{title}</p>
        </header>
        <main className='ModalContent'>{children}</main>
      </main>
    </div>
  ) : null;
};

const useModal = () => {
  // State ---------------------------------------
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const open = (text) => {
    setShow(true);
    setText(text);
  };
  const close = () => {
    setShow(false);
    setText('');
  };
  return [show, text, open, close];
};

const Notify = ({ show, message, onDismiss }) => {
  // Initialisations -----------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className='Notify'>
      <Modal show={show} title='Notification'>
        <main className='NotifyPane'>
          <p>{message}</p>
          <Action.Tray>
            <Action.Dismiss showText onClick={onDismiss} />
          </Action.Tray>
        </main>
      </Modal>
    </div>
  );
};

const Confirm = ({ show, message, onConfirm, onCancel }) => {
  // Initialisations -----------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className='Confirm'>
      <Modal show={show} title='Confirmation needed'>
        <main className='ConfirmPane'>
          <p>{message}</p>
          <Action.Tray>
            <Action.Yes showText onClick={onConfirm} />
            <Action.Dismiss showText onClick={onCancel} />
          </Action.Tray>
        </main>
      </Modal>
    </div>
  );
};

const Error = ({ show, message, onDismiss }) => {
  // Initialisations -----------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className='Error'>
      <Modal show={show} title='Error'>
        <main className='ErrorPane'>
          <p>{message}</p>
          <Action.Tray>
            <Action.Dismiss showText onClick={onDismiss} />
          </Action.Tray>
        </main>
      </Modal>
    </div>
  );
};

Modal.useModal = useModal;
Modal.Notify = Notify;
Modal.Confirm = Confirm;
Modal.Error = Error;

export default Modal;
