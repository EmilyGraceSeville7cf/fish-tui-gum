const types = require("./types")
const vscode = require("vscode")

const baseUrl = "https://github.com/charmbracelet/gum/tree/main?tab=readme-ov-file"

/**
 * @type {Map<string, string>}
 */
const documentationUrls = new Map()
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
    documentationUrls.set(command, `${baseUrl}#${command}`)

/**
  * @type {Array<types.SnippetDefinition>}
  */
const snippets = [
    {
        identifier: "color",
        content: "${1:red-}${2:green-}${3:blue}",
        kind: vscode.CompletionItemKind.Color,
        documentation: {
            text: "A color",
            url: documentationUrls.get("gum")
        }
    },
    {
        identifier: "template",
        content: "{{ $0 }}",
        kind: vscode.CompletionItemKind.Snippet,
        documentation: {
            text: "A template",
            url: documentationUrls.get("gum")
        }
    },
    {
        identifier: "choose",
        content: "gum choose --header=${1|\",'|}${2:message}$1 -- ${3:item...}",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Choose one or more items",
            url: documentationUrls.get("choose")
        }
    },
    {
        identifier: "GUM_CHOOSE_ORDERED",
        content: "GUM_CHOOSE_ORDERED",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Maintain the order of the selected options",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "ordered"
                },
                kind: {
                    baseKind: "boolean"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_HEIGHT",
        content: "GUM_CHOOSE_HEIGHT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Height of the list",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "height",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_CURSOR",
        content: "GUM_CHOOSE_CURSOR",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prefix to show on item that corresponds to the cursor position",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_SHOW_HELP",
        content: "GUM_CHOOSE_SHOW_HELP",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show help keybinds",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "show-help",
                }
            },
            {
                identifiers: {
                    long: "no-show-help"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_HEADER",
        content: "GUM_CHOOSE_HEADER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Header value",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "header",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_CURSOR_PREFIX",
        content: "GUM_CHOOSE_CURSOR_PREFIX",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prefix to show on the cursor item",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor-prefix",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_SELECTED_PREFIX",
        content: "GUM_CHOOSE_SELECTED_PREFIX",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prefix to show on selected items",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "selected-prefix",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_UNSELECTED_PREFIX",
        content: "GUM_CHOOSE_UNSELECTED_PREFIX",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prefix to show on unselected items",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "unselected-prefix",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_SELECTED",
        content: "GUM_CHOOSE_SELECTED",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Options that should start as selected",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "selected",
                },
                kind: {
                    baseKind: "integer",
                    isArray: true,
                    separator: ","
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_TIMEOUT",
        content: "GUM_CHOOSE_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until choose returns selected element",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_CURSOR_FOREGROUND",
        content: "GUM_CHOOSE_CURSOR_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_HEADER_FOREGROUND",
        content: "GUM_CHOOSE_HEADER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "header.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_ITEM_FOREGROUND",
        content: "GUM_CHOOSE_ITEM_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "item.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_CHOOSE_SELECTED_FOREGROUND",
        content: "GUM_CHOOSE_SELECTED_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("choose"),
        },
        options: [
            {
                identifiers: {
                    long: "selected.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "confirm",
        content: "gum confirm -- ${1|\",'|}${2:message}$1",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Choose yes | no answer",
            url: documentationUrls.get("confirm")
        }
    },
    {
        identifier: "GUM_CONFIRM_SHOW_HELP",
        content: "GUM_CONFIRM_SHOW_HELP",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show help key binds",
            url: documentationUrls.get("confirm"),
        },
        options: [
            {
                identifiers: {
                    long: "show-help",
                }
            },
            {
                identifiers: {
                    long: "no-show-help"
                }
            }
        ]
    },
    {
        identifier: "GUM_CONFIRM_TIMEOUT",
        content: "GUM_CONFIRM_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until confirm returns selected value or default if provided",
            url: documentationUrls.get("confirm"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_CONFIRM_PROMPT_FOREGROUND",
        content: "GUM_CONFIRM_PROMPT_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("confirm"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_CONFIRM_SELECTED_FOREGROUND",
        content: "GUM_CONFIRM_SELECTED_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("confirm"),
        },
        options: [
            {
                identifiers: {
                    long: "selected.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_CONFIRM_UNSELECTED_FOREGROUND",
        content: "GUM_CONFIRM_UNSELECTED_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("confirm"),
        },
        options: [
            {
                identifiers: {
                    long: "unselected.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "file",
        content: "gum file -- ${1:path to choose from}",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Choose a file",
            url: documentationUrls.get("file")
        }
    },
    {
        identifier: "GUM_FILE_CURSOR",
        content: "GUM_FILE_CURSOR",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "The cursor character",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor",
                    short: "c"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_ALL",
        content: "GUM_FILE_ALL",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show hidden and 'dot' files",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "all",
                    short: "a"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_FILE",
        content: "GUM_FILE_FILE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Allow files selection",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "file",
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_DIRECTORY",
        content: "GUM_FILE_DIRECTORY",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Allow directories selection",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "directory"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_SHOW_HELP",
        content: "GUM_FILE_SHOW_HELP",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show help key binds",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "show-help",
                }
            },
            {
                identifiers: {
                    long: "no-show-help"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_HEIGHT",
        content: "GUM_FILE_HEIGHT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Maximum number of files to display",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "height",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_TIMEOUT",
        content: "GUM_FILE_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until command aborts without a selection",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_CURSOR_FOREGROUND",
        content: "GUM_FILE_CURSOR_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_SYMLINK_FOREGROUND",
        content: "GUM_FILE_SYMLINK_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "symlink.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_DIRECTORY_FOREGROUND",
        content: "GUM_FILE_DIRECTORY_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "directory.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_FILE_FOREGROUND",
        content: "GUM_FILE_FILE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "file.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_PERMISSIONS_FOREGROUND",
        content: "GUM_FILE_PERMISSIONS_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "permissions.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_SELECTED_FOREGROUND",
        content: "GUM_FILE_SELECTED_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "selected.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILE_FILE_SIZE_FOREGROUND",
        content: "GUM_FILE_FILE_SIZE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("file"),
        },
        options: [
            {
                identifiers: {
                    long: "file-size.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "filter",
        content: "gum filter --header=${1|\",'|}${2:message}$1 < ${3:command which output to show}",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Choose one or more items with fuzzy search",
            url: documentationUrls.get("filter")
        }
    },
    {
        identifier: "GUM_FILTER_INDICATOR",
        content: "GUM_FILTER_INDICATOR",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Character for selection",
            url: documentationUrls.get("filter"),
        },
        options: [{
            identifiers: {
                long: "indicator",
            },
            kind: {
                baseKind: "string"
            }
        }]
    },
    {
        identifier: "GUM_FILTER_SELECTED_PREFIX",
        content: "GUM_FILTER_SELECTED_PREFIX",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Character to indicate selected items",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "selected-prefix",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_UNSELECTED_PREFIX",
        content: "GUM_FILTER_UNSELECTED_PREFIX",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Character to indicate unselected items",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "unselected-prefix",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_HEADER",
        content: "GUM_FILTER_HEADER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Header value",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "header",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_PLACEHOLDER",
        content: "GUM_FILTER_PLACEHOLDER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Placeholder value",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "placeholder",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_PROMPT",
        content: "GUM_FILTER_PROMPT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prompt to display",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_WIDTH",
        content: "GUM_FILTER_WIDTH",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Input width",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "width",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_HEIGHT",
        content: "GUM_FILTER_HEIGHT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Input height",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "height",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_VALUE",
        content: "GUM_FILTER_VALUE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Initial filter value",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "value",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_REVERSE",
        content: "GUM_FILTER_REVERSE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Display from the bottom of the screen",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "reverse",
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_FUZZY",
        content: "GUM_FILTER_FUZZY",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Enable fuzzy matching",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "fuzzy",
                }
            },
            {
                identifiers: {
                    long: "no-fuzzy",
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_SORT",
        content: "GUM_FILTER_SORT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Sort the results",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "sort",
                }
            },
            {
                identifiers: {
                    long: "no-sort",
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_TIMEOUT",
        content: "GUM_FILTER_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until filter command aborts",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_INDICATOR_FOREGROUND",
        content: "GUM_FILTER_INDICATOR_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "indicator.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_SELECTED_PREFIX_FOREGROUND",
        content: "GUM_FILTER_SELECTED_PREFIX_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "selected-indicator.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_UNSELECTED_PREFIX_FOREGROUND",
        content: "GUM_FILTER_UNSELECTED_PREFIX_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "unselected-prefix.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_HEADER_FOREGROUND",
        content: "GUM_FILTER_HEADER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "header.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_TEXT_FOREGROUND",
        content: "GUM_FILTER_TEXT_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "text.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_CURSOR_TEXT_FOREGROUND",
        content: "GUM_FILTER_CURSOR_TEXT_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor-text.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_MATCH_FOREGROUND",
        content: "GUM_FILTER_MATCH_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "match.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_PROMPT_FOREGROUND",
        content: "GUM_FILTER_PROMPT_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_FILTER_PLACEHOLDER_FOREGROUND",
        content: "GUM_FILTER_PLACEHOLDER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("filter"),
        },
        options: [
            {
                identifiers: {
                    long: "placeholder.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "format",
        content: "gum format ${1:format option...} -- ${2|\",'|}${3:message}$2",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Show a formatted text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "GUM_FORMAT_THEME",
        content: "GUM_FORMAT_THEME",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Glamour theme to use for markdown",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "theme",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FORMAT_LANGUAGE",
        content: "GUM_FORMAT_LANGUAGE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Programming language to parse code",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "language",
                    short: "l",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_FORMAT_TYPE",
        content: "GUM_FORMAT_TYPE ${1|markdown,template,code,emoji|}",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Format to use",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "type",
                    short: "t",
                },
                kind: {
                    baseKind: "enumeration"
                }
            }
        ]
    },
    {
        identifier: "Bold",
        content: "Bold ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A bold text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Italic",
        content: "Italic ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "An italic text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Underline",
        content: "Underline ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "An underlined text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Faint",
        content: "Faint ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A fainted text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "CrossOut",
        content: "CrossOut ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A crossed out text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Overline",
        content: "Overline ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "An overline text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Reverse",
        content: "Reverse ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A reversed text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Blink",
        content: "Blink ${1:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A blinking text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Color",
        content: "Color ${1:hexadecimal-foreground} ${2:hexadecimal-background} ${3:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A colored text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Foreground",
        content: "Foreground ${1:hexadecimal-color} ${2:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A colored text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "Background",
        content: "Background ${1:hexadecimal-color} ${2:text}",
        kind: vscode.CompletionItemKind.Keyword,
        documentation: {
            text: "A colored text",
            url: documentationUrls.get("format")
        }
    },
    {
        identifier: "input",
        content: "gum input --header=${1|\",'|}${2:message}$1",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Get user input",
            url: documentationUrls.get("input")
        }
    },
    {
        identifier: "GUM_INPUT_PLACEHOLDER",
        content: "GUM_INPUT_PLACEHOLDER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Placeholder value",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "placeholder",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_PROMPT",
        content: "GUM_INPUT_PROMPT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prompt to display",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_CURSOR_MODE",
        content: "GUM_INPUT_CURSOR_MODE ${1|blink,hide,static|}",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Cursor mode",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor.mode",
                },
                kind: {
                    baseKind: "enumeration"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_WIDTH",
        content: "GUM_INPUT_WIDTH",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Input width",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "width",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_SHOW_HELP",
        content: "GUM_INPUT_SHOW_HELP",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show help keybinds",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "show-help",
                }
            },
            {
                identifiers: {
                    long: "no-show-help"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_HEADER",
        content: "GUM_INPUT_HEADER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Header value",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "header",
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_TIMEOUT",
        content: "GUM_INPUT_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until input aborts",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_PROMPT_FOREGROUND",
        content: "GUM_INPUT_PROMPT_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_PLACEHOLDER_FOREGROUND",
        content: "GUM_INPUT_PLACEHOLDER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "placeholder.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_CURSOR_FOREGROUND",
        content: "GUM_INPUT_CURSOR_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_INPUT_HEADER_FOREGROUND",
        content: "GUM_INPUT_HEADER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("input"),
        },
        options: [
            {
                identifiers: {
                    long: "header.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "join",
        content: "gum join ${1:style option...} -- ${2|\",'|}${3:message...}$2",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Show joined styled texts",
            url: documentationUrls.get("join")
        }
    },
    {
        identifier: "pager",
        content: "gum pager < ${1:command which output to show}",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Show a command output inside a pager",
            url: documentationUrls.get("pager")
        }
    },
    {
        identifier: "GUM_PAGER_TIMEOUT",
        content: "GUM_PAGER_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until command exits",
            url: documentationUrls.get("pager"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout",
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_PAGER_FOREGROUND",
        content: "GUM_PAGER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("pager"),
        },
        options: [
            {
                identifiers: {
                    long: "foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_PAGER_HELP_FOREGROUND",
        content: "GUM_PAGER_HELP_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("pager"),
        },
        options: [
            {
                identifiers: {
                    long: "help.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_PAGER_LINE_NUMBER_FOREGROUND",
        content: "GUM_PAGER_LINE_NUMBER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("pager"),
        },
        options: [
            {
                identifiers: {
                    long: "line-number.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_PAGER_MATCH_FOREGROUND",
        content: "GUM_PAGER_MATCH_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("pager"),
        },
        options: [
            {
                identifiers: {
                    long: "match.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_PAGER_MATCH_HIGH_FOREGROUND",
        content: "GUM_PAGER_MATCH_HIGH_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("pager"),
        },
        options: [
            {
                identifiers: {
                    long: "match-highlight.foreground",
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "spin",
        content: "gum spin --title=${1|\",'|}${2:message}$1 -- ${3:command which to wait for}",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Wait a command for while showing the loading screen",
            url: documentationUrls.get("spin")
        }
    },
    {
        identifier: "GUM_SPIN_SHOW_OUTPUT",
        content: "GUM_SPIN_SHOW_OUTPUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show or pipe output of command during execution",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "show-input",
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_SHOW_ERROR",
        content: "GUM_SPIN_SHOW_ERROR",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show output of command only if the command fails",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "show-error",
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_SPINNER",
        content: "GUM_SPIN_SPINNER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Spinner type",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "spinner",
                    short: "s"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_TITLE",
        content: "GUM_SPIN_TITLE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Text to display to user while spinning",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "title"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_ALIGN",
        content: "GUM_SPIN_ALIGN ${1|left,right|}",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Alignment of spinner with regard to the title",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "align",
                    short: "a"
                },
                kind: {
                    baseKind: "enumeration"
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_TIMEOUT",
        content: "GUM_SPIN_TIMEOUT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Timeout until spin command aborts",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "timeout"
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_SPINNER_FOREGROUND",
        content: "GUM_SPIN_SPINNER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "spinner.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_SPIN_TITLE_FOREGROUND",
        content: "GUM_SPIN_TITLE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("spin"),
        },
        options: [
            {
                identifiers: {
                    long: "title.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },

    {
        identifier: "style",
        content: "gum style ${1:style option...} -- ${2|\",'|}${3:message}$2",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Show a styled text",
            url: documentationUrls.get("style")
        }
    },
    {
        identifier: "FOREGROUND",
        content: "FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "BACKGROUND",
        content: "BACKGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Background color",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "background"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "BORDER",
        content: "BORDER ${1|none,hidden,normal,rounded,thick,double|}",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Border style",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "border"
                },
                kind: {
                    baseKind: "enumeration"
                }
            }
        ]
    },
    {
        identifier: "BORDER_BACKGROUND",
        content: "BORDER_BACKGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Border background color",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "border-background"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "BORDER_FOREGROUND",
        content: "BORDER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Border foreground color",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "border-foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "ALIGN",
        content: "ALIGN ${1|left,center,right,bottom,middle,top|}",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Border alignment",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "align"
                },
                kind: {
                    baseKind: "enumeration"
                }
            }
        ]
    },
    {
        identifier: "HEIGHT",
        content: "HEIGHT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "The height",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "height"
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "WIDTH",
        content: "WIDTH",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "The width",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "width"
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "MARGIN",
        content: "MARGIN",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "The margin",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "margin"
                },
                kind: {
                    baseKind: "integer",
                    isArray: true,
                    separator: " "
                }
            }
        ]
    },
    {
        identifier: "PADDING",
        content: "PADDING",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "The padding",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "padding"
                },
                kind: {
                    baseKind: "integer",
                    isArray: true,
                    separator: " "
                }
            }
        ]
    },
    {
        identifier: "BOLD",
        content: "BOLD",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Bold text",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "bold"
                }
            }
        ]
    },
    {
        identifier: "FAINT",
        content: "FAINT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Faint text",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "faint"
                }
            }
        ]
    },
    {
        identifier: "ITALIC",
        content: "ITALIC",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Italic text",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "italic"
                }
            }
        ]
    },
    {
        identifier: "STRIKETHROUGH",
        content: "STRIKETHROUGH",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Strikethrough text",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "strikethrough"
                }
            }
        ]
    },
    {
        identifier: "UNDERLINE",
        content: "UNDERLINE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Underline text",
            url: documentationUrls.get("style"),
        },
        options: [
            {
                identifiers: {
                    long: "underline"
                }
            }
        ]
    },
    {
        identifier: "table",
        content: "gum table < ${1:command which output to show as a table}",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Show a command output as a table",
            url: documentationUrls.get("table")
        }
    },
    {
        identifier: "GUM_TABLE_BORDER_FOREGROUND",
        content: "GUM_TABLE_BORDER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("table"),
        },
        options: [
            {
                identifiers: {
                    long: "border.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_TABLE_CELL_FOREGROUND",
        content: "GUM_TABLE_CELL_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("table"),
        },
        options: [
            {
                identifiers: {
                    long: "cell.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_TABLE_HEADER_FOREGROUND",
        content: "GUM_TABLE_HEADER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("table"),
        },
        options: [
            {
                identifiers: {
                    long: "header.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_TABLE_SELECTED_FOREGROUND",
        content: "GUM_TABLE_SELECTED_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("table"),
        },
        options: [
            {
                identifiers: {
                    long: "selected.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "write",
        content: "gum write --header=${1|\",'|}${2:message}$1",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Get long user input",
            url: documentationUrls.get("write")
        }
    },
    {
        identifier: "GUM_WRITE_WIDTH",
        content: "GUM_WRITE_WIDTH",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Text area width",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "width"
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_HEIGHT",
        content: "GUM_WRITE_HEIGHT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Text area height",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "height"
                },
                kind: {
                    baseKind: "integer"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_HEADER",
        content: "GUM_WRITE_HEADER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Header value",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "header"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_PLACEHOLDER",
        content: "GUM_WRITE_PLACEHOLDER",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Placeholder value",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "placeholder"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_PROMPT",
        content: "GUM_WRITE_PROMPT",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Prompt to display",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_SHOW_CURSOR_LINE",
        content: "GUM_WRITE_SHOW_CURSOR_LINE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show cursor line",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "show-cursor-line"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_SHOW_LINE_NUMBERS",
        content: "GUM_WRITE_SHOW_LINE_NUMBERS",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show line numbers",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "show-line-numbers"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_VALUE",
        content: "GUM_WRITE_VALUE",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Initial value",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "value"
                },
                kind: {
                    baseKind: "string"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_SHOW_HELP",
        content: "GUM_WRITE_SHOW_HELP",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Show help key binds",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "show-help",
                }
            },
            {
                identifiers: {
                    long: "no-show-help"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_CURSOR_MODE",
        content: "GUM_WRITE_CURSOR_MODE ${1|blink,hide,static|}",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Cursor mode",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor.mode"
                },
                kind: {
                    baseKind: "enumeration"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_BASE_FOREGROUND",
        content: "GUM_WRITE_BASE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "base.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_CURSOR_FOREGROUND",
        content: "GUM_WRITE_CURSOR_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_HEADER_FOREGROUND",
        content: "GUM_WRITE_HEADER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "header.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_PLACEHOLDER_FOREGROUND",
        content: "GUM_WRITE_PLACEHOLDER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "placeholder.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_PROMPT_FOREGROUND",
        content: "GUM_WRITE_PROMPT_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "prompt.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_END_OF_BUFFER_FOREGROUND",
        content: "GUM_WRITE_END_OF_BUFFER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "end-of-buffer.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_LINE_NUMBER_FOREGROUND",
        content: "GUM_WRITE_LINE_NUMBER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "line-number.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_CURSOR_LINE_NUMBER_FOREGROUND",
        content: "GUM_WRITE_CURSOR_LINE_NUMBER_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor-line-number.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_WRITE_CURSOR_LINE_FOREGROUND",
        content: "GUM_WRITE_CURSOR_LINE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("write"),
        },
        options: [
            {
                identifiers: {
                    long: "cursor-line.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "log",
        content: "gum log ${1:style option...} -- ${2|\",'|}${3:message}$2",
        kind: vscode.CompletionItemKind.Function,
        documentation: {
            text: "Show a logging text",
            url: documentationUrls.get("log")
        }
    },
    {
        identifier: "GUM_LOG_LEVEL_FOREGROUND",
        content: "GUM_LOG_LEVEL_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "level.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_LOG_TIME_FOREGROUND",
        content: "GUM_LOG_TIME_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "time.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_LOG_PREFIX_FOREGROUND",
        content: "GUM_LOG_PREFIX_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "prefix.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_LOG_MESSAGE_FOREGROUND",
        content: "GUM_LOG_MESSAGE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "message.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_LOG_KEY_FOREGROUND",
        content: "GUM_LOG_KEY_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "key.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_LOG_VALUE_FOREGROUND",
        content: "GUM_LOG_VALUE_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "value.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
    {
        identifier: "GUM_LOG_SEPARATOR_FOREGROUND",
        content: "GUM_LOG_SEPARATOR_FOREGROUND",
        kind: vscode.CompletionItemKind.Variable,
        documentation: {
            text: "Foreground color",
            url: documentationUrls.get("format"),
        },
        options: [
            {
                identifiers: {
                    long: "separator.foreground"
                },
                kind: {
                    baseKind: "color"
                }
            }
        ]
    },
]

module.exports = {
    snippets
}
