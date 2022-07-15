import React, { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useLayer } from 'react-laag';
import { AnimatePresence } from 'framer-motion';
import { menus } from '../../constants/menus';
import MenuItems from './MenuItems';
import ButtonMain from './ButtonMain';

export interface MenuProps {
    isOpened?: boolean;
    isAnimate?: boolean;
    className?: string;
    onClickToggleButton?: (isOpened: boolean) => void;
    onClickMenuItem?: (isOpened: boolean) => void;
}

export const Menu = ({ isOpened, onClickToggleButton, onClickMenuItem, className }: MenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(!!isOpened);

    const { triggerProps, layerProps, renderLayer } = useLayer({
        isOpen: isMenuOpen,
        ResizeObserver,
        placement: 'center',
    });

    const toggleMenuOpen = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const _onClickToggleButton = () => {
        toggleMenuOpen();

        if (onClickToggleButton) {
            onClickToggleButton(isMenuOpen);
        }
    };

    const _onClickMenuItem = () => {
        toggleMenuOpen();

        if (onClickMenuItem) {
            onClickMenuItem(isMenuOpen);
        }
    };

    useEffect(() => {
        setIsMenuOpen(!!isOpened);
    }, [isOpened]);

    return (
        <>
            <div className={className}>
                <ButtonMain
                    {...triggerProps}
                    onClick={_onClickToggleButton}
                    size="large"
                    isOpen={isMenuOpen}
                    isAnimate={!isMenuOpen}
                />
            </div>
            {renderLayer(
                <AnimatePresence>
                    {isMenuOpen && <MenuItems {...layerProps} onClick={_onClickMenuItem} items={menus} />}
                </AnimatePresence>,
            )}
        </>
    );
};

export default Menu;
