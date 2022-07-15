import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

export interface ButtonItemProps {
    children: ReactNode;
    buttonSize?: number;
}

const buttonSizeDefault = 48;

const ButtonItem = styled(motion.a, {
    shouldForwardProp: (prop: string) => -1 === ['buttonSize'].indexOf(prop),
})<ButtonItemProps>(({ theme, buttonSize = buttonSizeDefault }) => {
    return {
        position: 'absolute',
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '1px 1px 6px 0px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease-in-out, border 0.15s ease-in-out',
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.light}`,
        pointerEvents: 'all',
        willChange: 'transform',

        '& svg': {
            transition: '0.15s ease-in-out',
        },

        '&:hover': {
            boxShadow: '1px 1px 10px 0px rgba(0, 0, 0, 0.15)',
            color: theme.palette.primary.dark,

            '& svg': {
                transform: 'scale(1.15)',
            },
        },
    };
});

export default ButtonItem;
