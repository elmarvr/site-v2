// @ts-nocheck
// @noErrors
import { hc } from "hono/client";
//---cut---
import type { AppType } from "./server";
import { uploadAsync } from "./upload-async";

const api = hc<AppType>("YOUR_SERVER_URL");

async function submitFile(file: File) {
  const json = await uploadAsync(api.upload, "", {
    fieldName: "",
    //          ^|
  });

  //typesafe
  json.su;
  //     ^|
}
