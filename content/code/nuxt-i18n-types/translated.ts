declare module 'vue-i18n' {
  interface DefineLocaleMessage {
    "nav.projects": string
    "nav.snippets": string
    "nav.language": string
    "projects.recent": string
    "projects.all": string
    "snippets.recent": string
    "snippets.all": string
    "general.next": string
    "general.previous": string
  }
}
// ---cut---
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const translated = t("na");
//                      ^|