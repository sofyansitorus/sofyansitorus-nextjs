import React, { ReactNode, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TimelineIconProps } from './TimelineIcon';
import { iconButtonSizes } from './constant';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineContentBaseProps {
    isOdd?: boolean;
    isEven?: boolean;
    iconSize?: TimelineIconProps['iconSize'];
}

interface TimelineContentProps extends TimelineContentBaseProps {
    children: ReactNode;
}

const geBoxVariant = (isOdd: boolean) => {
    if (isOdd) {
        return {
            visible: { x: 0 },
            hidden: { x: 200 },
        };
    }

    return {
        visible: { x: 0 },
        hidden: { x: -200 },
    };
};

const TimelineContentBase = styled(motion.div, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven', 'iconSize'].indexOf(prop),
})<TimelineContentBaseProps>(({ theme, isOdd, isEven, iconSize = 'medium' }) => {
    const backgroundColor = theme.palette.getContrastText(theme.palette.background.paper);
    const arrowTop = iconButtonSizes[iconSize] ? iconButtonSizes[iconSize] / 2 : iconButtonSizes.medium / 2;

    return {
        position: 'relative',
        width: '100%',
        padding: theme.spacing(2.5),
        backgroundColor,
        color: theme.palette.getContrastText(backgroundColor),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],

        '&:after': {
            top: `${arrowTop}px`,
            border: 'solid transparent',
            content: '""',
            height: '0',
            width: '0',
            position: 'absolute',
            pointerEvents: 'none',
            borderWidth: '8px',
            marginTop: '-8px',
            borderLeftColor: isOdd && !isEven ? 'transparent' : backgroundColor,
            borderRightColor: isEven && !isOdd ? 'transparent' : backgroundColor,
            left: isOdd && !isEven ? 'auto' : '100%',
            right: isEven && !isOdd ? 'auto' : '100%',
        },

        [theme.breakpoints.down('md')]: {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            '&:after': {
                borderLeftColor: 'transparent',
                borderRightColor: backgroundColor,
                left: 'auto',
                right: '100%',
            },
        },
    };
});

const TimelineContent = ({ children, isOdd, isEven, iconSize = 'medium' }: TimelineContentProps) => {
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
        <TimelineContentBase
            ref={inViewRef}
            variants={geBoxVariant(isOdd)}
            initial="hidden"
            animate={control}
            isOdd={isOdd}
            isEven={isEven}
            iconSize={iconSize}
        >
            {children}
        </TimelineContentBase>
    );
};

export default TimelineContent;
