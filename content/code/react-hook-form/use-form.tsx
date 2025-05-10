//@lib: esnext,dom
import * as React from "react";
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
