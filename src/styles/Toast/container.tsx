import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledContainer = styled(ToastContainer)`
  &&.Toastify__toast-container {
    padding: 0;
    width: auto;
    max-width: 575px;
    font-size: 1rem;
    text-align: center;
  }
  .Toastify__toast {
    position: relative;
    padding: 0;
    min-height: 0;
    border-radius: 8px;
  }
  .Toastify__toast-body {
    padding: 1rem 2.2rem;
    margin: 0;
  }
  .Toastify__slideInDown {
    from {
      transform: translate3d(0, -110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
`;

export default StyledContainer;
