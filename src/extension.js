const vscode = require("vscode")
const snippets = require("./snippets")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider("fish", {
            provideCompletionItems() {
                return snippets
            }
        })
    )
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
