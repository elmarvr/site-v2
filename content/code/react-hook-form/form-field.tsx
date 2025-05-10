//@lib: esnext,dom
import * as React from "react";
import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  type UseControllerReturn,
  type ControllerFieldState,
} from "react-hook-form";

const FieldContext = React.createContext<ControllerFieldState | null>(null);

export interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  children?: (
    props: UseControllerReturn<TFieldValues, TName>
  ) => React.ReactNode;
}

export const FormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  children,
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  const fieldProps = useController(props);

  if (!children) {
    return null;
  }

  return (
    <FieldContext.Provider value={fieldProps.fieldState}>
      {children(fieldProps)}
    </FieldContext.Provider>
  );
};
