import React, { ReactNode } from 'react';
type Props = {
    children: ReactNode;
    title?: string;
};

const Panel = ({ children, title }: Props) => (
    <div>
        {title && <h2>{title}</h2>}
        {children}
    </div>
);

export default Panel;
