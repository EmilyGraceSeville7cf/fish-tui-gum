const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")

const incorrect = Symbol("incorrect value")

suite("Documentation creation tests", () => {
    test("Fail with incorrect `text` parameter", () => {
        assert.throws(
            // @ts-ignore
            () => new extension.Documentation(incorrect),
            "Exception expected for incorrect `text` parameter"
        )
    })

    test("Succeed with correct `fromRaw` result", () => {
        /**
         * @type {extension.DocumentationDefinition}
         */
        const documentationData = {
            text: "Help.",
            url: "https://test"
        }

        assert.deepEqual(
            extension.Documentation.fromRaw(documentationData),
            new extension.Documentation(documentationData.text, documentationData.url),
            messages.fromRaw
        )
    })
})

suite("Documentation conversion tests", () => {
    test("Succeed with correct `toString` result", () => {
        const documentation = new extension.Documentation("Help.", "https://test")
        const footer = "[\`🔗 Read more\`](https://test) | [\`📫 I need help with gum\`](https://github.com/charmbracelet/gum/discussions)"

        assert.equal(
            documentation.toString(),
            `📖 Help.

${footer}`,
            messages.toString)

        assert.equal(documentation.toString("Content."),
            `📖 Help.

Content.

${footer}`,
            messages.toString)
    })
})
