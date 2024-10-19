// @ts-nocheck
// @noErrors
import * as React from "react";
//---cut---
import { receiptSchema } from "./schema";
import { useObject } from "./use-object";

export const Receipt = () => {
  const { submit, data, isLoading, error } = useObject({
    api: "/api/receipt",
    schema: receiptSchema,
    onSuccess: ({ data, error }) => {
      data?.items;
      //       ^|
    },
  });

  //...
};
