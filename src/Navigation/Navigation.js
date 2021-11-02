import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header>
      <div className={s.wrapper}>
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
      </div>
    </header>
  );
};

export default Navigation;
