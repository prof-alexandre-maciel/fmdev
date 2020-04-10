import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    height: 28px;
    font-size: 12px;
  `,
  default: css`
    height: 36px;
    font-size: 14px;
  `,
  big: css`
    height: 44px;
    font-size: 18px;
  `
};

const colors = {
  default: css`
  background: #DEB981;

  &:hover {
    background: #4A5173;
  }
  `,
  danger: css`
    background: #e04848;

    &:hover {
      background: #a43d3d;
    }
  `,
  gray: css`
    background: #b9bbbe;
    color: #666;

    &:hover {
      background: #999;
    }
  `
};

const Button = styled.button.attrs({
  type: 'button'
})`
  
  font-size: 12px;
  padding: 0 10px;
  border-radius: none;
  color: black;
  background: #DEB981;
  border: 1px solid #DEB981;
  box-sizing: border-box;
  line-height: 18px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: normal;
  color: #FFF;
  transition: background-color 0.15s ease;

  &:hover {
    color: #FFF;
    border: 1px solid #4A5173;
  }

  ${props => sizes[props.size || 'default']}
  ${props => colors[props.color || 'default']}

  ${props => props.filled === false && css`
    background: none;
    color: #4A5173;
    border: 1px solid #4A5173;

    &:hover {
      background:#4A5173;
      color: #FFF;
    }`}

  ${props => props.isCancel === true && css`
      font-weight: normal;
      border: none !important;
    `}
  
  ${props => props.disabled === true && css`
    font-weight: normal;
    opacity: .4;

    &:hover {
      cursor: default;
    }`}
`;

export default Button;