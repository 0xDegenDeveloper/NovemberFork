import { Section } from "../global/GlobalStyles.style";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ArtifactSelector from "./ArtifactSelector";

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* background: red; */
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

export function Modal(props) {
  if (!props.modal) return null;

  return ReactDOM.createPortal(
    <>
      <OverlayStyle onClick={props.onClose} />
      <ArtifactSelector onClose={props.onClose} />
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
