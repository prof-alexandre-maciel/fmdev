import { createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { initializeIcons } from '@uifabric/icons';
import { loadTheme } from 'office-ui-fabric-react';
import 'react-perfect-scrollbar/dist/css/styles.css';

const baseColor = '#000';

loadTheme({
  palette: {
    themePrimary: '#DEB981',
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
    color: baseColor,
    padding: 5
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    borderRadius: '0 8px 8px 0'

  }),
  dropdownIndicator: (provided) => {
    return {
      ...provided,
      color: baseColor,
      padding: 5,
      ":hover": {
        color: baseColor
      }
    }
  },
  multiValue: (provided) => ({
    ...provided,
    borderRadius: 16
  }),
  groupHeading: (provided) => ({
    ...provided,
    color: baseColor
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: 30
  }),
  control: (provided, state) => {
    return {
      ...provided,
      backgroundColor: '#F9F9F9',
      boxShadow: state.isFocused || state.isHovered ? `0 0 0 1px ${baseColor}` : null,
      "&:hover": {
        borderColor: baseColor,
      },
      borderWidth: 1,
      minHeight: 30
    }
  },
  option: (provided, state) => {
    let color;
    let background;

    if (state.isFocused && !state.isSelected) {
      color = baseColor;
      background = '#EEE';
    }

    if (state.isSelected) {
      color = '#FFF';
      background = baseColor;
    }

    return {
      ...provided,
      color,
      background,
      ":active": {
        color: '#FFF',
        backgroundColor: baseColor
      }
    }
  }
}