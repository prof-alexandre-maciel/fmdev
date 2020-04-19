import styled, { css, createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { initializeIcons } from '@uifabric/icons';
import { loadTheme } from 'office-ui-fabric-react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export const primaryColor = '#4A5173';
const secondaryColor = '#000';
export const terciaryColor = '#DEB981';
export const fontFamily = 'Avenir';

loadTheme({
  palette: {
    themePrimary: terciaryColor,
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff'
  }
});

initializeIcons();

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Avenir');
  @import url('https://fonts.googleapis.com/css?family=Mada');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #E5E5E5;
    color: #FFF;
    font-family: ${fontFamily}, sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialised !important;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }

  .p-button {
    background-color: ${primaryColor} !important;
    border-color: ${primaryColor} !important;
  }

  .p-picklist .p-picklist-list .p-picklist-item.p-highlight {
    background-color: ${primaryColor} !important;
    border-color: ${primaryColor} !important;
  }

  .MuiList-padding {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .input {
    padding: 10px;
    border-radius: 3px;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;
    border: 1px solid #FFF;

    &:focus {
      border: 1px solid #000;
    }
  }

  .active-chip {
    padding-left: .4vw !important;
    font-family: ${fontFamily} !important;
    color: #FFF !important;
    background-color: ${primaryColor} !important;
    }

  .inactive-chip {
    padding-left: .4vw !important;
    color: ${primaryColor} !important;
    font-family: ${fontFamily} !important;
    background-color: transparent !important;
    border: .8px solid ${primaryColor} !important;
  }

  .lms-card {
    width: 30.5%;
    margin: .5vw;
    background-color: #FBFBFB !important; 
    font-family: ${fontFamily} !important;
  }
`;

export const ComboBoxStyle = {
  container: {
    marginBottom: '1rem',
    '&:hover': {
      border: '1px solid red'
    }
  },
  root: {
    backgroundColor: '#F5F5F5',
    '&:hover': {
      border: '1px solid red'
    }
  },
  input: {
    backgroundColor: '#F5F5F5',
    '&:hover': {
      border: '1px solid red'
    }
  }
}

export const selectStyle = {
  container: (provided) => ({
    ...provided,
    width: '100%',

    fontSize: 12,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: secondaryColor,
    padding: 5
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: secondaryColor,
    borderRadius: '0 8px 8px 0',
    "&:hover": {
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: secondaryColor,
    }
  }),
  dropdownIndicator: (provided) => {
    return {
      ...provided,
      color: secondaryColor,
      padding: 5,
      ":hover": {
        color: secondaryColor
      }
    }
  },
  multiValue: (provided) => ({
    ...provided,
    borderRadius: 16
  }),
  groupHeading: (provided) => ({
    ...provided,
    color: secondaryColor
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: 30
  }),
  control: (provided, state) => {
    return {
      ...provided,
      backgroundColor: '#F9F9F9',
      boxShadow: state.isFocused || state.isHovered ? `0 0 0 1px ${secondaryColor}` : null,
      "&:hover": {
        borderColor: secondaryColor,
      },
      borderWidth: 1,
      minHeight: 30
    }
  },
  option: (provided, state) => {
    let color = '#000';
    let background;

    if (state.isFocused && !state.isSelected) {
      color = secondaryColor;
      background = '#EEE';
    }

    if (state.isSelected) {
      color = '#FFF';
      background = secondaryColor;
    }

    return {
      ...provided,
      color,
      background,
      ":active": {
        color: '#FFF',
        backgroundColor: secondaryColor
      }
    }
  }
}

export const Table = styled.table`
  color: black;
  width: 100%;
  border-spacing: 0;
  padding-top: 1rem;
  font-size: 14px;

  tr:nth-child(even) {
    background-color: #FAFAFA;
  }

  thead > tr > td {
    border-bottom: 1px dashed #000;
  }

  button {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      color: #FFF;
    }
  }
`;

export const FirstHeaderColumn = styled.td`
  padding: .7rem;
  padding-left: 2rem;
  font-weight: bold;
`;

export const HeaderColumn = styled.td`
  padding: .7rem;
  font-weight: bold;
`;

export const FirstItemColumn = styled.td`
  padding-left: 2rem;
`;

export const ItemColumn = styled.td`
  padding: .7rem;

  ${props => props.isClicked && css`
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
  }
`;

export const StatusMsgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  padding-bottom: 15vh;
  color: #000;
  opacity: .5;
  font-size: 1.2rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  padding-bottom: 15vh;
`;