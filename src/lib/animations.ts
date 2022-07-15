import { AnimationProps } from 'framer-motion';

export interface iAnimation extends Pick<AnimationProps, 'variants' | 'transition'> {
    name: string;
}

const fadeBack: iAnimation = {
    name: 'Fade Back',
    variants: {
        initial: {
            opacity: 0,
            scale: 0.4,
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 0.4,
        },
    },
    transition: {
        duration: 0.7,
    },
};

const rotateY: iAnimation = {
    name: 'Rotate Y',
    variants: {
        initial: {
            rotateY: 90,
        },
        animate: {
            rotateY: 0,
        },
        exit: {
            rotateY: 90,
        },
    },
    transition: {
        duration: 0.7,
    },
};

const rotateX: iAnimation = {
    name: 'Rotate X',
    variants: {
        initial: {
            rotateZ: 90,
            opacity: 0,
            scale: 0.6,
        },
        animate: {
            opacity: 1,
            rotateZ: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            rotateZ: 90,
            scale: 0.6,
        },
    },
    transition: {
        duration: 0.7,
    },
};

const rotateZ: iAnimation = {
    name: 'Rotate Z',
    variants: {
        initial: {
            opacity: 0,
            rotateZ: 360,
        },
        animate: {
            opacity: 1,
            rotateZ: 0,
        },
        exit: {
            opacity: 0,
            rotateZ: 360,
        },
    },
    transition: {
        duration: 0.7,
    },
};

const animations: iAnimation[] = [fadeBack, rotateX, rotateY, rotateZ];

export { fadeBack, rotateX, rotateY, rotateZ };

export default animations;
