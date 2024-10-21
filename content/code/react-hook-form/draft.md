```tsx [./form-field.tsx]
// @filename: form-field.tsx
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

const FormField = <
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

// @filename: use-form.tsx
import type { Schema } from "zod";
import {
  type FieldPath,
  useForm as __useForm,
  type UseFormProps,
  type UseFormReturn as __UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField, type FormFieldProps } from "./form-field";

type UseFormReturn<TSchema extends Schema> = __UseFormReturn<
  TSchema["_input"],
  any,
  TSchema["_output"]
> & {
  Field: <TName extends FieldPath<TSchema["_input"]>>(
    props: FormFieldProps<TSchema["_input"], TName>
  ) => React.ReactElement;
};

export function useForm<TSchema extends Schema>({
  schema,
  ...opts
}: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
  schema: TSchema;
}): UseFormReturn<TSchema> {
  const form = __useForm<TSchema["_input"], any, TSchema["_output"]>({
    ...opts,
    resolver: zodResolver(schema),
  }) as any;

  form.Field = React.useCallback(
    (props: FormFieldProps<any, any>) => (
      <FormField {...props} control={form.control} />
    ),
    []
  );

  return form;
}
```