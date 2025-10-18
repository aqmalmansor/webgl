import { type FieldMetaProps } from "formik";

interface ErrorFieldProps {
  error?: boolean;
  helperText?: string;
  helperTextVariables?: Record<string, string>;
}

export const getErrorFieldProps = (
  meta?: FieldMetaProps<unknown>,
  submitCount?: number,
): ErrorFieldProps =>
  meta && (meta.touched || submitCount) && meta.error !== undefined
    ? {
        error: true,
        helperText: meta.error,
      }
    : {};
