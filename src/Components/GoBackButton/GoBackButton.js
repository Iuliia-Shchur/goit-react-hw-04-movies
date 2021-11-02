import s from "./GoBackButton.module.css";
import { useHistory, useLocation } from "react-router";

const GoBackButton = () => {
  const history = useHistory();
  const location = useLocation();

  const handleGoBackButton = () => {
    history.push(location?.state?.from ?? "/");
  };
  return (
    <>
      <button className={s.button53} type="button" onClick={handleGoBackButton}>
        BACK
      </button>
    </>
  );
};

export default GoBackButton;
