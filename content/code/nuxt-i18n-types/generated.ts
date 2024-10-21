//@ts-nocheck
// ---cut---
declare module 'vue-i18n' {
  export type MessageId = 
    | "nav.projects"
    | "nav.snippets"
    | "nav.language"
    | "projects.recent"
    | "projects.all"
    | "snippets.recent"
    | "snippets.all"
    | "general.next"
    | "general.previous"

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