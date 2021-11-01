import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul className={s.list}>
          <li className={s.item}>
            <NavLink
              exact
              to="/"
              className={s.link}
              activeClassName={s.activeLink}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/movies"
              className={s.link}
              activeClassName={s.activeLink}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
