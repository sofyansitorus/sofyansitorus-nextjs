import React, { useState, Fragment, MouseEvent, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import animations from '../lib/animations';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
}));

const DrawerInner = styled(Paper)(() => ({
    borderRadius: 0,
    backgroundImage: 'none',
}));

const DrawerSectionTitle = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(1, 0, 0, 0),
}));

const DrawerButtonOpen = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    minHeight: '64px',

    [theme.breakpoints.down('sm')]: {
        minHeight: '56px',
    },
}));

const modes = [
    {
        id: 'dark',
        label: 'Dark',
    },
    {
        id: 'light',
        label: 'Light',
    },
];

export interface iOnChangeParams {
    mode?: 'dark' | 'light';
    animation?: string;
}

interface iThemeSwitcherProps extends iOnChangeParams {
    onChange?: (param: iOnChangeParams) => void;
}

const ThemeSwitcher = ({ onChange, animation, mode }: iThemeSwitcherProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [modeSelected, setModeSelected] = useState<iOnChangeParams['mode']>(mode);
    const [animationSelected, setAnimationSelected] = useState(animation);

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const openDrawer = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setIsDrawerOpen(true);
    };

    const onChangeMode = (event: React.MouseEvent<HTMLElement>, value: iOnChangeParams['mode']) => {
        event.preventDefault();

        setModeSelected(value);

        if (onChange) {
            onChange({
                mode: value,
                animation: animationSelected,
            });
        }
    };

    const onChangeAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnimationSelected(event.target.value);

        if (onChange) {
            onChange({
                animation: event.target.value,
                mode: modeSelected,
            });
        }
    };

    useEffect(() => {
        if (mode !== modeSelected) {
            setModeSelected(mode);
        }
    }, [mode, modeSelected]);

    useEffect(() => {
        if (animation !== animationSelected) {
            setAnimationSelected(animation);
        }
    }, [animation, animationSelected]);

    return (
        <Fragment>
            {!isDrawerOpen && (
                <DrawerButtonOpen>
                    <IconButton onClick={openDrawer}>
                        <SettingsIcon />
                    </IconButton>
                </DrawerButtonOpen>
            )}

            <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
                <DrawerInner>
                    <DrawerHeader>
                        <IconButton onClick={closeDrawer}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            Settings
                        </Typography>
                    </DrawerHeader>
                </DrawerInner>
                <Divider />
                <DrawerInner>
                    <DrawerSectionTitle>Mode</DrawerSectionTitle>

                    <ToggleButtonGroup color="primary" value={modeSelected} onChange={onChangeMode} exclusive fullWidth>
                        {modes.map(({ id, label }) => (
                            <ToggleButton key={id} value={id}>
                                {label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <DrawerSectionTitle>Animation</DrawerSectionTitle>
                    <List>
                        {animations.map(({ name }, index) => {
                            const labelId = `checkbox-list-secondary-label-${name}`;
                            return (
                                <ListItem
                                    key={name}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            onChange={onChangeAnimation}
                                            value={name}
                                            checked={animationSelected ? animationSelected === name : 0 === index}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemText id={labelId} primary={name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </DrawerInner>
            </Drawer>
        </Fragment>
    );
};

export default ThemeSwitcher;
