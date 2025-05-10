// @lib: esnext,dom
import { receiptSchema } from "./schema";
import { useObject } from "./use-object";

// @noErrors
export const Receipt = () => {
  const { submit, data, isLoading, error } = useObject({
    api: "/api/receipt",
    schema: receiptSchema,
    onSuccess: ({ data, error }) => {
        data.
//           ^|
    },
  });

//...
};
