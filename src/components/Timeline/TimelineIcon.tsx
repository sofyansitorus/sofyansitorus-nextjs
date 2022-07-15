import React, { ReactComponentElement, cloneElement, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { iconButtonSizes } from './constant';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export type SvgIconComponent = ReactComponentElement<typeof SvgIcon>;

interface TimelineIconBaseProps {
    isOdd?: boolean;
    isEven?: boolean;
    iconSize?: SvgIconProps['fontSize'];
}

export interface TimelineIconProps extends TimelineIconBaseProps {
    children: SvgIconComponent;
}

const boxVariant = {
    visible: { scale: 1 },
    hidden: { scale: 0 },
};

const TimelineIconBase = styled(motion.div, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven', 'iconSize'].indexOf(prop),
})<TimelineIconBaseProps>(({ theme, iconSize = 'medium' }) => {
    const backgroundColor = theme.palette.getContrastText(theme.palette.background.paper);
    const colorBackground = 'dark' === theme.palette.mode ? theme.palette.common.white : theme.palette.common.black;
    const colorText = 'dark' === theme.palette.mode ? theme.palette.common.black : theme.palette.common.white;
    const iconButtonSize = iconButtonSizes[iconSize] ? iconButtonSizes[iconSize] : iconButtonSizes.medium;

    return {
        flex: 0,
        width: `${iconButtonSize}px`,
        height: `${iconButtonSize}px`,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        color: colorText,
        left: '50%',
        right: 'auto',
        backgroundColor: colorBackground,
        top: 0,
        zIndex: 2,
        cursor: 'default',
        marginLeft: `-${iconButtonSize / 2}px`,
        borderRadius: '50%',
        // boxShadow: theme.shadows[5],
        boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12)`,
        // border: `1px solid ${colorText}`,
        '&:hover': {
            backgroundColor,
            '& svg': {
                transform: 'scale(1.13)',
            },
        },
        [theme.breakpoints.down('md')]: {
            right: 'auto',
            left: 0,
        },
    };
});

const TimelineIcon = ({ children, isOdd, isEven, iconSize = 'medium' }: TimelineIconProps) => {
    const control = useAnimation();
    const [inViewRef, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start('visible');
        } else {
            control.start('hidden');
        }
    }, [control, inView]);

    return (
        <TimelineIconBase
            ref={inViewRef}
            variants={boxVariant}
            initial="hidden"
            animate={control}
            isOdd={isOdd}
            isEven={isEven}
            iconSize={iconSize}
        >
            {cloneElement(children, {
                ...children.props,
                fontSize: iconSize,
            })}
        </TimelineIconBase>
    );
};

export default TimelineIcon;
