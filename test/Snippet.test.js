const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")
const vscode = require("vscode")

const incorrect = Symbol("incorrect value")

suite("Snippet creation tests", () => {
    test("Fail with incorrect `identifier` parameter", () => {
        assert.throws(
            // @ts-ignore
            () => new extension.Snippet(incorrect),
            "Exception expected for incorrect `identifier` parameter"
        )
    })

    test("Fail with incorrect `content` parameter", () => {
        assert.throws(
            // @ts-ignore
            () => new extension.Snippet("write",
                incorrect),
            "Exception expected for incorrect `content` parameter"
        )
    })

    test("Fail with incorrect `documentation` parameter", () => {
        assert.throws(
            // @ts-ignore
            () => new extension.Snippet("write",
                "write",
                vscode.CompletionItemKind.Function,
                incorrect),
            "Exception expected for incorrect `documentation` parameter"
        )
    })

    test("Fail with incorrect `options` parameter", () => {
        assert.throws(
            () => new extension.Snippet("write",
                "write",
                vscode.CompletionItemKind.Function,
                new extension.Documentation("Help.",
                    "https://test"),
                // @ts-ignore
                incorrect),
            "Exception expected for incorrect `options` parameter"
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
        // @ts-ignore
        const insertText = completion.insertText

        /**
         * @type {vscode.MarkdownString}
         */
        // @ts-ignore
        const documentation = completion.documentation

        assert.equal(
            completion.label,
            snippet.identifier,
            "Correctly formatted label expected for object"
        )

        assert.equal(
            insertText.value,
            snippet.content,
            "Correctly formatted content expected for object"
        )

        assert.equal(
            completion.kind,
            snippet.kind,
            "Correctly selected kind expected for object"
        )

        assert.equal(
            documentation.value,
            snippet.documentationWithOptions,
            "Correctly formatted kind expected for object"
        )
    })
})
