import type { AppProps } from 'next/app';
import React from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeSwitcher, { iOnChangeParams } from '../src/components/ThemeSwitcher';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';

import animations from '../src/lib/animations';
import themes from '../src/lib/themes';

function MyApp({ Component, pageProps, router }: AppProps) {
    const [selectedMode, setSelectedMode] = useState<iOnChangeParams['mode']>('dark');
    const [selectedAnimation, setSelectedAnimation] = useState(animations[0].name);
    const [isAnimating, setIsAnimating] = useState(false);

    const getAnimation = useCallback(() => {
        return animations.find(({ name }) => name === selectedAnimation);
    }, [selectedAnimation]);

    const onChangeThemeSwitcher = ({ mode, animation }: iOnChangeParams) => {
        if (mode) {
            setSelectedMode(mode);
        }

        if (animation) {
            setSelectedAnimation(animation);
        }
    };

    const onAnimationStart = () => {
        setIsAnimating(true);
    };

    const onAnimationComplete = () => {
        setIsAnimating(false);
    };

    const animatingStyles = isAnimating
        ? {
              overflow: 'hidden',
          }
        : {};

    return (
        <ThemeProvider theme={selectedMode ? themes[selectedMode] : {}}>
            <CssBaseline />
            <ThemeSwitcher mode={selectedMode} animation={selectedAnimation} onChange={onChangeThemeSwitcher} />
            <Box style={animatingStyles}>
                <LazyMotion features={domAnimation}>
                    <AnimatePresence exitBeforeEnter>
                        <m.div
                            key={router.route.concat(getAnimation()?.name ?? '')}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={getAnimation()?.variants}
                            transition={getAnimation()?.transition}
                            onAnimationStart={onAnimationStart}
                            onAnimationComplete={onAnimationComplete}
                        >
                            <Component paletteMode={selectedMode} {...pageProps} />
                        </m.div>
                    </AnimatePresence>
                </LazyMotion>
            </Box>
        </ThemeProvider>
    );
}

export default MyApp;
