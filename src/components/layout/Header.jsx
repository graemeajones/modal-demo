import {useAuth} from '../auth/useAuth.jsx';
import './Header.scss';

function Header() {
  // Initialisation ------------------------------
  const {loggedInUser} = useAuth();
  
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <header>
      <h1>API Fetch Demo</h1>
      {
        loggedInUser &&
          <p className="welcome">Welcome {loggedInUser.UserFirstname}</p>
      }
    </header>
  );
}

export default Header;
