import React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import Content from '../src/components/Content';
import { Timeline, TimelineItem } from '../src/components/Timeline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { volunteers } from '../src/constants/volunteers';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

const VolunteeringPage: NextPage = () => {
    return (
        <Layout metaTitle="Volunteering | Sofyan Sitorus" contentHeight={600}>
            <Content title="Volunteering">
                <Timeline>
                    {volunteers
                        .sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime())
                        .map(({ role, organization, link, dateStart, dateEnd, description }) => {
                            const durations = [];

                            if (dateStart) {
                                durations.push(
                                    dateStart.toLocaleDateString('en-us', {
                                        month: 'short',
                                        year: 'numeric',
                                    }),
                                );
                            }

                            if (dateEnd) {
                                if ('present' === dateEnd) {
                                    durations.push('Present');
                                } else {
                                    durations.push(
                                        dateEnd.toLocaleDateString('en-us', {
                                            month: 'short',
                                            year: 'numeric',
                                        }),
                                    );
                                }
                            }

                            return (
                                <TimelineItem
                                    key={`${role}--${organization}`}
                                    icon={<VolunteerActivismOutlinedIcon />}
                                    iconSize="large"
                                    duration={durations.join(' - ')}
                                >
                                    <Box>
                                        <Typography component="h4" variant="subtitle1">
                                            {role}
                                            {organization && (
                                                <Link
                                                    href={link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    sx={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    {' '}
                                                    @{organization}
                                                </Link>
                                            )}
                                        </Typography>
                                        <Divider
                                            sx={{
                                                borderColor: (theme) => theme.palette.background.paper,
                                                margin: (theme) => theme.spacing(1, 0, 1, 0),
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">{description}</Typography>
                                    </Box>
                                </TimelineItem>
                            );
                        })}
                </Timeline>
            </Content>
        </Layout>
    );
};

export default VolunteeringPage;
