import { createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Avenir');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #E5E5E5;
    color: #FFF;
    font-family: 'Avenir', sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialised !important;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }
`;