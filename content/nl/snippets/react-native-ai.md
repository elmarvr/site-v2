---
title: Expo, AI Structured Output
date: 2024-08-27
---

UseObject is een hook om structured output van een Api te verwerken. Op deze manier kunnen we real-time updates van OpenAi bijvoorbeeld verwerken.
Het ondersteunt ook het doorgeven van een id om de hook op één plek aan te roepen en de resultaten op een andere plek weer te geven.

:::code-group

```ts [index]
// @lib: esnext,dom

//@filename: ./use-object.ts
import * as React from "react";
import EventSource, { type MessageEvent } from "react-native-sse";
import { z, ZodError, type Schema } from "zod";
import { parse } from "best-effort-json-parser";
import { hashKey, useQuery, useQueryClient } from "@tanstack/react-query";

const sources = new Map<string, EventSource>();

export function useObject<TOutput extends Schema>(opts: {
  api: string;
  id?: string;
  schema: TOutput;
  onSuccess?: (event: {
    data: TOutput["_output"] | undefined;
    error: ZodError<TOutput> | undefined;
  }) => void;
}) {
  //Use this id to sync
  const id = opts.id ?? React.useId();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const queryClient = useQueryClient();

  const queryKey = [opts.api, id];
  const { data } = useQuery({
    queryKey,
    staleTime: Infinity,
    initialData: {},
  });

  const hashedKey = hashKey(queryKey);

  React.useEffect(() => {
    const es = sources.get(hashedKey);

    if (es) {
      subscribe(es);
    }

    return () => {
      sources.get(hashedKey)?.close();
    };
  }, []);

  function subscribe(es: EventSource) {
    setIsLoading(true);

    let accText = "";
    let lastObject: any = null;

    es.addEventListener("message", (event) => {
      if (event.data === "[DONE]") {
        if (opts.onSuccess) {
          const result = opts.schema.safeParse(lastObject);
        }

        setIsLoading(false);
        es.close();

        return;
      }

      const { content } = parseEvent(event);

      accText += content ?? "";
      lastObject = parse(accText);

      queryClient.setQueryData(queryKey, lastObject);
    });

    es.addEventListener("error", (event) => {
      if ("error" in event) {
        setError(event.error);
      }

      setIsLoading(false);
      es.close();
    });
  }

  function submit(input: Record<string, unknown>) {
    const es = new EventSource(opts.api, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });

    sources.set(hashedKey, es);
    queryClient.setQueryData(queryKey, {});

    subscribe(es);
  }

  return {
    submit,
    data: data as TOutput["_output"],
    error,
    isLoading,
  };
}

function parseEvent(event: MessageEvent) {
  const data = JSON.parse(event.data ?? "{}");

  return z.object({ content: z.string() }).parse(data);
}

export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : {
      [P in keyof T]?: T[P];
    } & {};

// @filename: ./schema.ts
import { z } from "zod";
export const receiptSchema = z.object({
  name: z.string(),
  category: z.string(),
  items: z.array(
    z.object({
      amount: z.number(),
      name: z.string(),
      price: z.number(),
    })
  ),
});

// @filename: ./index.ts
import { receiptSchema } from "./schema";
import { useObject } from "./use-object";
export const Receipt = () => {
  const { submit, data, isLoading, error } = useObject({
    api: "/api/receipt",
    schema: receiptSchema,
    onSuccess: ({ data, error }) => {
      data.i;
    },
  });

  //...
};
```

:::
