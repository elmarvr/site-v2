import { defineConfig } from "@nuxtjs/mdc/config";
import { transformerTwoslash } from "@shikijs/twoslash";

export default defineConfig({
  shiki: {
    transformers: () => {
      return [
        transformerTwoslash({
          throws: false,
          rendererRich: {
            jsdoc: false,
            hast: {
              hoverToken: {
                tagName: "Popup",
              },
              hoverPopup: {
                tagName: "PopupContent",
              },
              hoverCompose: ({ popup, token }) => [
                popup,
                {
                  type: "element",
                  tagName: "HoverToken",
                  properties: {},
                  children: [token],
                },
              ],
              completionToken: {
                tagName: "Popup",
                properties: {
                  static: true,
                },
              },
              completionPopup: {
                tagName: "CompletionList",
              },
              completionCompose: ({ popup, cursor }) => [
                popup,
                {
                  type: "element",
                  tagName: "CompletionCursor",
                  properties: {},
                  children: cursor.children,
                },
              ],
            },
          },
        }),
      ];
    },
  },
});
