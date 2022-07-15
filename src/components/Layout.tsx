import React, { cloneElement } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Head from 'next/head';

type InnerProps = {
    contentHeight?: number;
};

type LayoutProps = InnerProps & {
    children: JSX.Element;
    metaTitle?: string;
    metaDescription?: string;
};

const Cover = styled(Box)(() => {
    return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.07)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E")`,
    };
});

const LayoutContainer = styled(Container)(({ theme }) => {
    return {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    };
});

const Inner = styled(Box, {
    shouldForwardProp: (prop: string) => -1 === ['contentHeight'].indexOf(prop),
})<InnerProps>(({ theme, contentHeight }) => {
    return {
        position: 'relative',
        height: `${contentHeight || theme.contentHeight}px`,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: '100vh',
            overflowY: 'hidden',
        },
    };
});

const Layout = ({ children, contentHeight, metaTitle, metaDescription }: LayoutProps) => (
    <Cover>
        <Head>
            {metaTitle && <title>{metaTitle}</title>}
            {metaDescription && <meta name="description" content={metaDescription} />}
        </Head>
        <LayoutContainer>
            <Inner contentHeight={contentHeight}>
                {cloneElement(children, {
                    contentHeight,
                    title: metaTitle,
                    ...children.props,
                })}
            </Inner>
        </LayoutContainer>
    </Cover>
);

export default Layout;
