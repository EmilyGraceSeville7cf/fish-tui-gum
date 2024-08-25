const typebox = require("@sinclair/typebox")

const valueKind = Object.freeze({
    baseKind: typebox.Enum({
        boolean: "boolean",
        string: "string",
        integer: "integer",
        color: "color",
        enumeration: "enumeration"
    }),
    isArray: typebox.Union([typebox.Literal(true), typebox.Undefined()]),
    separator: typebox.Union([typebox.String({
        minLength: 1,
        maxLength: 1
    }),
    typebox.Undefined()])
})

const option = Object.freeze({
    identifiers: typebox.Partial(typebox.Object({
        short: typebox.String({
            minLength: 1,
            maxLength: 1,
            pattern: "[A-z]"
        }),
        long: typebox.String({
            minLength: 1,
            pattern: "^[A-z][A-z0-9\-.]+$"
        })
    }))
})

const documentation = Object.freeze({
    text: typebox.String({
        minLength: 1,
        pattern: "\\S"
    }),
    url: typebox.String({
        minLength: 1,
        pattern: "^https://"
    }),
    methods: {
        toString: {
            content: typebox.Union([typebox.String({
                minLength: 1,
                pattern: "\\S"
            }), typebox.Undefined()])
        }
    }
})

const snippet = Object.freeze({
    identifier: typebox.String({
        minLength: 1,
        pattern: "^[A-z][A-z0-9\-.]+$"
    }),
    content: typebox.String({
        minLength: 1,
    }),
    options: typebox.Union([
        typebox.Array(typebox.Any()),
        typebox.Undefined()
    ])
})

module.exports = {
    valueKind,
    option,
    documentation,
    snippet
}
