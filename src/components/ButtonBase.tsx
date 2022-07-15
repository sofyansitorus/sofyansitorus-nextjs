import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { PRIMARY, PRIMARY_2, BUTTON_SIZE } from '../constants/menus';
import { CSSProperties } from 'react';

interface iButtonBaseProps {
    isOpen?: boolean;
    isAnimated?: boolean;
    buttonSize?: number;
    backgroundColor?: CSSProperties['backgroundColor'];
    backgroundColorHover?: CSSProperties['backgroundColor'];
}

const pulse = keyframes`
  0% {
    transform: scale(.33);
  }

  80%,
  100% {
    opacity: 0;
  }
`;

const ButtonBase = styled.button<iButtonBaseProps>`
    position: relative;
    width: ${(p) => (p.buttonSize ? p.buttonSize : BUTTON_SIZE)}px;
    height: ${(p) => (p.buttonSize ? p.buttonSize : BUTTON_SIZE)}px;
    color: white;
    border: none;
    background-color: ${(p) => (p.isOpen ? PRIMARY_2 : PRIMARY)};
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: ${PRIMARY_2};
        transform: scale(1.03);
    }

    &:not(:hover):before {
        z-index: -1;
        content: '';
        position: absolute;
        display: ${(p) => (p.isAnimated ? 'block' : 'none')};
        box-sizing: border-box;
        background-color: ${(p) => (p.isAnimated ? PRIMARY_2 : 'transparent')};
        animation: ${(p) => (p.isAnimated ? `${pulse} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite` : 'none')};
        border-radius: 50%;
        top: -50%;
        left: -50%;
        width: ${(p) => 2 * (p.buttonSize ? p.buttonSize : BUTTON_SIZE)}px;
        height: ${(p) => 2 * (p.buttonSize ? p.buttonSize : BUTTON_SIZE)}px;
    }

    & div {
        transition: 0.25s ease-in-out;
        transform: rotate(${(p) => (p.isOpen ? 360 : 0)}deg);
    }
`;

export default ButtonBase;
