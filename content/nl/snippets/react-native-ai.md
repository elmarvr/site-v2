---
title: Expo, AI Structured Output
date: 2024-08-27
---

UseObject is een hook om structured output van een Api te verwerken. Op deze manier kunnen we real-time updates van OpenAi bijvoorbeeld verwerken.
Het ondersteunt ook het doorgeven van een id om de hook op één plek aan te roepen en de resultaten op een andere plek weer te geven.

:::code-group

<<< ./content/code/react-native-ai/client.tsx [client]

<<< ./content/code/react-native-ai/server.ts [server]

<<< ./content/code/react-native-ai/use-object.ts [use-object]

<<< ./content/code/react-native-ai/schema.ts [schema]

:::
