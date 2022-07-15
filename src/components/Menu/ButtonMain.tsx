import React, { forwardRef } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export type ButtonMainProps = IconButtonProps & {
    isOpen?: boolean;
    isAnimate?: boolean;
};

const ButtonMainBase = styled(IconButton, {
    shouldForwardProp: (prop: string) => -1 === ['isAnimate'].indexOf(prop),
})<ButtonMainProps>(({ theme, size, isAnimate }) => {
    const mainStyles: Record<string, unknown> = {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.03)',
        },
    };

    if (!isAnimate) {
        return mainStyles;
    }

    let buttonSize;

    switch (size) {
        case 'large':
            buttonSize = 64;
            break;

        case 'small':
            buttonSize = 32.85;
            break;

        case 'medium':
        default:
            buttonSize = 43.42;
            break;
    }

    buttonSize = buttonSize * 2;

    const animationStyles: Record<string, unknown> = {
        '&:not(:hover):before': {
            zIndex: '-1',
            content: '""',
            position: 'absolute',
            display: 'block',
            boxSizing: 'border-box',
            animation: 'pulse 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
            borderRadius: '50%',
            top: '-50%',
            left: '-50%',
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            backgroundColor: theme.palette.primary.light,
            '@keyframes pulse': {
                '0%': {
                    transform: 'scale(.33)',
                },

                '80%, 100%': {
                    opacity: '0',
                },
            },
        },
    };

    return {
        ...mainStyles,
        ...animationStyles,
    };
});

const ButtonMain = forwardRef<HTMLButtonElement, ButtonMainProps>(function ButtonMain(
    { isOpen, isAnimate, size, onClick },
    ref,
) {
    return (
        <ButtonMainBase ref={ref} size={size} onClick={onClick} isAnimate={isAnimate}>
            {isOpen ? <CloseIcon fontSize={size} /> : <MenuIcon fontSize={size} />}
        </ButtonMainBase>
    );
});

export default ButtonMain;
