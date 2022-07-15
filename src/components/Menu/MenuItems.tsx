import React, { CSSProperties, useEffect, MouseEvent, useRef, forwardRef } from 'react';
import { useRouter } from 'next/router';
import { CONTAINER_SIZE } from '../../constants/menus';
import { styled } from '@mui/material/styles';
import MenuItem, { MenuItemBaseProps } from './MenuItem';

export interface MenuItemsProps {
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    style: CSSProperties;
    items: MenuItemBaseProps[];
}

const MenuItemsBase = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: ${CONTAINER_SIZE}px;
    height: ${CONTAINER_SIZE}px;
    pointer-events: none;
`;

const MenuItems = forwardRef<HTMLDivElement, MenuItemsProps>(function MenuItems({ style, onClick, items }, ref) {
    const router = useRouter();

    const clickDelayRef = useRef<ReturnType<typeof setTimeout>>();

    const onClickMenuItem = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();

        if (onClick) {
            onClick(event);
        }

        if (clickDelayRef.current) {
            clearTimeout(clickDelayRef.current);
        }

        clickDelayRef.current = setTimeout(() => {
            router.push(href);
        }, 300);
    };

    useEffect(() => {
        const clickDelayRefCurrent = clickDelayRef.current;

        if (clickDelayRefCurrent) {
            clearTimeout(clickDelayRefCurrent);
        }

        return () => {
            clearTimeout(clickDelayRefCurrent);
        };
    }, []);

    return (
        <MenuItemsBase ref={ref} style={style}>
            {items.map(({ href, label, icon }, index) => {
                return (
                    <MenuItem
                        key={href}
                        index={index}
                        icon={icon}
                        label={label}
                        href={href}
                        totalItems={items.length}
                        onClick={(event) => onClickMenuItem(event, href)}
                    />
                );
            })}
        </MenuItemsBase>
    );
});

export default MenuItems;
