import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type ScrollBoxProps = {
    paddingTop?: number | string;
    paddingRight?: number | string;
    paddingBottom?: number | string;
    paddingLeft?: number | string;
    contentHeight?: number;
};

type Props = ScrollBoxProps & {
    children: ReactNode;
    title?: string;
    description?: string;
};

const ScrollBox = styled(Box, {
    shouldForwardProp: (prop: string) => -1 === ['isAnimate'].indexOf(prop),
})<ScrollBoxProps>(({ theme, paddingTop = 5, paddingRight = 5, paddingBottom = 5, paddingLeft = 5, contentHeight }) => {
    return {
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        height: `calc(${contentHeight || theme.contentHeight}px - 64px)`,
        padding: theme.spacing(paddingTop, paddingRight, paddingBottom, paddingLeft),
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)',
        },
    };
});

const AppBarContent = styled(AppBar)(({ theme }) => {
    return {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('sm')]: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
    };
});

const Content = ({ children, title, paddingTop, paddingRight, paddingBottom, paddingLeft, contentHeight }: Props) => {
    const router = useRouter();

    const onClickToggleButton = () => {
        router.push('/');
    };

    return (
        <Paper>
            <AppBarContent position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={onClickToggleButton}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            flexGrow: {
                                sm: 1,
                                xs: 0,
                            },
                            textAlign: {
                                sm: 'right',
                                xs: 'center',
                            },
                            position: {
                                sm: 'relative',
                                xs: 'absolute',
                            },
                            left: {
                                sm: 'auto',
                                xs: '64px',
                            },
                            right: {
                                sm: 'auto',
                                xs: '64px',
                            },
                        }}
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBarContent>
            <ScrollBox
                paddingTop={paddingTop}
                paddingRight={paddingRight}
                paddingBottom={paddingBottom}
                paddingLeft={paddingLeft}
                contentHeight={contentHeight}
            >
                {children}
            </ScrollBox>
        </Paper>
    );
};

export default Content;
