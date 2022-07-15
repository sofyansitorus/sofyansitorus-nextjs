import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { distanceFromCenter, iconButtonSizes } from './constant';
import Typography from '@mui/material/Typography';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineDurationBaseProps {
    isOdd?: boolean;
    isEven?: boolean;
    iconSize?: SvgIconProps['fontSize'];
}

export interface TimelineDurationProps extends TimelineDurationBaseProps {
    children: string;
}

const geBoxVariant = (isOdd: boolean) => {
    if (isOdd) {
        return {
            visible: { x: 0 },
            hidden: { x: -200 },
        };
    }

    return {
        visible: { x: 0 },
        hidden: { x: 200 },
    };
};

const TimelineDurationBase = styled(motion.div, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven', 'iconSize'].indexOf(prop),
})<TimelineDurationBaseProps>(({ theme, isOdd, isEven, iconSize = 'medium' }) => {
    const backgroundColor = theme.palette.getContrastText(theme.palette.background.paper);
    const iconButtonSize = iconButtonSizes[iconSize] ? iconButtonSizes[iconSize] : iconButtonSizes.medium;
    const left = isOdd && !isEven ? 'auto' : `calc(100% + ${distanceFromCenter * 2}px)`;
    const right = isEven && !isOdd ? 'auto' : `calc(100% + ${distanceFromCenter * 2}px)`;

    return {
        flex: 0,
        position: 'absolute',
        color: backgroundColor,
        backgroundColor: 'transparent',
        left,
        right,
        top: 0,
        zIndex: 2,
        lineHeight: `${iconButtonSize}px`,
        [theme.breakpoints.down('md')]: {
            position: 'relative',
            color: theme.palette.getContrastText(backgroundColor),
            backgroundColor,
            left: 'auto',
            right: '0',
            borderBottomRightRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            padding: theme.spacing(0, 2.5, 2.5),
            textAlign: 'right',
            // left: 'auto',
            // right: '0',
            // animation: 'none',
            // alignSelf: 'stretch',
            // flex: 1,
            // width: '100%',
            //     top: 'auto',
            //     right: 'auto',
            //     left: '0',
            //     bottom: 0,
            //     color: theme.palette.getContrastText(backgroundColor),
        },
    };
});

const TimelineDuration = ({ children, isOdd, isEven, iconSize = 'medium' }: TimelineDurationProps) => {
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
        <TimelineDurationBase
            ref={inViewRef}
            variants={geBoxVariant(isOdd)}
            initial="hidden"
            animate={control}
            isOdd={isOdd}
            isEven={isEven}
            iconSize={iconSize}
        >
            <Typography
                variant="body2"
                sx={{
                    lineHeight: {
                        md: `${iconButtonSizes[iconSize]}px`,
                        sm: 1,
                        xs: 1,
                    },
                    whiteSpace: 'nowrap',
                    borderTop: (theme) => {
                        return {
                            md: 'none',
                            sm: `1px solid ${theme.palette.background.paper}`,
                            xs: `1px solid ${theme.palette.background.paper}`,
                        };
                    },
                    paddingTop: (theme) => {
                        return {
                            md: 0,
                            sm: theme.spacing(1.4),
                            xs: theme.spacing(1.4),
                        };
                    },
                }}
            >
                {children}
            </Typography>
        </TimelineDurationBase>
    );
};

export default TimelineDuration;
