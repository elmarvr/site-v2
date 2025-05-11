---
title: Upload files met Expo en Hono
date: 2024-07-20
description: Een type-safe manier om bestanden te uploaden in Expo met de Hono RPC-client
---

UploadAsync is een functie om files type-safe te uploaden in Expo met behulp van FileSystem.uploadAsync. Het infereert fieldName en de response van de Hono RPC client.

:::code-group

<<< ./content/code/hono-expo-upload-async/client.ts [client]
<<< ./content/code/hono-expo-upload-async/server.ts [server]
<<< ./content/code/hono-expo-upload-async/upload-async.ts [upload-async]

:::
