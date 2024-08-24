const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")

const incorrect = Symbol("incorrect value")

suite("Value kind creation tests", () => {
    test("Fail with incorrect `baseKind` parameter", () => {
        assert.throws(
            // @ts-ignore
            () => new extension.ValueKind(incorrect),
            "Exception expected for incorrect `baseKind` parameter"
        )
    })

    test("Fail with incorrect `isArray` parameter", () => {
        assert.throws(
            () =>
                // @ts-ignore
                new extension.ValueKind("string", incorrect),
            "Exception expected for incorrect `isArray` parameter"
        )
    })

    test("Fail with incorrect `separator` parameter", () => {
        assert.throws(
            () =>
                // @ts-ignore
                new extension.ValueKind("string", true, incorrect),
            "Exception expected for incorrect `separator` parameter"
        )

        assert.throws(
            () =>
                new extension.ValueKind("string", false, ","),
            "Exception expected for existing `separator` parameter when `isArray` parameter is false"
        )
    })

    test("Succeed with correct `fromRaw` result", () => {
        /**
         * @type {extension.ValueKindDefinition}
         */
        let base = {
            baseKind: "string"
        }

        assert.deepEqual(
            extension.ValueKind.fromRaw(base),
            new extension.ValueKind("string"),
            messages.fromRaw
        )

        base = {
            ...base,
            isArray: true,
            separator: ","
        }

        assert.deepEqual(
            extension.ValueKind.fromRaw(base),
            new extension.ValueKind("string",
                true,
                ","),
            messages.fromRaw
        )
    })
})

suite("Value kind to string conversion tests", () => {
    test("Succeed with correct `toString` result", () => {
        assert.equal(
            new extension.ValueKind("string").toString(),
            "string",
            messages.toString
        )

        assert.equal(
            new extension.ValueKind("string",
                true,
                ",").toString(),
            "string,string...",
            messages.toString
        )
    })
})
