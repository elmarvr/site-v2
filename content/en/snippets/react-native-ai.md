---
title: Expo, AI Structured Output
description: A typesafe way to handle streamed structured output in Expo using Hono RPC client
date: 2024-08-27
---

UseObject is a hook to handle streamed structured output from an Api. This way we can handle real-time updates from OpenAi for example.
It also supports passing an id for calling the hook in one place and rendering the results in other.

:::code-group

<<< ./content/code/react-native-ai/client.tsx [client]
<<< ./content/code/react-native-ai/server.ts [server]
<<< ./content/code/react-native-ai/use-object.ts [use-object]
<<< ./content/code/react-native-ai/schema.ts [schema]

:::
