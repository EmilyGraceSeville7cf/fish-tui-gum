const assert = require('assert/strict')
const extension = require("../src/types")
const messages = require("./messages")

const incorrect = Symbol("incorrect value")

suite("Value kind creation tests", () => {
    test("Fail with incorrect `baseKind` parameter", () => {
        assert.throws(
            // @ts-ignore
            () => new extension.ValueKind(incorrect),
            "Exception expected for incorrect `baseKind` parameter with incorrect type"
        )

        assert.throws(
            // @ts-ignore
            () => new extension.ValueKind(""),
            "Exception expected for incorrect `baseKind` parameter with incorrect value"
        )
    })

    test("Fail with incorrect `isArray` parameter", () => {
        assert.throws(
            () =>
                // @ts-ignore
                new extension.ValueKind("string", incorrect),
            "Exception expected for incorrect `isArray` parameter with incorrect type"
        )

        assert.throws(
            () =>
                // @ts-ignore
                new extension.ValueKind("string", false),
            "Exception expected for incorrect `isArray` parameter with incorrect value"
        )
    })

    test("Fail with incorrect `separator` parameter", () => {
        assert.throws(
            () =>
                new extension.ValueKind("string",
                    true,
                    // @ts-ignore
                    incorrect),
            "Exception expected for incorrect `separator` parameter with incorrect type"
        )

        assert.throws(
            () =>
                new extension.ValueKind("string",
                    true,
                    ",,"),
            "Exception expected for incorrect `separator` parameter with incorrect value"
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
            new extension.ValueKind(base.baseKind),
            messages.fromRaw
        )

        base = {
            ...base,
            isArray: true,
            separator: ","
        }

        assert.deepEqual(
            extension.ValueKind.fromRaw(base),
            new extension.ValueKind(base.baseKind,
                true,
                ","),
            messages.fromRaw
        )
    })
})

suite("Value kind to string conversion tests", () => {
    test("Succeed with correct `toString` result", () => {
        /**
         * @type {extension.ValueKindDefinition}
         */
        let base = {
            baseKind: "string",
            isArray: true,
            separator: ","
        }

        assert.equal(
            new extension.ValueKind(base.baseKind).toString(),
            base.baseKind,
            messages.toString
        )

        assert.equal(
            new extension.ValueKind(base.baseKind,
                base.isArray,
                base.separator).toString(),
            `${base.baseKind}${base.separator}${base.baseKind}...`,
            messages.toString
        )
    })
})
