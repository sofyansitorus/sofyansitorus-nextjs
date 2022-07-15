import React from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Menu from '../src/components/Menu/Menu';

import Layout from '../src/components/Layout';

const HomePage: NextPage = () => {
    return (
        <Layout metaTitle="Sofyan Sitorus | WordPress Developer">
            <Box
                sx={{
                    width: '64px',
                    height: '64px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginLeft: '-32px',
                    marginTop: '-32px',
                }}
            >
                <Menu isOpened />
            </Box>
        </Layout>
    );
};

export default HomePage;
