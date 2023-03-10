import "./Menu.style.scss";
import { Logo } from "src/components/Logo/Logo";
import { NavLink } from "src/components/NavLink/NavLink";
import { useRouterContext } from "@tanstack/react-router";
import { useEffect } from "react";
import { IMenu } from "./Menu.types";
import { useAuth } from "src/auth/Auth.Provider";

export const Menu = ({ activeOverlay, toggleOverlay }: IMenu) => {
  const { authState } = useAuth();

  const { state } = useRouterContext();

  useEffect(() => {
    if (state.status === "pending") {
      toggleOverlay({ type: "close", overlay: null });
    }
  }, [state]);

  return (
    <nav className="main-header__menu" aria-haspopup="menu">
      <button
        className="main-header__menu__hamburger"
        aria-hidden
        onPointerUp={() => toggleOverlay({ overlay: "menu", type: "toggle" })}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>

      <Logo />

      <ul
        className="main-header__menu__dropdown"
        role="menubar"
        aria-expanded={activeOverlay === "menu"}
      >
        <NavLink to="/">Forsiden</NavLink>

        <NavLink
          to="/$username/nytt-prosjekt"
          linkProps={{ params: { username: authState.username } }}
        >
          Nytt prosjekt
        </NavLink>

        <NavLink
          to="/$username"
          linkProps={{ params: { username: authState.username } }}
        >
          Min side
        </NavLink>

        <NavLink to="/">Hjelp</NavLink>

        {!authState.username || authState.username === "anon" ? (
          <>
            <NavLink to="/logg-inn">Logg inn</NavLink>
            <NavLink to="/ny-bruker">Ny bruker</NavLink>
          </>
        ) : (
          <NavLink to="/logg-ut">Logg ut</NavLink>
        )}
      </ul>
    </nav>
  );
};
