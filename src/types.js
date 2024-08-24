const vscode = require("vscode")
const typebox = require("@sinclair/typebox")
const typeboxValue = require("@sinclair/typebox/value")
const schemas = require("./schemas")

/**
 * @typedef {object} ValueKindDefinition Allows define value kind in JSON-like declarative way.
 * 
 * @property {BaseKind} baseKind A base kind.
 * @property {boolean} [isArray] Whether several items of `baseKind` are allowed.
 * @property {string} [separator] A separator in case `isArray === true`.
 * /

/**
 * @typedef {typebox.Static<typeof schemas.valueKind.baseKind>} BaseKind
 */

/**
 * Value kind.
 */
class ValueKind {
    /**
     * Create the object from its raw representation.
     * 
     * @param {ValueKindDefinition} raw A raw object representation.
     * 
     * @returns {ValueKind} The object.
     */
    static fromRaw(raw) {
        return new ValueKind(raw?.baseKind, raw?.isArray, raw?.separator)
    }

    /**
     * @param {BaseKind} baseKind A base kind.
     * @param {boolean} [isArray] Whether several items of `baseKind` are allowed.
     * @param {string} [separator] A separator in case `isArray === true`.
     */
    constructor(baseKind, isArray, separator) {
        typeboxValue.Assert(schemas.valueKind.baseKind, baseKind)
        typeboxValue.Assert(schemas.valueKind.isArray, isArray)
        typeboxValue.Assert(schemas.valueKind.separator, separator)

        if (isArray)
            typeboxValue.Assert(
                typebox.Exclude(schemas.valueKind.separator,
                    typebox.Undefined()), separator)
        else
            typeboxValue.Assert(typebox.Undefined(), separator)

        this.baseKind = baseKind
        this.isArray = isArray
        this.separator = separator
        Object.freeze(this)
    }

    /**
     * Convert the object to a string.
     * 
     * @returns {string} A string representation of the object.
     */
    toString() {
        if (!this.isArray)
            return this.baseKind

        return `${this.baseKind}${this.separator}${this.baseKind}...`
    }
}

/**
 * @typedef {object} OptionDefinition Allows define option in JSON-like declarative way.
 * 
 * @property {Identifiers} identifiers An option name.
 * @property {ValueKindDefinition} [kind] An option kind.
 * /

/**
 * @typedef {typebox.Static<typeof schemas.option.identifiers>} Identifiers
 */

/**
 * Option.
 */
class Option {
    /**
     * Create the object from its raw representation.
     * 
     * @param {OptionDefinition} raw A raw object representation.
     * 
     * @returns {Option} The object.
     */
    static fromRaw(raw) {
        return new Option(raw?.identifiers, raw.kind === undefined ? undefined : ValueKind.fromRaw(raw.kind))
    }

    /**
     * @param {Identifiers} identifiers An option name.
     * @param {ValueKind} [kind] An option kind.
     */
    constructor(identifiers, kind) {
        typeboxValue.Assert(schemas.option.identifiers, identifiers)

        if (kind !== undefined && kind.constructor !== ValueKind)
            throw new TypeError(`'kind' expected to be of ${ValueKind.name} type`)

        this.identifiers = identifiers
        this.kind = kind

        /**
         * @type {Map<BaseKind, Array<unknown>>}
         */
        const examples = new Map()
        examples.set("string", ["header"])
        examples.set("integer", [1])
        examples.set("color", ["#7571F9"])

        this.examples = examples.get(kind?.baseKind)

        Object.freeze(this)
    }

    /**
     * Convert the object to a string.
     * 
     * @returns {string} A string representation of the object.
     */
    toString() {
        let representation = [`-${this.identifiers.short}`, `--${this.identifiers.long}`]
            .filter(identifier => !/^--?undefined$/.test(identifier))
            .map(identifier => `**${identifier}**`)
            .join(" | ")

        if (this.examples !== undefined)
            representation += ` (**e.g.** ${this.examples.join(", ")})`

        return representation
    }
}

/**
 * @typedef {object} DocumentationDefinition Allows define documentation in JSON-like declarative way.
 * 
 * @property {string} text A documentation text.
 * @property {string} url A documentation URL.
 * /

/**
 * Documentation.
 */
class Documentation {
    /**
     * Create the object from its raw representation.
     * 
     * @param {DocumentationDefinition} raw A raw object representation.
     * 
     * @returns {Documentation} The object.
     */
    static fromRaw(raw) {
        return new Documentation(raw.text, raw.url)
    }

    /**
     * 
     * @param {string} text A documentation text.
     * @param {string} url A documentation URL.
     */
    constructor(text, url) {
        typeboxValue.Assert(schemas.documentation.text, text)
        typeboxValue.Assert(schemas.documentation.url, url)

        this.text = text
        this.url = url
        Object.freeze(this)
    }

    /**
     * Convert the object to a string.
     * 
     * @param {string} [content] A help content.
     * 
     * @returns {string} A string representation of the object.
     */
    toString(content) {
        typeboxValue.Assert(schemas.documentation.methods.toString.content, content)

        if (content !== undefined)
            content = `
${content}
`
        else
            content = ""

        const helpUrl = "https://github.com/charmbracelet/gum/discussions"
        return `📖 ${this.text}
${content}
[\`🔗 Read more\`](${this.url}) | [\`📫 I need help with gum\`](${helpUrl})`
    }
}

/**
 * @typedef {object} SnippetDefinition Allows define snippets in JSON-like declarative way.
 * 
 * @property {string} identifier A snippet identifier.
 * @property {string} content A snippet content.
 * @property {vscode.CompletionItemKind} kind A snippet kind.
 * @property {DocumentationDefinition} documentation A snippet documentation.
 * @property {Array<OptionDefinition>} [options] Corresponding options for the snippet.
 */

/**
 * Snippet.
 */
class Snippet {
    /**
     * Create the object from its raw representation.
     * 
     * @param {SnippetDefinition} raw A raw object representation.
     * 
     * @returns {Snippet} The object.
     */
    static fromRaw(raw) {
        return new Snippet(raw.identifier,
            raw?.content,
            raw?.kind,
            raw?.documentation === undefined ? undefined : Documentation.fromRaw(raw.documentation),
            raw?.options === undefined ? undefined : raw.options.map(option => Option.fromRaw(option)))
    }

    /**
     * @param {string} identifier A snippet identifier.
     * @param {string} content A snippet content.
     * @param {vscode.CompletionItemKind} kind A snippet kind.
     * @param {Documentation} documentation A snippet documentation.
     * @param {Array<Option>} options Corresponding options for the snippet.
     */
    constructor(identifier, content, kind, documentation, options) {
        typeboxValue.Assert(schemas.snippet.identifier, identifier)
        typeboxValue.Assert(schemas.snippet.content, content)
        typeboxValue.Assert(schemas.snippet.options, options)

        if (documentation.constructor !== Documentation)
            throw new TypeError(`'documentation' expected to be of ${Documentation.name} type`)

        if (options === undefined)
            options = []

        const firstIncorrectOption = options.find(option => option.constructor !== Option)
        if (firstIncorrectOption !== undefined)
            throw new TypeError(`'options' expected to be of Array<${Option.constructor.name}> type`)

        this.identifier = identifier
        this.content = content
        this.kind = kind
        this.documentation = documentation
        this.options = options
    }

    /**
     * A snippet documentation with options.
     * 
     * @type {string}
     */
    get documentationWithOptions() {
        const options = this.options
            .map(option => `- ${option}`)
            .join("\n")

        return this.documentation.toString(options === "" ? undefined : options)
    }

    /**
     * Convert the object to a completion.
     * 
     * @returns {vscode.CompletionItem} A string representation of the object.
     */
    toCompletion() {
        const completion = new vscode.CompletionItem(this.identifier, this.kind)
        completion.insertText = new vscode.SnippetString(this.content)

        const options = this.options
            .map(option => `- ${option}`)
            .join("\n")

        completion.documentation = new vscode.MarkdownString(this.documentationWithOptions)

        return completion
    }
}

module.exports = {
    ValueKind,
    Option,
    Documentation,
    Snippet
}
