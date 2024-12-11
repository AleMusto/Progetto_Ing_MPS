import { ButtonProps } from '@strapi/design-system';
import * as React from 'react';
interface CreateActionCEProps extends Pick<ButtonProps, 'onClick'> {
}
declare const CreateActionCE: React.ForwardRefExoticComponent<CreateActionCEProps & React.RefAttributes<HTMLButtonElement>>;
export { CreateActionCE };
export type { CreateActionCEProps };
