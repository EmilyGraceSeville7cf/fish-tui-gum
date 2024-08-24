const vscode = require("vscode")
const types = require("./types")
const data = require("./data")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider("fish", {
            provideCompletionItems() {
                return data.snippets
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
