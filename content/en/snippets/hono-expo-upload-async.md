---
title: Upload files with Expo and Hono
description: A typesafe way to upload files in Expo using Hono RPC client
date: 2024-07-20
---

UploadAsync is a function to upload files typesafe in Expo using FileSystem.uploadAsync. It infers the fieldName and response from the Hono RPC client.

::code-group

<<< ./content/code/hono-expo-upload-async/client.ts [client]
<<< ./content/code/hono-expo-upload-async/server.ts [server]
<<< ./content/code/hono-expo-upload-async/upload-async.ts [upload-async]

::
