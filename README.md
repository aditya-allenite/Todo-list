# To‑Do List Theme

A responsive, polished theme for a Kanban-style to-do list. The stylesheet uses a calm teal-and-slate palette, clear task columns, and lightweight card styling to make a task board easy to scan.

## Features

- Responsive styling for a three-column task board
- Distinct visual cues for each task column
- Styled task entry field, add button, task cards, and delete buttons
- Keyboard-visible focus states
- Optional Google Fonts: DM Sans and Manrope

## Setup

Add `todo-theme.css` to the same folder as your HTML page, then include it in the page’s `<head>`:

```html
<link rel="stylesheet" href="todo-theme.css" />
```

The page should use these class names and IDs for the theme to apply:

- `.app-container`, `.board`, `.column`, `.column-header`, `.task-list`, `.task`
- `.add-task-container`, `#task-input`, `#add-btn`, `.delete-btn`

This repository currently contains the theme stylesheet. Add the HTML and JavaScript for the to-do app to make it interactive.
