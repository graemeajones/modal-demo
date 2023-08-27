import { useAuth } from '../auth/useAuth.jsx';
import ModuleCardList from '../entity/module/ModuleCardList.jsx';

function Modules() {
  // Initialisation ------------------------------
  const { loggedInUser } = useAuth();
  const modulesEndpoint =
    loggedInUser.UserUsertypeID === 1
      ? `/modules/leader/${loggedInUser.UserID}`
      : `/modules/users/${loggedInUser.UserID}`;

  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <>
      <h1>Modules</h1>
      <ModuleCardList endpoint={modulesEndpoint} />
    </>
  );
}

export default Modules;
