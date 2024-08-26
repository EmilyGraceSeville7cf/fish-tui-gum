const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")

const incorrect = Symbol("incorrect value")

suite("Documentation creation tests", () => {
    test("Fail with incorrect `text` parameter", () => {
        assert.throws(
            // @ts-expect-error
            () => new extension.Documentation(incorrect),
            "Exception expected for incorrect `text` parameter with incorrect type"
        )

        assert.throws(
            // @ts-expect-error
            () => new extension.Documentation(""),
            "Exception expected for incorrect `text` parameter with incorrect value"
        )
    })

    test("Fail with incorrect `url` parameter", () => {
        /**
         * @type {extension.DocumentationDefinition}
         */
        const base = {
            text: "Help.",
            url: "https://test"
        }

        assert.throws(
            () =>
                // @ts-expect-error
                new extension.Documentation(base.text, incorrect),
            "Exception expected for incorrect `url` parameter with incorrect type"
        )

        assert.throws(
            () =>
                new extension.Documentation(base.text, ""),
            "Exception expected for incorrect `url` parameter with incorrect value"
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
            new extension.Documentation(documentationData.text,
                documentationData.url),
            messages.fromRaw
        )
    })
})

suite("Documentation conversion tests", () => {
    test("Succeed with correct `toString` result", () => {
        const documentation = new extension.Documentation("Help.",
            "https://test")
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
