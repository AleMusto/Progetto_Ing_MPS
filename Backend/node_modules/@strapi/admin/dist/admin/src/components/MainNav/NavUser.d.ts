import { ButtonProps } from '@strapi/design-system';
import * as React from 'react';
export interface NavUserProps extends ButtonProps {
    initials: string;
    children?: React.ReactNode;
}
export declare const NavUser: ({ children, initials, ...props }: NavUserProps) => import("react/jsx-runtime").JSX.Element;
