import type { PageMeta } from "#app";
import { type MessageId } from "vue-i18n";

declare module "#app" {
  export interface PageMeta {
    title?: MessageId | (string & {});
    description?: MessageId | (string & {});
  }
}
