const vscode = require("vscode")
const types = require("./types")
const data = require("./data")

/**
 * Preprocess snippet
 * @param {types.SnippetDefinition} snippet A snippet.
 * 
 * @returns {Array<types.Snippet>} A result or snippet preprocessing.
 */
function preprocessSnippet(snippet) {
    if (snippet.kind === vscode.CompletionItemKind.Variable)
        return [
            types.Snippet.fromRaw({
                ...snippet,
                identifier: `set-${snippet.identifier}`,
                content: `set --export ${snippet.content}`,
                documentation: {
                    text: `${snippet.documentation.text} (set via \`set\`)`,
                    url: snippet.documentation.url
                }
            }),
            types.Snippet.fromRaw(snippet)
        ]

    return [types.Snippet.fromRaw(snippet)]
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider("fish", {
            provideCompletionItems() {
                let preprocessedSnippets = []
                data.snippets
                    .forEach(snippet => {
                        preprocessedSnippets = [...preprocessedSnippets, ...preprocessSnippet(snippet)]
                    })

                return preprocessedSnippets
                    .map(snippet => types.Snippet.fromRaw(snippet).toCompletion())
            }
        })
    )
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}
