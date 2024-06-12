# Clear formatting tool for Editor.js

Basic clear formatting tool for [Editor.js](https://ifmo.su/editor).

<img width="395" src="./example/assets/screenshot.png">

## Installation

Get the package

```shell
npm i @ympact.dev/editorjs-clear-formatting
```

Include module at your application

```javascript
import ClearFormatting from '@ympact.dev/editorjs-clear-formatting';
```

## Usage

Add a new Tool to the `tools` property of the Editor. The clear formatting will be included in the inline toolbar of all block tools in case the `inlineToolbar` setting of the block tool is not set. To explicitly include it in a block tool use : `inlineToolbar: ['clearFormatting']`

```javascript
var editor = new EditorJS({
  ...

  tools: {
    ...
    clearFormatting:{
      class: ClearFormatting
      config: {
        shortcut: null,
        closeOnClick: false,
        icon: `<svg>...</svg>`
      }
    },
  }

  ...
});
```

## Config Params

| Field | Type     | Default    | Description        |
| ----- | -------- | ---------- | ------------------ |
| `shortcut` | `string` | `null` | Set a shortcut for this tool (ie CTRL+W).  |
| `closeOnClick` | `boolean` | `false` | Whether the inline toolbar should be closed when clicking on the clear formatting tool. |
| `icon` | `string` | <img width="20" src="./example/assets/clear-formatting-icon.png"> | Customize the icon for the tool. |


## Output data

The clear formatting tool does not output any data. It clears all existing formatting within the selection.

## Roadmap

### v1.0

- [x] Simple clearing of formatting within selection
- [x] Keep track of newly inserted formatting from other tools while inline toolbar is visible for selection 

### v2.0

- [ ] More advanced clearing using boundaries

