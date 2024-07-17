/* eslint-disable */
import { Link } from "react-router-dom";
import handleLogout from "../../lib/logout";

export default function Navbar({ currentUser = null, setCurrentUser }) {
  return (
    <div className="navbar fixed text-text font-main bg-component">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl link-underline link-underline-black focus:text-softbluec"
        >
          Accueil
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2">
          {currentUser ? (
            <>
              <li>
                <Link
                  to="/profil"
                  className="link-underline link-underline-black focus:text-blue1"
                >
                  Profil
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleLogout(setCurrentUser)}
                  className="link-underline link-underline-black focus:text-blue1"
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="link-underline link-underline-black focus:text-blue1"
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="link-underline link-underline-black focus:text-blue1"
                >
                  Inscription
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
