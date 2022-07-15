import React, { createElement } from 'react';
import type { NextPage } from 'next';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { employments } from '../src/constants/employments';
import { calcDuration } from '../src/lib/calcDuration';
import Layout from '../src/components/Layout';
import Content from '../src/components/Content';
import { socialProfiles } from '../src/constants/socialProfiles';

const AboutMePage: NextPage = () => {
    const expMonths = employments
        .map(({ dateStart, dateEnd }) => {
            const dateEndNormalized = 'present' === dateEnd ? new Date() : dateEnd;
            const { inMonths } = calcDuration(dateStart, dateEndNormalized);

            return inMonths;
        })
        .reduce((previousValue, currentValue) => previousValue + currentValue);

    const expYears = Math.floor(expMonths / 12);

    return (
        <Layout metaTitle="About Me | Sofyan Sitorus" contentHeight={380}>
            <Content title="About Me">
                <Grid container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <CardMedia
                            component="img"
                            image="/me.jpg"
                            alt="Sofyan Sitorus"
                            sx={{
                                width: 160,
                                height: 160,
                                borderRadius: '50%',
                                margin: '0 auto 20px',
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {socialProfiles.map((socialProfile, index) => {
                                const marginLeft = 0 === index ? 0 : 1;
                                const marginRight = index + 1 === socialProfiles.length ? 0 : 1;

                                return (
                                    <Link
                                        key={socialProfile.name}
                                        href={socialProfile.href}
                                        title={socialProfile.name}
                                        target="_blank"
                                        sx={{
                                            border: 1,
                                            display: 'inline-block',
                                            borderRadius: '50%',
                                            textAlign: 'center',
                                            width: '40px',
                                            height: '40px',
                                            lineHeight: '40px',
                                            paddingTop: 0.6,
                                            marginLeft,
                                            marginRight,
                                        }}
                                    >
                                        {createElement(socialProfile.icon, {
                                            fontSize: 'small',
                                        })}
                                    </Link>
                                );
                            })}
                        </Box>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Typography component="h1" variant="h4">
                            Sofyan Sitorus
                        </Typography>
                        <Typography component="h2" variant="subtitle1">
                            Web Developer{' '}
                            <Link href="https://www.elegantthemes.com/" target="_blank" underline="none">
                                @Elegant Themes
                            </Link>
                        </Typography>
                        <Divider />
                        <Typography
                            variant="body2"
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                            }}
                        >
                            I am a passionate web developer from Indonesia with{' '}
                            <NextLink href="/work-history" passHref>
                                <Link>{expYears} years of experience</Link>
                            </NextLink>{' '}
                            in the field of the web development industry. I have experienced work as a back-end and
                            front-end developer, either as part of a team or solo environment. I am a fast self-learner
                            and extremely curious about the latest web development technologies. I love to share and
                            contribute to open source{' '}
                            <NextLink href="/projects" passHref>
                                <Link>projects</Link>
                            </NextLink>{' '}
                            . I am also{' '}
                            <NextLink href="/volunteering" passHref>
                                <Link>actively involved</Link>
                            </NextLink>{' '}
                            in the local WordPress community events.
                        </Typography>
                    </Grid>
                </Grid>
            </Content>
        </Layout>
    );
};

export default AboutMePage;
