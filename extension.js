const vscode = require("vscode");

/**
 * @typedef {"string" | "integer" | "color" | "enumeration" | "comma-separated strings" | "comma-separated integers" | "comma-separated colors" | "comma-separated enumeration values" | "space-separated strings" | "space-separated integers" | "space-separated colors" | "space-separated enumeration values"} OptionType
 */

/**
 * Option.
 */
class Option {
	/**
	 * @param {string} identifier An option name.
	 * @param {OptionType} [kind] An option kind.
	 */
	constructor(identifier, kind) {
		this.identifier = identifier
		this.kind = kind

		/**
		 * @type {Map<OptionType, Array<string>>}
		 */
		const examples = new Map();
		examples.set("string", ["'> '"])
		examples.set("integer", ["10"])
		examples.set("color", ["#7571F9"])
		examples.set("comma-separated strings", ["'name,age'"])
		examples.set("comma-separated integers", ["'1,2'"])
		examples.set("comma-separated colors", ["#7571F9,#000000"])

		if (kind !== undefined)
			this.examples = examples.get(this.kind)
		Object.freeze(this)
	}

	/**
	 * Convert object to string.
	 * 
	 * @returns {string} A string representation.
	 */
	toString() {
		let representation = this.identifier
		if (this.kind !== undefined)
			representation += `=*{{${this.kind}}}*`

		if (this.examples !== undefined)
			representation += ` (*e.g.* ${this.examples.join(", ")})`

		return representation
	}
}

/**
 * @typedef {object} Snippet
 * 
 * @property {string} identifier A snippet identifier.
 * @property {string} [content] A snippet content. If snippet is environment variable (this property should be empty), then `identifier` value is used.
 * @property {vscode.CompletionItemKind} kind A snippet kind.
 * @property {string} documentation A snippet documentation.
 * @property {string} documentationUrl A documentation URL.
 * @property {Array<Option>} [correspondingOptions] A corresponding option for a snippet if it's an environment variable.
 */

/**
 * Create a completion for a snippet.
 * 
 * @param {Snippet} snippet A snippet.
 * @returns {vscode.CompletionItem} A completion.
 */
function createCompletion(snippet) {
	const completion = new vscode.CompletionItem(snippet.identifier, snippet.kind);
	completion.insertText = new vscode.SnippetString(snippet.content === undefined ? snippet.identifier : snippet.content);

	completion.documentation = new vscode.MarkdownString(`📖 ${snippet.documentation}`);

	if (snippet.kind === vscode.CompletionItemKind.Variable)
		completion.documentation.appendMarkdown(`

**Value**: ${process.env[snippet.identifier]}`)

	if (snippet.correspondingOptions !== undefined)
		completion.documentation.appendMarkdown(`

**Option(s)**: ${snippet.correspondingOptions.join(" ")}`);

	completion.documentation.appendMarkdown(`

[\`🔗 Read more\`](${snippet.documentationUrl}) | [\`📫 I need help with gum\`](https://github.com/charmbracelet/gum/discussions)`);

	return completion
}

/**
 * Create a completion provider for snippets.
 * 
 * @param {Array<Snippet>} snippets Snippets.
 * @param {vscode.CompletionItemKind} kind A completion item kind.
 * @param {Array<string>} triggerCharacters A trigger character.
 * @returns {vscode.Disposable} A completion.
 */
function provider(snippets, kind, ...triggerCharacters) {
	return vscode.languages.registerCompletionItemProvider("fish", {
		provideCompletionItems() {
			return snippets
				.filter(snippet => snippet.kind === kind)
				.map(snippet => createCompletion(snippet));
		}
	}, ...triggerCharacters)
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const baseUrl = "https://github.com/charmbracelet/gum/tree/main?tab=readme-ov-file"

	/**
	 * @type {Map<string, string>}
	 */
	const documentationUrls = new Map();
	documentationUrls.set("gum", "https://github.com/charmbracelet/gum")

	for (const command of ["choose",
		"confirm",
		"file",
		"filter",
		"format",
		"input",
		"join",
		"pager",
		"spin",
		"style",
		"table",
		"write",
		"log"])
		documentationUrls.set(command, `${baseUrl}#${command}`);

	/**
	 * @type {Array<Snippet>}
	 */
	const snippets = [
		{
			identifier: "color",
			content: "${1:red-}${2:green-}${3:blue}",
			kind: vscode.CompletionItemKind.Color,
			documentation: "A color",
			documentationUrl: documentationUrls.get("gum")
		},
		{
			identifier: "template",
			content: "{{ $0 }}",
			kind: vscode.CompletionItemKind.Snippet,
			documentation: "A template",
			documentationUrl: documentationUrls.get("gum")
		},
		{
			identifier: "choose",
			content: "gum choose --header=${1|\",'|}${2:message}$1 -- ${3:item...}",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Choose one or more items",
			documentationUrl: documentationUrls.get("choose")
		},
		{
			identifier: "GUM_CHOOSE_ORDERED",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Maintain the order of the selected options",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--ordered")]
		},
		{
			identifier: "GUM_CHOOSE_HEIGHT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Height of the list",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--height", "integer")]
		},
		{
			identifier: "GUM_CHOOSE_CURSOR",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prefix to show on item that corresponds to the cursor position",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--cursor", "string")]
		},
		{
			identifier: "GUM_CHOOSE_SHOW_HELP",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show help keybinds",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [
				new Option("--show-help"),
				new Option("--no-show-help")
			]
		},
		{
			identifier: "GUM_CHOOSE_HEADER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Header value",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--header", "string")]
		},
		{
			identifier: "GUM_CHOOSE_CURSOR_PREFIX",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prefix to show on the cursor item",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--cursor-prefix", "string")]
		},
		{
			identifier: "GUM_CHOOSE_SELECTED_PREFIX",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prefix to show on selected items",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--selected-prefix", "string")]
		},
		{
			identifier: "GUM_CHOOSE_UNSELECTED_PREFIX",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prefix to show on unselected items",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--unselected-prefix", "string")]
		},
		{
			identifier: "GUM_CHOOSE_SELECTED",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Options that should start as selected",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--selected", "comma-separated integers")]
		},
		{
			identifier: "GUM_CHOOSE_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until choose returns selected element",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_CHOOSE_CURSOR_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--cursor.foreground", "color")]
		},
		{
			identifier: "GUM_CHOOSE_HEADER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--header.foreground", "color")]
		},
		{
			identifier: "GUM_CHOOSE_ITEM_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--item.foreground", "color")]
		},
		{
			identifier: "GUM_CHOOSE_SELECTED_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("choose"),
			correspondingOptions: [new Option("--selected.foreground", "color")]
		},
		{
			identifier: "confirm",
			content: "gum confirm -- ${1|\",'|}${2:message}$1",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Choose yes | no answer",
			documentationUrl: documentationUrls.get("confirm")
		},
		{
			identifier: "GUM_CONFIRM_SHOW_HELP",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show help key binds",
			documentationUrl: documentationUrls.get("confirm"),
			correspondingOptions: [
				new Option("--show-help"),
				new Option("--no-show-help")
			]
		},
		{
			identifier: "GUM_CONFIRM_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until confirm returns selected value or default if provided",
			documentationUrl: documentationUrls.get("confirm"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_CONFIRM_PROMPT_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("confirm"),
			correspondingOptions: [new Option("--prompt.foreground", "color")]
		},
		{
			identifier: "GUM_CONFIRM_SELECTED_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("confirm"),
			correspondingOptions: [new Option("--selected.foreground", "color")]
		},
		{
			identifier: "GUM_CONFIRM_UNSELECTED_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("confirm"),
			correspondingOptions: [new Option("--unselected.foreground", "color")]
		},
		{
			identifier: "file",
			content: "gum file -- ${1:path to choose from}",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Choose a file",
			documentationUrl: documentationUrls.get("file")
		},
		{
			identifier: "GUM_FILE_CURSOR",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "The cursor character",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [
				new Option("-c", "string"),
				new Option("--cursor", "string")
			]
		},
		{
			identifier: "GUM_FILE_ALL",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show hidden and 'dot' files",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [
				new Option("-a"),
				new Option("--all")
			]
		},
		{
			identifier: "GUM_FILE_FILE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Allow files selection",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--file")]
		},
		{
			identifier: "GUM_FILE_DIRECTORY",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Allow directories selection",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--directory")]
		},
		{
			identifier: "GUM_FILE_SHOW_HELP",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show help key binds",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [
				new Option("--show-help"),
				new Option("--no-show-help")
			]
		},
		{
			identifier: "GUM_FILE_HEIGHT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Maximum number of files to display",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--height", "integer")]
		},
		{
			identifier: "GUM_FILE_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until command aborts without a selection",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_FILE_CURSOR_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--cursor.foreground", "color")]
		},
		{
			identifier: "GUM_FILE_SYMLINK_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--symlink.foreground", "color")]
		},
		{
			identifier: "GUM_FILE_DIRECTORY_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--directory.foreground", "color")]
		},
		{
			identifier: "GUM_FILE_FILE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--file.foreground", "color")]
		},
		{
			identifier: "GUM_FILE_PERMISSIONS_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--permissions.foreground", "color")]
		},
		{
			identifier: "GUM_FILE_SELECTED_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--selected.foreground", "color")]
		},
		{
			identifier: "GUM_FILE_FILE_SIZE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("file"),
			correspondingOptions: [new Option("--file-size.foreground", "color")]
		},
		{
			identifier: "filter",
			content: "gum filter --header=${1|\",'|}${2:message}$1 < ${3:command which output to show}",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Choose one or more items with fuzzy search",
			documentationUrl: documentationUrls.get("filter")
		},
		{
			identifier: "GUM_FILTER_INDICATOR",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Character for selection",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--indicator", "string")]
		},
		{
			identifier: "GUM_FILTER_SELECTED_PREFIX",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Character to indicate selected items",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--selected-prefix", "string")]
		},
		{
			identifier: "GUM_FILTER_UNSELECTED_PREFIX",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Character to indicate unselected items",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--unselected-prefix", "string")]
		},
		{
			identifier: "GUM_FILTER_HEADER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Header value",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--header", "string")]
		},
		{
			identifier: "GUM_FILTER_PLACEHOLDER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Placeholder value",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--placeholder", "string")]
		},
		{
			identifier: "GUM_FILTER_PROMPT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prompt to display",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--prompt", "string")]
		},
		{
			identifier: "GUM_FILTER_WIDTH",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Input width",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--width", "integer")]
		},
		{
			identifier: "GUM_FILTER_HEIGHT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Input height",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--height", "integer")]
		},
		{
			identifier: "GUM_FILTER_VALUE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Initial filter value",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--value", "string")]
		},
		{
			identifier: "GUM_FILTER_REVERSE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Display from the bottom of the screen",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--reverse")]
		},
		{
			identifier: "GUM_FILTER_FUZZY",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Enable fuzzy matching",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [
				new Option("--fuzzy"),
				new Option("--no-fuzzy")
			]
		},
		{
			identifier: "GUM_FILTER_SORT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Sort the results",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [
				new Option("--sort"),
				new Option("--no-sort")
			]
		},
		{
			identifier: "GUM_FILTER_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until filter command aborts",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_FILTER_INDICATOR_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--indicator.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_SELECTED_PREFIX_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--selected-indicator.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_UNSELECTED_PREFIX_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--unselected-prefix.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_HEADER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--header.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_TEXT_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--text.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_CURSOR_TEXT_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--cursor-text.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_MATCH_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--match.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_PROMPT_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--prompt.foreground", "color")]
		},
		{
			identifier: "GUM_FILTER_PLACEHOLDER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("filter"),
			correspondingOptions: [new Option("--placeholder.foreground", "color")]
		},
		{
			identifier: "format",
			content: "gum format ${1:format option...} -- ${2|\",'|}${3:message}$2",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Show a formatted text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "GUM_FORMAT_THEME",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Glamour theme to use for markdown",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--theme", "string")]
		},
		{
			identifier: "GUM_FORMAT_LANGUAGE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Programming language to parse code",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [
				new Option("-l", "string"),
				new Option("--language", "string")
			]
		},
		{
			identifier: "GUM_FORMAT_TYPE",
			content: "GUM_FORMAT_TYPE ${1|markdown,template,code,emoji|}",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Format to use",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [
				new Option("-t", "enumeration"),
				new Option("--type", "enumeration")
			]
		},
		{
			identifier: "Bold",
			content: "Bold ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A bold text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Italic",
			content: "Italic ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "An italic text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Underline",
			content: "Underline ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "An underlined text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Faint",
			content: "Faint ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A fainted text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "CrossOut",
			content: "CrossOut ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A crossed out text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Overline",
			content: "Overline ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "An overline text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Reverse",
			content: "Reverse ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A reversed text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Blink",
			content: "Blink ${1:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A blinking text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Color",
			content: "Color ${1:hexadecimal-foreground} ${2:hexadecimal-background} ${3:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A colored text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Foreground",
			content: "Foreground ${1:hexadecimal-color} ${2:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A colored text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "Background",
			content: "Background ${1:hexadecimal-color} ${2:text}",
			kind: vscode.CompletionItemKind.Keyword,
			documentation: "A colored text",
			documentationUrl: documentationUrls.get("format")
		},
		{
			identifier: "input",
			content: "gum input --header=${1|\",'|}${2:message}$1",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Get user input",
			documentationUrl: documentationUrls.get("input")
		},
		{
			identifier: "GUM_INPUT_PLACEHOLDER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Placeholder value",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--placeholder", "string")]
		},
		{
			identifier: "GUM_INPUT_PROMPT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prompt to display",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--prompt", "string")]
		},
		{
			identifier: "GUM_INPUT_CURSOR_MODE",
			content: "GUM_INPUT_CURSOR_MODE ${1|blink,hide,static|}",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Cursor mode",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--cursor.mode", "enumeration")]
		},
		{
			identifier: "GUM_INPUT_WIDTH",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Input width",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--width", "integer")]
		},
		{
			identifier: "GUM_INPUT_SHOW_HELP",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show help keybinds",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--[no-]show-help", "integer")]
		},
		{
			identifier: "GUM_INPUT_HEADER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Header value",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--header", "string")]
		},
		{
			identifier: "GUM_INPUT_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until input aborts",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_INPUT_PROMPT_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--prompt.foreground", "color")]
		},
		{
			identifier: "GUM_INPUT_PLACEHOLDER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--placeholder.foreground", "color")]
		},
		{
			identifier: "GUM_INPUT_CURSOR_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--cursor.foreground", "color")]
		},
		{
			identifier: "GUM_INPUT_HEADER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("input"),
			correspondingOptions: [new Option("--header.foreground", "color")]
		},
		{
			identifier: "join",
			content: "gum join ${1:style option...} -- ${2|\",'|}${3:message...}$2",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Show joined styled texts",
			documentationUrl: documentationUrls.get("join")
		},
		{
			identifier: "pager",
			content: "gum pager < ${1:command which output to show}",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Show a command output inside a pager",
			documentationUrl: documentationUrls.get("pager")
		},
		{
			identifier: "GUM_PAGER_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until command exits",
			documentationUrl: documentationUrls.get("pager"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_PAGER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("pager"),
			correspondingOptions: [new Option("--foreground", "color")]
		},
		{
			identifier: "GUM_PAGER_HELP_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("pager"),
			correspondingOptions: [new Option("--help.foreground", "color")]
		},
		{
			identifier: "GUM_PAGER_LINE_NUMBER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("pager"),
			correspondingOptions: [new Option("--line-number.foreground", "color")]
		},
		{
			identifier: "GUM_PAGER_MATCH_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("pager"),
			correspondingOptions: [new Option("--match.foreground", "color")]
		},
		{
			identifier: "GUM_PAGER_MATCH_HIGH_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("pager"),
			correspondingOptions: [new Option("--match-highlight.foreground", "color")]
		},
		{
			identifier: "spin",
			content: "gum spin --title=${1|\",'|}${2:message}$1 -- ${3:command which to wait for}",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Wait a command for while showing the loading screen",
			documentationUrl: documentationUrls.get("spin")
		},
		{
			identifier: "GUM_SPIN_SHOW_OUTPUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show or pipe output of command during execution",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [new Option("--show-input")]
		},
		{
			identifier: "GUM_SPIN_SHOW_ERROR",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show output of command only if the command fails",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [new Option("--show-error")]
		},
		{
			identifier: "GUM_SPIN_SPINNER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Spinner type",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [
				new Option("-s", "string"),
				new Option("--spinner", "string")
			]
		},
		{
			identifier: "GUM_SPIN_TITLE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Text to display to user while spinning",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [new Option("--title", "string")]
		},
		{
			identifier: "GUM_SPIN_ALIGN",
			content: "GUM_SPIN_ALIGN ${1|left,right|}",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Alignment of spinner with regard to the title",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [
				new Option("-a", "enumeration"),
				new Option("--align", "enumeration")
			]
		},
		{
			identifier: "GUM_SPIN_TIMEOUT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Timeout until spin command aborts",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [new Option("--timeout", "integer")]
		},
		{
			identifier: "GUM_SPIN_SPINNER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [new Option("--spinner.foreground", "color")]
		},
		{
			identifier: "GUM_SPIN_TITLE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("spin"),
			correspondingOptions: [new Option("--title.foreground", "color")]
		},

		{
			identifier: "style",
			content: "gum style ${1:style option...} -- ${2|\",'|}${3:message}$2",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Show a styled text",
			documentationUrl: documentationUrls.get("style")
		},
		{
			identifier: "FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--foreground", "color")]
		},
		{
			identifier: "BACKGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Background color",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--background", "color")]
		},
		{
			identifier: "BORDER",
			content: "BORDER ${1|none,hidden,normal,rounded,thick,double|}",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Border style",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--border", "enumeration")]
		},
		{
			identifier: "BORDER_BACKGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Border background color",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--border-background", "color")]
		},
		{
			identifier: "BORDER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Border foreground color",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--border-foreground", "color")]
		},
		{
			identifier: "ALIGN",
			content: "ALIGN ${1|left,center,right,bottom,middle,top|}",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Border alignment",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--align", "enumeration")]
		},
		{
			identifier: "HEIGHT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "The height",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--height", "integer")]
		},
		{
			identifier: "WIDTH",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "The width",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--width", "integer")]
		},
		{
			identifier: "MARGIN",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "The margin",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--margin", "space-separated integers")]
		},
		{
			identifier: "PADDING",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "The padding",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--padding", "space-separated integers")]
		},
		{
			identifier: "BOLD",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Bold text",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--bold")]
		},
		{
			identifier: "FAINT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Faint text",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--faint")]
		},
		{
			identifier: "ITALIC",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Italic text",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--italic")]
		},
		{
			identifier: "STRIKETHROUGH",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Strikethrough text",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--strikethrough")]
		},
		{
			identifier: "UNDERLINE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Underline text",
			documentationUrl: documentationUrls.get("style"),
			correspondingOptions: [new Option("--underline")]
		},
		{
			identifier: "table",
			content: "gum table < ${1:command which output to show as a table}",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Show a command output as a table",
			documentationUrl: documentationUrls.get("table")
		},
		{
			identifier: "GUM_TABLE_BORDER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("table"),
			correspondingOptions: [new Option("--border.foreground", "color")]
		},
		{
			identifier: "GUM_TABLE_CELL_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("table"),
			correspondingOptions: [new Option("--cell.foreground", "color")]
		},
		{
			identifier: "GUM_TABLE_HEADER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("table"),
			correspondingOptions: [new Option("--header.foreground", "color")]
		},
		{
			identifier: "GUM_TABLE_SELECTED_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("table"),
			correspondingOptions: [new Option("--selected.foreground", "color")]
		},
		{
			identifier: "write",
			content: "gum write --header=${1|\",'|}${2:message}$1",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Get long user input",
			documentationUrl: documentationUrls.get("write")
		},
		{
			identifier: "GUM_WRITE_WIDTH",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Text area width",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--width", "integer")]
		},
		{
			identifier: "GUM_WRITE_HEIGHT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Text area height",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--height", "integer")]
		},
		{
			identifier: "GUM_WRITE_HEADER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Header value",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--header", "string")]
		},
		{
			identifier: "GUM_WRITE_PLACEHOLDER",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Placeholder value",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--placeholder", "string")]
		},
		{
			identifier: "GUM_WRITE_PROMPT",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Prompt to display",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--prompt", "string")]
		},
		{
			identifier: "GUM_WRITE_SHOW_CURSOR_LINE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show cursor line",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--show-cursor-line")]
		},
		{
			identifier: "GUM_WRITE_SHOW_LINE_NUMBERS",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show line numbers",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--show-line-numbers")]
		},
		{
			identifier: "GUM_WRITE_VALUE",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Initial value",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--value", "string")]
		},
		{
			identifier: "GUM_WRITE_SHOW_HELP",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Show help key binds",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [
				new Option("--show-help"),
				new Option("--no-show-help")
			]
		},
		{
			identifier: "GUM_WRITE_CURSOR_MODE",
			content: "GUM_WRITE_CURSOR_MODE ${1|blink,hide,static|}",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Cursor mode",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--cursor.mode", "enumeration")]
		},
		{
			identifier: "GUM_WRITE_BASE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--base.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_CURSOR_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--cursor.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_HEADER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--header.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_PLACEHOLDER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--placeholder.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_PROMPT_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--prompt.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_END_OF_BUFFER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--end-of-buffer.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_LINE_NUMBER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--line-number.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_CURSOR_LINE_NUMBER_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--cursor-line-number.foreground", "color")]
		},
		{
			identifier: "GUM_WRITE_CURSOR_LINE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("write"),
			correspondingOptions: [new Option("--cursor-line.foreground", "color")]
		},
		{
			identifier: "log",
			content: "gum log ${1:style option...} -- ${2|\",'|}${3:message}$2",
			kind: vscode.CompletionItemKind.Function,
			documentation: "Show a logging text",
			documentationUrl: documentationUrls.get("log")
		},
		{
			identifier: "GUM_LOG_LEVEL_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--level.foreground", "color")]
		},
		{
			identifier: "GUM_LOG_TIME_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--time.foreground", "color")]
		},
		{
			identifier: "GUM_LOG_PREFIX_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--prefix.foreground", "color")]
		},
		{
			identifier: "GUM_LOG_MESSAGE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--message.foreground", "color")]
		},
		{
			identifier: "GUM_LOG_KEY_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--key.foreground", "color")]
		},
		{
			identifier: "GUM_LOG_VALUE_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--value.foreground", "color")]
		},
		{
			identifier: "GUM_LOG_SEPARATOR_FOREGROUND",
			kind: vscode.CompletionItemKind.Variable,
			documentation: "Foreground color",
			documentationUrl: documentationUrls.get("format"),
			correspondingOptions: [new Option("--separator.foreground", "color")]
		},
	]

	context.subscriptions.push(
		provider(snippets, vscode.CompletionItemKind.Color, "#"),
		provider(snippets, vscode.CompletionItemKind.Function),
		provider(snippets, vscode.CompletionItemKind.Variable, "$"),
		provider(snippets, vscode.CompletionItemKind.Keyword),
		provider(snippets, vscode.CompletionItemKind.Snippet)
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
