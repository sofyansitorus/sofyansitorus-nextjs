import React, { Children, cloneElement } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TimelineItem from './TimelineItem';

const TimelineWrapper = styled(Box, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven'].indexOf(prop),
})(({ theme }) => {
    return {
        padding: theme.spacing(0, 4),
    };
});

const TimelineBase = styled(Box, {
    shouldForwardProp: (prop: string) => -1 === ['isOdd', 'isEven'].indexOf(prop),
})(({ theme }) => {
    const backgroundColor = theme.palette.getContrastText(theme.palette.background.paper);

    return {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 'calc(50% - 2px)',
            right: 'auto',
            width: '4px',
            height: '100%',
            backgroundColor,
        },

        [theme.breakpoints.down('md')]: {
            '&:after': {
                left: '0',
            },
        },
    };
});

type TimelineProps = {
    children: JSX.Element | JSX.Element[];
};

const Timeline = ({ children }: TimelineProps) => {
    let index = 0;

    return (
        <TimelineWrapper>
            <TimelineBase>
                <Stack spacing={4}>
                    {Children.map(children, (child) => {
                        if (child.type !== TimelineItem) {
                            return null;
                        }

                        const isOdd = 0 === index % 2;
                        const isEven = !isOdd;

                        index++;

                        return cloneElement(child, {
                            ...child.props,
                            isOdd,
                            isEven,
                        });
                    })}
                </Stack>
            </TimelineBase>
        </TimelineWrapper>
    );
};

export default Timeline;
