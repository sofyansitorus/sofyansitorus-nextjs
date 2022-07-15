import React, { ReactNode } from 'react';
import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import Content from '../src/components/Content';
import { employments } from '../src/constants/employments';
import { Timeline, TimelineItem } from '../src/components/Timeline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import { styled } from '@mui/material/styles';

interface ItemProps {
    title: string;
    children: ReactNode;
}

const SectionTitle = styled(Box)(({ theme }) => {
    return {
        position: 'relative',
        '&:after': {
            content: '":"',
            position: 'absolute',
            right: theme.spacing(1.8),
            top: 0,
            fontWeight: 700,
        },
    };
});

const Section = ({ title, children }: ItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                padding: (theme) => theme.spacing(1, 0),
                fontSize: (theme) => theme.typography.body2,
            }}
        >
            <SectionTitle
                sx={{
                    flexShrink: 0,
                    minWidth: '70px',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    {title}
                </Typography>
            </SectionTitle>
            <Box sx={{ flexGrow: 1 }}>{children}</Box>
        </Box>
    );
};

const List = styled('ul')(({ theme }) => {
    return {
        margin: 0,
        listStyle: 'outside',
        paddingInlineStart: theme.spacing(1),
    };
});

const ListItem = styled('li')(({ theme }) => {
    return {
        paddingInlineStart: theme.spacing(0.6),
        '&::marker': {
            content: '"»"',
            fontWeight: 700,
        },
    };
});

const ChipUnorderedList = styled('ul')(({ theme }) => {
    return {
        paddingInlineStart: 0,
        margin: 0,
        listStyle: 'outside',
        color: theme.palette.background.paper,
    };
});

const ChipListItem = styled('li')(({ theme }) => {
    return {
        color: theme.palette.background.paper,
        paddingInlineStart: 0,
        margin: theme.spacing(0, 0.5, 0.5, 0),
        '& .MuiChip-label': {
            color: theme.palette.background.paper,
        },
        '&:last-of-type': {
            marginRight: 0,
        },
    };
});

const WorkHistoryPage: NextPage = () => {
    return (
        <Layout metaTitle="Work History | Sofyan Sitorus" contentHeight={600}>
            <Content title="Work History">
                <Timeline>
                    {employments
                        .sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime())
                        .map(
                            ({
                                companyName,
                                companyWebsite,
                                companyLocation,
                                isRemoteWork,
                                jobTitle,
                                jobDuties,
                                jobSkills,
                                dateStart,
                                dateEnd,
                            }) => {
                                const dateStartText = dateStart.toLocaleDateString('en-us', {
                                    month: 'short',
                                    year: 'numeric',
                                });

                                const dateEndText =
                                    'present' === dateEnd
                                        ? 'Present'
                                        : dateEnd.toLocaleDateString('en-us', {
                                              month: 'short',
                                              year: 'numeric',
                                          });

                                return (
                                    <TimelineItem
                                        key={`${companyName}-${jobTitle}`}
                                        icon={<WorkHistoryOutlinedIcon />}
                                        iconSize="large"
                                        duration={`${dateStartText} - ${dateEndText}`}
                                    >
                                        {jobTitle && (
                                            <Box>
                                                <Typography
                                                    component="h4"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: {
                                                            xs: 16,
                                                            sm: 18,
                                                            md: 20,
                                                        },
                                                    }}
                                                >
                                                    {jobTitle}
                                                    {companyName && (
                                                        <Link
                                                            href={companyWebsite}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            underline="none"
                                                        >
                                                            {' '}
                                                            @{companyName}
                                                        </Link>
                                                    )}
                                                </Typography>
                                                {companyLocation && (
                                                    <Typography variant="body2">
                                                        {companyLocation}
                                                        {isRemoteWork && ' (Remote)'}
                                                    </Typography>
                                                )}
                                                <Divider
                                                    sx={{
                                                        borderColor: (theme) => theme.palette.background.paper,
                                                        margin: (theme) => theme.spacing(1, 0, 1, 0),
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        {jobDuties && (
                                            <Section title="Duties">
                                                <List>
                                                    {jobDuties.map((item) => {
                                                        return (
                                                            <ListItem key={item}>
                                                                <Typography variant="body2">{item}.</Typography>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Section>
                                        )}
                                        {jobSkills && (
                                            <Section title="Skills">
                                                <ChipUnorderedList>
                                                    {jobSkills.map((jobSkill) => {
                                                        return (
                                                            <Chip
                                                                key={jobSkill}
                                                                label={jobSkill}
                                                                size="small"
                                                                variant="outlined"
                                                                component={ChipListItem}
                                                                sx={{
                                                                    fontSize: '12px',
                                                                }}
                                                            />
                                                        );
                                                    })}
                                                </ChipUnorderedList>
                                            </Section>
                                        )}
                                    </TimelineItem>
                                );
                            },
                        )}
                </Timeline>
            </Content>
        </Layout>
    );
};

export default WorkHistoryPage;
