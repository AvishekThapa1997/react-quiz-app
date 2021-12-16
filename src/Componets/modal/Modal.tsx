import classes from "../../styles/Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "../card/Card";
import Button from "../common/Button";
import { Transition } from "react-transition-group";
type ModalProps = {
  closeModal: () => void;
  newGameHandler: () => void;
  visibility: boolean;
};
type BackdropProps = {
  closeModal: () => void;
  visibility: boolean;
};
const Backdrop: React.FC<BackdropProps> = ({ closeModal, visibility }) => (
  <div
    className={`${classes["backdrop"]} ${
      visibility ? classes["show-backdrop"] : classes["hide-backdrop"]
    }`}
    onClick={closeModal}
  ></div>
);
const ModalOverlay: React.FC<ModalProps> = ({
  closeModal,
  newGameHandler,
  visibility,
}) => {
  return (
    <Card
      propClass={`${classes["overlay-card"]} ${
        visibility ? classes["show-modal"] : classes["hide-modal"]
      }`}
    >
      <p className={classes["overlay-title"]}>Are you sure you want to exit?</p>
      <div className={classes["modal-btn-control"]}>
        <Button
          propClass={`${classes["modal-btn"]} ${classes["modal-btn-positive"]}`}
          text="Yes"
          callback={newGameHandler}
        />
        <Button
          propClass={`${classes["modal-btn"]} ${classes["modal-btn-negative"]}`}
          text="No"
          callback={closeModal}
        />
      </div>
    </Card>
  );
};
const Modal: React.FC<ModalProps> = ({
  closeModal,
  newGameHandler,
  visibility,
}) => {
  return (
    <Transition in={visibility} timeout={1000} mountOnEnter unmountOnExit>
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop closeModal={closeModal} visibility={visibility} />,
          document.getElementById("backdrop-root") as HTMLElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay
            closeModal={closeModal}
            newGameHandler={newGameHandler}
            visibility={visibility}
          />,
          document.getElementById("overlay-root") as HTMLElement
        )}
      </Fragment>
    </Transition>
  );
};
export default Modal;
