import { is, SQL, Subquery } from "drizzle-orm";
import {
  getTableConfig,
  getViewConfig,
  SQLiteTable,
  SQLiteView,
  type AnySQLiteSelect,
} from "drizzle-orm/sqlite-core";
import { SQLiteRelationalQuery } from "drizzle-orm/sqlite-core/query-builders/query";

import { addDatabaseChangeListener } from "expo-sqlite/next";
import * as React from "react";

import {
  type DefaultError,
  useQuery,
  useQueryClient,
  type QueryKey,
  hashKey,
} from "@tanstack/react-query";
//---cut---
export const useLiveQuery = <
  TQuery extends
    | Pick<AnySQLiteSelect, "_" | "then">
    | SQLiteRelationalQuery<"sync", unknown>,
  TQueryKey extends QueryKey,
  TData = Awaited<TQuery>
>(opts: {
  query: TQuery;
  queryKey: TQueryKey;
  select?: (data: Awaited<TQuery>) => TData;
}) => {
  const { query, queryKey, ...rest } = opts;
  const [error, setError] = React.useState<Error>();

  const queryClient = useQueryClient();
  const { data } = useQuery<Awaited<TQuery>, DefaultError, TData, TQueryKey>({
    queryKey,
    staleTime: Infinity,
    ...rest,
  });

  React.useEffect(() => {
    const entity = is(query, SQLiteRelationalQuery)
      ? // @ts-expect-error
        query.table
      : //@ts-expect-error
        (query as AnySQLiteSelect).config.table;

    if (is(entity, Subquery) || is(entity, SQL)) {
      setError(new Error("Selecting subqueries and SQL are not supported"));
    }

    let listener: ReturnType<typeof addDatabaseChangeListener> | undefined =
      undefined;

    if (is(entity, SQLiteTable) || is(entity, SQLiteView)) {
      const config = is(entity, SQLiteTable)
        ? getTableConfig(entity)
        : getViewConfig(entity);

      query
        .then((data) => {
          queryClient.setQueryData(queryKey, data);
        })
        .catch(setError);

      listener = addDatabaseChangeListener(({ tableName }) => {
        if (config.name === tableName) {
          query
            .then((data) => {
              queryClient.setQueryData(queryKey, data);
            })
            .catch(setError);
        }
      });
    }

    return () => {
      listener?.remove();
    };
  }, [hashKey(queryKey)]);

  return {
    data,
    error,
  };
};
