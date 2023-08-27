import useLoad from '../../api/useLoad.js';
import Modal from '../../UI/Modal.jsx';
import API from '../../api/API.js';
import RenderCount from '../../UI/RenderCount.jsx';
import Action from '../../UI/Actions.jsx';
import ModuleForm from './ModuleForm.jsx';
import { CardContainer } from '../../UI/Card.jsx';
import ModuleCard from './ModuleCard.jsx';

function ModuleCardList({ endpoint }) {
  // Initialisation ------------------------------
  const postEndpoint = '/modules';

  // State ---------------------------------------
  const [modules, , loadingMessage, loadModules] = useLoad(endpoint);
  const [showForm, formTitle, openForm, closeForm] = Modal.useModal();
  const [showNotify, notifyMessage, openNotify, closeNotify] = Modal.useModal();

  // Handlers ------------------------------------
  const handleSubmit = async (module) => await API.post(postEndpoint, module);

  const handleAddSuccess = () => {
    closeForm();
    openNotify('Module successfully created');
  };

  const handleDismiss = () => {
    closeNotify();
    loadModules(endpoint);
  };

  const handleCardSuccess = () => loadModules(endpoint);

  // View ----------------------------------------
  return (
    <>
      <RenderCount />

      <Modal show={showForm} title={formTitle}>
        <ModuleForm onCancel={closeForm} onSubmit={handleSubmit} onSuccess={handleAddSuccess} />
      </Modal>

      <Modal.Notify show={showNotify} message={notifyMessage} onDismiss={handleDismiss} />

      <Action.Tray>
        <Action.Add
          showText
          buttonText='Add new module'
          onClick={() => openForm('Add new module')}
        />
      </Action.Tray>

      {!modules ? (
        <p>{loadingMessage}</p>
      ) : modules.length === 0 ? (
        <p>No records found ...</p>
      ) : (
        <CardContainer>
          {modules.map((module) => (
            <ModuleCard module={module} key={module.ModuleID} onSuccess={handleCardSuccess} />
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default ModuleCardList;
