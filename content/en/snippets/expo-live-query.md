---
title: Expo Live Query
date: 2024-08-12
---

The useLiveQuery hook extends the @tanstack/query useQuery to enable real-time updates from an Expo SQLite database, keeping your UI synced with any data changes

:::code-group

<<< ./content/code/expo-live-query/client.tsx [client] twoslash

<<< ./content/code/expo-live-query/use-live-query.ts [use-live-query] twoslash

<<< ./content/code/expo-live-query/db.ts [db] twoslash

:::