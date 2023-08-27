import PropTypes from 'prop-types';
import API from '../../api/API.js';
import Modal from '../../UI/Modal.jsx';
import ModuleForm from './ModuleForm.jsx';
import { Card } from '../../UI/Card.jsx';
import Action from '../../UI/Actions.jsx';
import './ModuleCard.scss';

function ModuleCard({ module, onSuccess }) {
  // Initialisation ------------------------------
  const endpoint = `/modules/${module.ModuleID}`;

  // State ---------------------------------------
  const [showForm, formTitle, openForm, closeForm] = Modal.useModal();
  const [showNotify, notifyMessage, openNotify, closeNotify] = Modal.useModal();
  const [showConfirm, confirmMessage, openConfirm, closeConfirm] = Modal.useModal();
  const [showError, errorMessage, openError, closeError] = Modal.useModal();

  // Handlers ------------------------------------
  const handleSubmit = async (module) => await API.put(endpoint, module);

  const handleDelete = async () => {
    const result = await API.delete(endpoint);
    if (result.isSuccess) {
      closeConfirm();
      openNotify('Module successfully deleted');
    } else openError(`Network error: ${result.message}`);
  };

  const handleDismiss = () => {
    closeNotify();
    onSuccess();
  };

  const handleSuccess = () => {
    closeForm();
    openNotify('Module successfully modified');
  };

  // View ----------------------------------------
  return (
    <div className='moduleCard'>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm
          onCancel={closeForm}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
          inputModule={module}
        />
      </Modal>

      <Modal.Notify show={showNotify} message={notifyMessage} onDismiss={handleDismiss} />

      <Modal.Confirm
        show={showConfirm}
        message={confirmMessage}
        onConfirm={handleDelete}
        onCancel={closeConfirm}
      />

      <Modal.Error show={showError} message={errorMessage} onDismiss={closeError} />

      <Card>
        <div className='moduleInfo'>
          <p>{module.ModuleCode}</p>
          <p>{module.ModuleName}</p>
          <img src={module.ModuleImageURL} alt={module.ModuleName} />
        </div>
        <Action.Tray>
          <Action.Modify showText onClick={() => openForm('Modify module')} />
          <Action.Delete
            showText
            onClick={() => openConfirm('Are you sure you want to delete this module?')}
          />
        </Action.Tray>
      </Card>
    </div>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.shape({
    ModuleCode: PropTypes.string.isRequired,
    ModuleName: PropTypes.string.isRequired,
    ModuleImageURL: PropTypes.string.isRequired,
  }),
  onSuccess: PropTypes.func,
};

export default ModuleCard;
