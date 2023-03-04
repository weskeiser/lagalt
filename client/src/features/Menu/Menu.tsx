import { useAuth } from "src/auth";
import { NavLink } from "src/components";
import "./style.scss";

export const Menu = ({}) => {
  const { authState } = useAuth();

  // Fix button
  return (
    <nav className="menu" aria-haspopup="menu">
      <button className="menu__hamburger-icon" aria-hidden>
        <div></div>
        <div></div>
        <div></div>
      </button>

      <ul className="menu__dropdown" role="menubar">
        <NavLink to="/">Forsiden</NavLink>

        {!authState.token && (
          <>
            <NavLink to="/logg-inn">Logg inn</NavLink>
            <NavLink to="/ny-bruker">Ny bruker</NavLink>
          </>
        )}

        <NavLink to="/">Hjelp</NavLink>

        <NavLink
          to="/$username"
          linkProps={{ params: { username: authState.username } }}
        >
          Min side
        </NavLink>
      </ul>
    </nav>
  );
};
