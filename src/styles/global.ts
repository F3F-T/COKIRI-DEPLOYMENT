import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

  @media (max-width: 768px){
    html {
      font-size: 10px;
    }
  }  
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    html {
        font-size: 14px;
    }
}
@media (min-width: 1025px) and (max-width: 1440px) {
    html {
        font-size: 16px;
    }
}
@media (min-width: 1441px) and (max-width: 1919px) {
    html {
        font-size: 17px;
    }
}
@media (min-width: 1920px) and (max-width: 2559px) {
    html {
        font-size: 17.5px;
    }
}
@media (min-width: 2560px) {
    html {
        font-size: 18px;
    }
}

`;

export default GlobalStyle;
