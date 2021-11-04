import s from "./GoBackButton.module.css";
import { useHistory, useLocation } from "react-router";

const GoBackButton = ({ handleGoBackButton }) => {
  return (
    <>
      <button className={s.button53} type="button" onClick={handleGoBackButton}>
        BACK
      </button>
    </>
  );
};

export default GoBackButton;
