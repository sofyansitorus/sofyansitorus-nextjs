import React, { ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import Content from '../src/components/Content';
import { Timeline, TimelineItem } from '../src/components/Timeline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { projects } from '../src/constants/projects';

interface ItemProps {
    title: string;
    children: ReactNode;
}

const SectionTitle = styled(Box)(({ theme }) => {
    return {
        position: 'relative',
        paddingLeft: theme.spacing(1.5),
        '&:before': {
            content: '"»"',
            fontWeight: 700,
            position: 'absolute',
            left: 0,
            top: 0,
        },
        '&:after': {
            content: '":"',
            fontWeight: 700,
            position: 'absolute',
            right: 0,
            top: 0,
        },
    };
});

const SectionContent = styled(Box)(({ theme }) => {
    return {
        position: 'relative',
        paddingLeft: theme.spacing(1.5),
    };
});

const Section = ({ title, children }: ItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                padding: (theme) => theme.spacing(0.2, 0, 0, 0),
                fontSize: (theme) => theme.typography.body2,
            }}
        >
            <SectionTitle
                sx={{
                    flexShrink: 0,
                    width: '100px',
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
            <SectionContent sx={{ flexGrow: 1 }}>{children}</SectionContent>
        </Box>
    );
};

const ProjectsPage: NextPage = () => {
    const [group, setGroup] = useState('');
    const router = useRouter();

    const onClickToggleButton = (category: string) => {
        router.replace({
            pathname: router.pathname,
            query: { category },
        });
    };

    useEffect(() => {
        const queryCategory = router?.query?.category ?? '';

        if ('string' === typeof queryCategory) {
            setGroup(queryCategory);
        } else {
            setGroup(queryCategory[0]);
        }
    }, [router.query.category]);

    return (
        <Layout metaTitle="Projects | Sofyan Sitorus" contentHeight={600}>
            <Content title="Projects">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                        marginBottom: 4,
                    }}
                >
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        {projects
                            .reduce<string[]>(
                                (acc, { company }) => {
                                    const group = company || 'Open Source';

                                    if (-1 == acc.indexOf(group)) {
                                        return acc.concat(group);
                                    }

                                    return acc;
                                },
                                [''],
                            )
                            .map((group) => {
                                const category = router?.query?.category ?? '';
                                const disabled = group === category;

                                return (
                                    <Button key={group} onClick={() => onClickToggleButton(group)} disabled={disabled}>
                                        {group || 'All'}
                                    </Button>
                                );
                            })}
                    </ButtonGroup>
                </Box>
                <Timeline>
                    {projects
                        .sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime())
                        .filter(({ company }) => {
                            if (group) {
                                if (company === group) {
                                    return true;
                                }

                                if (!company && 'Open Source' === group) {
                                    return true;
                                }

                                return false;
                            }

                            return true;
                        })
                        .map(({ name, company, product, type, role, link, dateStart, dateEnd, description }) => {
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
                                durations.push(
                                    dateEnd.toLocaleDateString('en-us', {
                                        month: 'short',
                                        year: 'numeric',
                                    }),
                                );
                            }

                            return (
                                <TimelineItem
                                    key={`${name}--${company}`}
                                    icon={<CasesOutlinedIcon />}
                                    iconSize="large"
                                    duration={durations.join(' - ')}
                                >
                                    <Box>
                                        <Typography component="h4" variant="h6">
                                            <Link href={link} underline="none" target="_blank">
                                                {name}
                                            </Link>
                                        </Typography>
                                        <Divider
                                            sx={{
                                                borderColor: (theme) => theme.palette.background.paper,
                                                margin: (theme) => theme.spacing(1, 0, 1, 0),
                                            }}
                                        />
                                    </Box>
                                    {company && <Section title="Company">{company}</Section>}
                                    {product && <Section title="Product">{product}</Section>}
                                    {type && <Section title="Type">{type}</Section>}
                                    {role && <Section title="Role">{role}</Section>}
                                    <Box sx={{ paddingTop: 1.5 }}>
                                        <Typography variant="body2">{description}</Typography>
                                        <Link
                                            href={link}
                                            underline="none"
                                            target="_blank"
                                            sx={{
                                                lineHeight: '18px',
                                                fontSize: '16px',
                                                display: 'inline-block',
                                                border: 1,
                                                marginTop: 2,
                                                padding: (theme) => theme.spacing(0.5, 2),
                                                borderRadius: (theme) => theme.shape.borderRadius,
                                            }}
                                        >
                                            Show Project{' '}
                                            <OpenInNewIcon
                                                sx={{
                                                    paddingTop: 0.24,
                                                    fontSize: '14px',
                                                }}
                                            />
                                        </Link>
                                    </Box>
                                </TimelineItem>
                            );
                        })}
                </Timeline>
            </Content>
        </Layout>
    );
};

export default ProjectsPage;
