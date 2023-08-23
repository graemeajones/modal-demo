import { useState } from 'react';
import { useAuth } from '../auth/useAuth.jsx';
import useLoad from '../api/useLoad.js';
import Action from '../UI/Actions.jsx';
import ModuleForm from '../entity/module/ModuleForm.jsx';
import { CardContainer } from '../UI/Card.jsx';
import ModuleCard from '../entity/module/ModuleCard.jsx';

function Modules() {
  // Initialisation ------------------------------
  const {loggedInUser} = useAuth();
  const myModulesEndpoint = loggedInUser.UserUsertypeID === 1 
    ? `/modules/leader/${loggedInUser.UserID}`
    : `/modules/users/${loggedInUser.UserID}`;

  // State ---------------------------------------
  const [modules, , loadingMessage, loadModules] = useLoad(myModulesEndpoint);
  const [showForm, setShowForm] = useState(false);

  // Handlers ------------------------------------
  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = async () => {
    handleCancel();
    await loadModules(myModulesEndpoint);
  };

  // View ----------------------------------------
  return (
    <>
      <h1>Modules</h1>

      {!showForm && (
        <Action.Tray>
          <Action.Add showText buttonText="Add new module" onClick={handleAdd} />
        </Action.Tray>
      )}

      {showForm && <ModuleForm onCancel={handleCancel} onSuccess={handleSuccess} />}

      {!modules ? (
        <p>{loadingMessage}</p>
      ) : modules.length === 0 ? (
        <p>No records found ...</p>
      ) : (
        <CardContainer>
          {modules.map((module) => (
            <ModuleCard module={module} key={module.ModuleID} />
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Modules;
