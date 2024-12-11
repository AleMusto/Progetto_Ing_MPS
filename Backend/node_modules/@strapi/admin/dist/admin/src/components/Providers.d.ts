import { Store } from '../core/store/configure';
import { StrapiApp } from '../StrapiApp';
import * as React from 'react';
interface ProvidersProps {
    children: React.ReactNode;
    strapi: StrapiApp;
    store: Store;
}
declare const Providers: ({ children, strapi, store }: ProvidersProps) => import("react/jsx-runtime").JSX.Element;
export { Providers };
