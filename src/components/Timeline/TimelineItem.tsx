import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TimelineIcon, { SvgIconComponent, TimelineIconProps } from './TimelineIcon';
import TimelineDuration from './TimelineDuration';
import TimelineContent from './TimelineContent';
import { distanceFromCenter } from './constant';
import { motion } from 'framer-motion';

interface TimelineItemBaseProps {
    isOdd?: boolean;
    isEven?: boolean;
    iconSize?: TimelineIconProps['iconSize'];
}

interface TimelineItemProps extends TimelineItemBaseProps {
    children: ReactNode;
    icon?: SvgIconComponent;
    duration?: string;
}

const TimelineItemWrapper = styled(Box, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven', 'iconSize'].indexOf(prop),
})<TimelineItemBaseProps>(({ theme, isOdd }) => {
    return {
        position: 'relative',
        display: 'flex',
        justifyContent: isOdd ? 'flex-end' : 'flex-start',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-end',
        },
    };
});

const TimelineItemBase = styled(motion.div, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven', 'iconSize'].indexOf(prop),
})<TimelineItemBaseProps>(({ theme }) => {
    return {
        position: 'relative',
        width: `calc(50% - ${distanceFromCenter}px)`,
        background: 'red',

        [theme.breakpoints.down('md')]: {
            width: `calc(100% - ${distanceFromCenter}px)`,
        },
    };
});

const TimelineItem = ({ children, isOdd, isEven, duration, icon, iconSize = 'medium' }: TimelineItemProps) => {
    return (
        <TimelineItemWrapper isOdd={isOdd} isEven={isEven}>
            <TimelineItemBase isOdd={isOdd} isEven={isEven} iconSize={iconSize}>
                <TimelineContent isOdd={isOdd} isEven={isEven} iconSize={iconSize}>
                    {children}
                </TimelineContent>
                {duration && (
                    <TimelineDuration isOdd={isOdd} isEven={isEven} iconSize={iconSize}>
                        {duration}
                    </TimelineDuration>
                )}
            </TimelineItemBase>
            {icon && (
                <TimelineIcon isOdd={isOdd} isEven={isEven} iconSize={iconSize}>
                    {icon}
                </TimelineIcon>
            )}
        </TimelineItemWrapper>
    );
};

export default TimelineItem;
