---
title: Expo Live Query
description: A custom hook for real-time updates in Expo SQLite
date: 2024-08-12
---

The useLiveQuery hook extends the @tanstack/query useQuery to enable real-time updates from an Expo SQLite database, keeping your UI synced with any data changes

::code-group

<<< ./content/code/expo-live-query/client.tsx [client]
<<< ./content/code/expo-live-query/use-live-query.ts [use-live-query]
<<< ./content/code/expo-live-query/db.ts [db]

::
