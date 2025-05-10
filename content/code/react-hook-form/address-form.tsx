//@lib: esnext,dom
import { z } from "zod";

import { useForm } from "./use-form";

const AddressForm = () => {
  const form = useForm({
    schema: z.object({
      street: z.string(),
      city: z.string(),
    }),
  });

  //@noErrors
  return (
    <form>
      <form.Field name="street">
        {({ field }) => <input {...field} />}
      </form.Field>

      {/* <form.Field name="">{({ field }) => <input {...field} />}</form.Field> */}
    </form>
  );
};
