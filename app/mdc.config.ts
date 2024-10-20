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
                  tagName: "PopupTrigger",
                  properties: {
                    class:
                      "twoslash-hover duration-300 decoration-card group-hover:decoration-[inherit] underline underline-offset-[5px] decoration-dotted",
                  },
                  children: [token],
                },
              ],
            },
          },
        }),
      ];
    },
  },
});
