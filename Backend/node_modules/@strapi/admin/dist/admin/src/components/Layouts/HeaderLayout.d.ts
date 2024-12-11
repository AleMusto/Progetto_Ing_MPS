import { TypographyProps } from '@strapi/design-system';
import * as React from 'react';
interface BaseHeaderLayoutProps extends Omit<TypographyProps<'div'>, 'tag'> {
    navigationAction?: React.ReactNode;
    primaryAction?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    subtitle?: React.ReactNode;
    sticky?: boolean;
    width?: number;
}
declare const BaseHeaderLayout: React.ForwardRefExoticComponent<BaseHeaderLayoutProps & React.RefAttributes<HTMLDivElement>>;
interface HeaderLayoutProps extends BaseHeaderLayoutProps {
}
declare const HeaderLayout: {
    (props: HeaderLayoutProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export type { HeaderLayoutProps, BaseHeaderLayoutProps };
export { HeaderLayout, BaseHeaderLayout };
