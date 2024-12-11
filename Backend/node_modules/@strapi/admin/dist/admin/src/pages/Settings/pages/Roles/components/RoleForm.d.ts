import { FormikProps } from 'formik';
import { AdminRole } from '../../../../../hooks/useAdminRoles';
import { EditRoleFormValues } from '../EditPage';
interface RoleFormProps extends Pick<FormikProps<EditRoleFormValues>, 'values' | 'errors'> {
    onBlur: FormikProps<EditRoleFormValues>['handleBlur'];
    onChange: FormikProps<EditRoleFormValues>['handleChange'];
    disabled?: boolean;
    role: AdminRole;
}
declare const RoleForm: ({ disabled, role, values, errors, onChange, onBlur }: RoleFormProps) => import("react/jsx-runtime").JSX.Element;
export { RoleForm };
export type { RoleFormProps };
