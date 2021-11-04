import s from "./GoBackButton.module.css";

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
