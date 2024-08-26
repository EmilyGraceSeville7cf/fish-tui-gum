const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")
const vscode = require("vscode")

const incorrect = Symbol("incorrect value")

suite("Snippet creation tests", () => {
    test("Fail with incorrect `identifier` parameter", () => {
        assert.throws(
            // @ts-expect-error
            () => new extension.Snippet(incorrect),
            "Exception expected for incorrect `identifier` parameter with incorrect type"
        )

        assert.throws(
            // @ts-expect-error
            () => new extension.Snippet(""),
            "Exception expected for incorrect `identifier` parameter with incorrect value"
        )
    })

    test("Fail with incorrect `content` parameter", () => {
        assert.throws(
            // @ts-expect-error
            () => new extension.Snippet("write",
                incorrect),
            "Exception expected for incorrect `content` parameter with incorrect type"
        )

        assert.throws(
            () =>
                // @ts-expect-error
                new extension.Snippet("write", ""),
            "Exception expected for incorrect `content` parameter with incorrect value"
        )
    })

    test("Fail with incorrect `documentation` parameter", () => {
        assert.throws(
            () =>
                // @ts-expect-error
                new extension.Snippet("write",
                    "write",
                    vscode.CompletionItemKind.Function,
                    incorrect),
            "Exception expected for incorrect `documentation` parameter with incorrect type"
        )
    })

    test("Fail with incorrect `options` parameter", () => {
        assert.throws(
            () => new extension.Snippet("write",
                "write",
                vscode.CompletionItemKind.Function,
                new extension.Documentation("Help.",
                    "https://test"),
                // @ts-expect-error
                incorrect),
            "Exception expected for incorrect `options` parameter with incorrect type"
        )

        assert.throws(
            () => new extension.Snippet("write",
                "write",
                vscode.CompletionItemKind.Function,
                new extension.Documentation("Help.",
                    "https://test"),
                [
                    new extension.Option({
                        long: "s1"
                    }),
                    new extension.Option({
                        long: "s1"
                    })
                ]),
            "Exception expected for incorrect `options` parameter with incorrect value"
        )
    })

    test("Succeed with correct `fromRaw` result", () => {
        /**
         * @type {extension.SnippetDefinition}
         */
        const snippetData = {
            identifier: "GUM_CHOOSE_SHOW_HELP",
            content: "GUM_CHOOSE_SHOW_HELP",
            kind: vscode.CompletionItemKind.Variable,
            documentation: {
                text: "Help.",
                url: "https://test"
            },
            options: [
                {
                    identifiers: {
                        long: "show-help"
                    }
                }
            ]
        }

        assert.deepEqual(
            extension.Snippet.fromRaw(snippetData),
            new extension.Snippet(snippetData.identifier,
                snippetData.content,
                snippetData.kind,
                extension.Documentation.fromRaw(snippetData.documentation),
                snippetData.options
                    .map(option => extension.Option.fromRaw(option))
            ),
            messages.fromRaw
        )
    })
})

suite("Snippet conversion tests", () => {
    test("Succeed with correct `toCompletion` result", () => {
        /**
         * @type {extension.SnippetDefinition}
         */
        const snippetData = {
            identifier: "GUM_CHOOSE_SHOW_HELP",
            content: "GUM_CHOOSE_SHOW_HELP",
            kind: vscode.CompletionItemKind.Variable,
            documentation: {
                text: "Help.",
                url: "https://test"
            },
            options: [
                {
                    identifiers: {
                        long: "show-help"
                    }
                }
            ]
        }

        const snippet = extension.Snippet.fromRaw(snippetData)
        const completion = snippet.toCompletion()

        /**
         * @type {vscode.SnippetString}
         */
        // @ts-expect-error
        const insertText = completion.insertText

        /**
         * @type {vscode.MarkdownString}
         */
        // @ts-expect-error
        const documentation = completion.documentation

        assert.equal(
            completion.label,
            snippet.identifier,
            "Expected correctly formatted label expected for object"
        )

        assert.equal(
            insertText.value,
            snippet.content,
            "Expected correctly formatted content expected for object"
        )

        assert.equal(
            completion.kind,
            snippet.kind,
            "Expected correctly selected kind expected for object"
        )

        assert.equal(
            documentation.value,
            snippet.documentationWithOptions,
            "Expected correctly formatted kind expected for object"
        )
    })
})
