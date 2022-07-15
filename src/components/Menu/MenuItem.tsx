import React, { useState, CSSProperties, MouseEvent, createElement } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useHover, useLayer } from 'react-laag';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SvgIcon } from '@mui/material';
import { RADIUS } from '../../constants/menus';
import getTransform from './utils/getTransform';
import TooltipBox from './TooltipBox';
import ButtonItem from './ButtonItem';

export interface MenuItemBaseProps {
    icon: typeof SvgIcon;
    label: string;
    href: string;
}

export interface MenuItemProps extends MenuItemBaseProps {
    style?: CSSProperties;
    className?: string;
    index: number;
    totalItems: number;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

function MenuItem({ style, className, icon, label, index, totalItems, href, onClick }: MenuItemProps) {
    const [isParentOpen, setIsParentOpen] = useState(true);
    const [isOpen, bind] = useHover({ delayEnter: 300, delayLeave: 100 });

    const { triggerProps, layerProps, renderLayer } = useLayer({
        isOpen: isOpen && isParentOpen,
        ResizeObserver,
        auto: true,
        containerOffset: 16,
        triggerOffset: 6,
        onParentClose: () => setIsParentOpen(false),
    });

    return (
        <>
            <Link href={href} passHref>
                <ButtonItem
                    {...triggerProps}
                    {...bind}
                    className={className}
                    style={style}
                    onClick={onClick}
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 1, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transformTemplate={({ x }) => {
                        return getTransform(parseFloat(`${x}`.replace('px', '')), RADIUS, index, totalItems);
                    }}
                    transition={{
                        delay: index * 0.025,
                        type: 'spring',
                        stiffness: 600,
                        damping: 50,
                        mass: 1,
                    }}
                >
                    {createElement(icon)}
                </ButtonItem>
            </Link>
            {renderLayer(
                <AnimatePresence>
                    {isOpen && (
                        <TooltipBox
                            {...layerProps}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                        >
                            {label}
                        </TooltipBox>
                    )}
                </AnimatePresence>,
            )}
        </>
    );
}

export default MenuItem;
