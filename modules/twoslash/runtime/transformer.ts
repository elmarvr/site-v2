export async function createTransformer(opts: { throws: boolean }) {
  const { transformerTwoslash } = await import("@shikijs/twoslash");

  return transformerTwoslash({
    throws: !!opts.throws,
    twoslashOptions: {
      compilerOptions: {
        lib: ["esnext", "dom"],
        jsx: 1, // Preserve
        jsxImportSource: "react",
        strict: true,
      },
    },
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
  });
}
