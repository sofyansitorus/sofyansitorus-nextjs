import React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Layout from '../src/components/Layout';
import Content from '../src/components/Content';

const CreditsPage: NextPage = () => {
    return (
        <Layout metaTitle="Credits | Sofyan Sitorus">
            <Content title="Credits">
                <Typography>I developed this web website as the outcome of my learning to NextJs and MUI. </Typography>
            </Content>
        </Layout>
    );
};

export default CreditsPage;
