import { FC } from "react";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { useFormikContext } from "formik";

import { getErrorFieldProps } from "@app/utils";

interface TextInputProps extends TextField.RootProps {
  name: string;
  label?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
}

export const TextInput: FC<TextInputProps> = ({
  name,
  label,
  helperText,
  defaultValue = "",
  startAdornment,
  ...props
}) => {
  const { submitCount, getFieldMeta, getFieldProps } = useFormikContext();

  const [meta, field] = [getFieldMeta(name), getFieldProps(name)];

  const { error, helperText: errorHelperText } = getErrorFieldProps(
    meta,
    submitCount,
  );

  const hasFieldError = !!(error && errorHelperText);

  return (
    <Flex direction="column" gap="1" mb="2" width={"100%"} pb="2">
      {label && (
        <Text
          weight="medium"
          className={hasFieldError ? "input-error" : "input-ok"}
        >
          {label}
          {props.required && "*"}
        </Text>
      )}
      <TextField.Root
        {...field}
        className={hasFieldError ? "input-error" : "input-ok"}
        type="text"
        value={
          field.value === undefined || field.value === null
            ? defaultValue
            : field.value
        }
        {...props}
      >
        {startAdornment && <TextField.Slot>{startAdornment}</TextField.Slot>}
      </TextField.Root>
      {(hasFieldError || helperText) && (
        <Text className={hasFieldError ? "input-error" : "input-ok"} size="1">
          {hasFieldError ? errorHelperText : helperText}
        </Text>
      )}
    </Flex>
  );
};
