// @lib: esnext,dom
// @noErrors
import type { Schema } from "hono";
import type { ClientRequest } from "hono/client";
//---cut---
import * as FileSystem from "expo-file-system";

export async function uploadAsync<
  TSchema extends Schema,
  TMethod extends keyof TSchema
>(
  request: ClientRequest<TSchema>,
  imageUri: string,
  opts: {
    httpMethod?: TMethod;
    fieldName: FieldName<TSchema, ResolveMethod<TSchema, TMethod>>;
  }
): Promise<RequestOutput<TSchema, TMethod>> {
  const methodMap = {
    $post: "POST",
    $put: "PUT",
    $patch: "PATCH",
  } as const;

  const response = await FileSystem.uploadAsync(
    request.$url().toString(),
    imageUri,
    {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      ...opts,
      httpMethod:
        methodMap[(opts.httpMethod as keyof typeof methodMap) ?? "$post"],
    }
  );

  return JSON.parse(response.body);
}

export type FieldName<TSchema extends Schema, TMethod extends keyof TSchema> = {
  [K in keyof TSchema]: TSchema[K] extends {
    input: {
      form: infer TInput;
    };
  }
    ? keyof TInput
    : never;
}[TMethod];

export type ResolveMethod<
  TSchema extends Schema,
  TMethod
> = keyof TSchema extends TMethod ? "$post" : TMethod;

export type RequestOutput<
  TSchema extends Schema,
  TMethod extends keyof TSchema
> = TSchema[TMethod] extends {
  output: infer TOutput;
}
  ? TOutput
  : never;
