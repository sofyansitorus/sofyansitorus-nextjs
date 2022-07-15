import React, { CSSProperties, useRef, useEffect, useState, createElement } from 'react';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import { SvgIcon } from '@mui/material';
import ButtonBase from './ButtonBase';

interface iButtonBaseProps {
    isOpen: boolean;
}

interface iButtonProps extends iButtonBaseProps {
    style?: CSSProperties;
    className?: string;
    onClick: () => void;
    isAnimated?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, iButtonProps>(function Button(
    { style, className, isOpen, onClick, isAnimated },
    ref,
) {
    const [buttonIcon, setButtonIcon] = useState<typeof SvgIcon>(Menu);
    const iconWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onTransitionEnd = () => {
            if (isOpen) {
                setButtonIcon(Close);
            } else {
                setButtonIcon(Menu);
            }
        };

        const refIconWrapper = iconWrapperRef.current;

        if (refIconWrapper) {
            refIconWrapper.addEventListener('transitionend', onTransitionEnd);
        }

        return () => {
            if (refIconWrapper) {
                refIconWrapper.removeEventListener('transitionend', onTransitionEnd);
            }
        };
    }, [isOpen]);

    return (
        <ButtonBase
            ref={ref}
            style={style}
            className={className}
            isOpen={isOpen}
            onClick={onClick}
            isAnimated={isAnimated}
        >
            <div ref={iconWrapperRef}>{createElement(buttonIcon, { fontSize: 'large', viewBox: '-2 0 28 21' })}</div>
        </ButtonBase>
    );
});

export type { iButtonProps };

export default Button;
