const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")

const incorrect = Symbol("incorrect value")

suite("Option creation tests", () => {
    test("Fail with incorrect `identifiers` parameter", () => {
        const message = "Exception expected for incorrect `identifiers` parameter"
        const messageForType = `${message} for type`
        const messageForValue = `${message} for value`

        assert.throws(
            // @ts-expect-error
            () => new extension.Option(incorrect),
            messageForType
        )

        assert.throws(
            () => new extension.Option({}),
            messageForType
        )

        assert.throws(
            () => new extension.Option({
                // @ts-expect-error
                short: incorrect
            }),
            messageForType
        )

        assert.throws(
            () => new extension.Option({
                // @ts-expect-error
                long: incorrect
            }),
            messageForType
        )

        assert.throws(
            () => new extension.Option({
                short: ""
            }),
            messageForValue
        )

        assert.throws(
            () => new extension.Option({
                long: ""
            }),
            messageForValue
        )
    })

    test("Fail with incorrect `kind` parameter", () => {
        assert.throws(
            () => new extension.Option({
                short: "s"
            },
                // @ts-expect-error
                incorrect
            ),
            "Exception expected for incorrect `kind` parameter"
        )
    })

    test("Succeed with correct `fromRaw` result", () => {
        /**
         * @type {extension.OptionDefinition}
         */
        const optionData = {
            identifiers: {
                long: "long"
            },
            kind: {
                baseKind: "string"
            }
        }

        assert.deepEqual(
            extension.Option.fromRaw({
                identifiers: optionData.identifiers
            }),
            new extension.Option(optionData.identifiers),
            messages.fromRaw
        )

        assert.deepEqual(
            extension.Option.fromRaw(optionData),
            new extension.Option(
                optionData.identifiers,
                extension.ValueKind.fromRaw(optionData.kind)
            ),
            messages.fromRaw
        )
    })
})

suite("Option conversion tests", () => {
    test("Succeed with correct `toString` result", () => {
        const valueKind = new extension.ValueKind("string")

        assert.equal(new
            extension.Option(
                {
                    long: "long"
                },
                valueKind).toString(),
            "**--long** (**e.g.** header)",
            messages.toString)

        assert.equal(
            new extension.Option(
                {
                    short: "s",
                    long: "long"
                },
                valueKind).toString(),
            "**-s** | **--long** (**e.g.** header)",
            messages.toString
        )

        assert.equal(
            new extension.Option({
                long: "long"
            },
                new extension.ValueKind("enumeration")).toString(),
            "**--long**",
            messages.toString
        )
    })
})
