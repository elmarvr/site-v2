---
title: Expo Live Query
date: 2024-08-12
description: Een custom hook voor real-time updates in Expo SQLite
---

De useLiveQuery hook bouwt voort op de @tanstack/query useQuery, zodat je real-time updates krijgt vanuit een Expo SQLite database. Hierdoor blijft je UI altijd up-to-date met de laatste data wijzigingen.

:::code-group

<<< ./content/code/expo-live-query/client.tsx [client]

<<< ./content/code/expo-live-query/use-live-query.ts [use-live-query]

<<< ./content/code/expo-live-query/db.ts [db]

:::
