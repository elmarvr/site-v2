---
title: Expo, AI Structured Output
date: 2024-08-27
---

UseObject is a hook to handle streamed structured output from an Api. This way we can handle real-time updates from OpenAi for example.
It also supports passing an id for calling the hook in one place and rendering the results in other.

:::code-group

<<< ./content/code/react-native-ai/client.tsx [client] twoslash

<<< ./content/code/react-native-ai/server.ts [server] twoslash

<<< ./content/code/react-native-ai/use-object.ts [use-object] twoslash

<<< ./content/code/react-native-ai/schema.ts [schema] twoslash

:::
