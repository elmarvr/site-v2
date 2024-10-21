//prettier-ignore
//@ts-nocheck
//@noErrors
import * as React from "react";
import { z } from "zod";
//---cut---
import { useForm } from "./use-form";

const AddressForm = () => {
  const form = useForm({
    schema: z.object({
      street: z.string(),
      city: z.string(),
    }),
  });

  return (
    <form>
      <form.Field name="street">
        {({ field }) => <input {...field} />}
      </form.Field>
      <form.Field name="">
        //              ^|
        {({ field }) => <input {...field} />}
      </form.Field>
    </form>
  );
};
